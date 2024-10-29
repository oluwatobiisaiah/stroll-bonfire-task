import { In, Not } from "typeorm";
import { AppUserRegion } from "../database/entities/AppUserRegions";
import { QuestionOptions } from "../database/entities/QuestionOptions";
import { Question } from "../database/entities/Questions";
import { SelectedQuestion } from "../database/entities/SelectedQuestion";
import AppUserRegionRepository, { IAppUserRegionRepository } from "../repositories/appUserRegion.repository";
import QuestionRepository, { IQuestionRepository } from "../repositories/question.repository";
import QuestionOptionsRepository, { IQuestionOptionsRepository } from "../repositories/questionOptions.repository";
import SelectedQuestionRepository, { ISelectedQuestionRepository } from "../repositories/selectedQuestion.repository";
import { QuestionDto } from "../utils/types/dtos";
import { RedisClientType } from "redis";
import redisClient from "../database/cache/connect";
import { createCustomError } from "../utils/errors/customError";
import { httpStatusCodes } from "../utils/helpers/httpStatusCodes";

export interface IQuestionService {
    createQuestions(data: QuestionDto): Promise<QuestionDto>
    getAllQuestions(): Promise<QuestionDto[]>
    getSingleQuestion(id: string): Promise<QuestionDto | null>
    getRegionAssignedQuestion(regionId: string): Promise<QuestionDto|null>
}
export class QuestionService implements IQuestionService {
    private questionRepository: IQuestionRepository<Question>;
    private questionOptionsRepository: IQuestionOptionsRepository<QuestionOptions>
    private selectedQuestionRepository: ISelectedQuestionRepository<SelectedQuestion>
    private appUserRegionsRepository: IAppUserRegionRepository<AppUserRegion>
    private redisClient: any

    constructor() {
        this.questionRepository = new QuestionRepository();
        this.questionOptionsRepository = new QuestionOptionsRepository();
        this.selectedQuestionRepository = new SelectedQuestionRepository();
        this.appUserRegionsRepository = new AppUserRegionRepository();
        this.redisClient = redisClient
    }

    public async createQuestions(data: QuestionDto): Promise<QuestionDto> {
        const question = await this.questionRepository.save(data);
        const questionOptions = await Promise.all(data.options.map((option) => {
            return this.questionOptionsRepository.save({ ...option, question: question.id });
        }))
        return { ...question, options: questionOptions };
    }

    public async getAllQuestions(): Promise<QuestionDto[]> {
        const questions = await this.questionRepository.findAll({
            relations: { options: true }
        });
        return questions;
    }

    public async getSingleQuestion(id: string): Promise<QuestionDto | null> {
        const question = await this.questionRepository.findOne({
            relations: { options: true },
            where: { id }
        });
        return question;
    }

    public async getRegionAssignedQuestion(regionId:string):Promise<QuestionDto | null> {
        const question = await this.redisClient.get(`region-question:${regionId}`);
        if(question) {
            return JSON.parse(question)
        }
        throw createCustomError("Question not found", httpStatusCodes.NOT_FOUND)
        
    }
}