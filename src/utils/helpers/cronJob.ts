import { Queue, Worker } from 'bullmq';
import config from '../../config/config';
import { AppDataSource } from '../../database/data-source';
import { AppUserRegion } from '../../database/entities/AppUserRegions';
import { SelectedQuestion } from '../../database/entities/SelectedQuestion';
import { Question } from '../../database/entities/Questions';
import { In, Not } from 'typeorm';
import redisClient from '../../database/cache/connect';


const assignQuestionToUserRegion = async () => {
    const dbConnection = await AppDataSource.initialize();
    const queryRunner = dbConnection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const appUserRegionsRepository = queryRunner.manager.getRepository(AppUserRegion);
        const selectedQuestionRepository = queryRunner.manager.getRepository(SelectedQuestion) as any;
        const questionRepository = queryRunner.manager.getRepository(Question);


        const appUserRegions = await appUserRegionsRepository.find();
        const job = await Promise.all(appUserRegions.map(async (region) => {
            const previouslySelectedQuestion = await selectedQuestionRepository.find({ where: { userRegion: { id: region.id } }, relations: { question: true } });
            const previousIds = previouslySelectedQuestion.map((selected) => selected.question.id);
            const question = await questionRepository.findOne({
                where: { id: Not(In(previousIds)) },
                relations: { options: true }
            });
            if (question) {
                const selcted = await selectedQuestionRepository.save({ question: question.id, userRegion: region.id });
                const cacheDuration = config.QUESTION_DURATION_IN_DAYS * 24 * 60 * 60;
                await redisClient.setEx(`region-question:${region.id}`, cacheDuration, JSON.stringify(question)); 
                return selcted;

            }
        }));
        await queryRunner.commitTransaction();
        return job;
    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.log("error occured", error);
    } finally {
        await queryRunner.release();
        await redisClient.quit();
    }

}

export const initializeCronJob = async () => {
    console.log("initializing cron job");
    const connection = {
        host: config.REDIS_HOST,
        port: Number(config.REDIS_PORT),
    };


    const myQueue = new Queue('my-question-cron-test', { connection });
    ;
    const selectedQuestions = await assignQuestionToUserRegion();

    // Upserting a repeatable job in the queue
    await myQueue.upsertJobScheduler(
        'bonfire-question-scheduler-test',
        {
            every: config.QUESTION_DURATION_IN_DAYS * 24 * 60 * 60 * 1000,
        },
        {
            name: 'every-job-test',
            data: { jobData: "selectedQuestions" },
            opts: {}, // Optional additional job options
        },
    );

    // Worker to process the jobs
    const worker = new Worker(
        'my-question-cron-test',
        async job => {
            console.log(`Processing job ${job.id} with data: ${job.data.jobData}`);
        },
        { connection },
    );
}

