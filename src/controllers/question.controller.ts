import { NextFunction, Request, Response } from "express"
import BaseController from "./base.controller"
import { QuestionService } from "../service/question.service"
import { createCustomError } from "../utils/errors/customError"
import { httpStatusCodes } from "../utils/helpers/httpStatusCodes"


export default class QuestionController extends BaseController {
    constructor(private readonly questionService: QuestionService) {
        super()
    }

    createQuestionController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const question = await this.questionService.createQuestions(req.body);
            this.successResponse(res, "Question successfully created", question);
        } catch (error) {
            next(createCustomError(error.message, error.code ?? httpStatusCodes.INTERNAL_SERVER_ERROR));
        }
    }

    getAllQuestionsController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const questions = await this.questionService.getAllQuestions();
            const paginatedData = this.paginateQueryLogic(questions, req);
            this.successResponse(res, "Questions fetched successfully", paginatedData);
        } catch (error) {
            next(createCustomError(error.message, error.code ?? httpStatusCodes.INTERNAL_SERVER_ERROR));
        }
    }

    getSingleQuestionController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const question = await this.questionService.getSingleQuestion(req.params.id);
            this.successResponse(res, "Question retrieved successfully", question);
        } catch (error) {
            next(createCustomError(error.message, error.code ?? httpStatusCodes.INTERNAL_SERVER_ERROR));
        }
    }

    getUserRegionQuestionController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const question = await this.questionService.getRegionAssignedQuestion(req.params.regionId);
            this.successResponse(res, "Question retrieved successfully", question);
        } catch (error) {
            next(createCustomError(error.message, error.code ?? httpStatusCodes.INTERNAL_SERVER_ERROR));
        }
    }

}