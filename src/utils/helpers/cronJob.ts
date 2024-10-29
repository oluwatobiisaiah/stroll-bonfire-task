import { Queue, Worker } from 'bullmq';
import config from '../../config/config';
import { AppDataSource } from '../../database/data-source';
import { AppUserRegion } from '../../database/entities/AppUserRegions';
import { SelectedQuestion } from '../../database/entities/SelectedQuestion';
import { Question } from '../../database/entities/Questions';
import { In, Not } from 'typeorm';
import redisClient from '../../database/cache/connect';
import moment from 'moment-timezone';


const assignQuestionToUserRegion = async () => {
    // const dbConnection = await AppDataSource.initialize();
    const queryRunner = AppDataSource.createQueryRunner();
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
const calculateCronPattern = (cycleDays: number): string => {
    const nextRunDate = moment().add(cycleDays, 'days').tz('Asia/Singapore').set({ hour: 19, minute: 0, second: 0 });
    return `${nextRunDate.minute()} ${nextRunDate.hour()} ${nextRunDate.date()} ${nextRunDate.month() + 1} *`;
};

export const initializeCronJob = async () => {
    const connection = {
        host: config.REDIS_HOST,
        port: Number(config.REDIS_PORT),
    };

    const myQueue = new Queue('my-question-cron', { connection });

    // Upserting a repeatable job in the queue
    await myQueue.upsertJobScheduler(
        'bonfire-question-scheduler',
        {
            // every: config.QUESTION_DURATION_IN_DAYS * 24 * 60 * 60 * 1000,
            pattern: calculateCronPattern(config.QUESTION_DURATION_IN_DAYS),
        },
        {
            name: 'every-job',
            data: { jobData: "selectedQuestions" },
            opts: {
            }
        },
    );

    // Worker to process the jobs
    const worker = new Worker(
        'my-question-cron',
        async job => {
            const selectedQuestions = await assignQuestionToUserRegion();
            console.log(`Processing job ${job.id} with data: ${job.data.jobData}`);
        },
        { connection },
    );
}

