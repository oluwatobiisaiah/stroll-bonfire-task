import { Router } from "express";
import { QuestionService } from "../service/question.service";
import QuestionController from "../controllers/question.controller";
import asyncWrapper from "../middlewares/asyncWrapper";
import apiLimiter from "../middlewares/rateLimiter";

const questionService = new QuestionService();
const questionController = new QuestionController(questionService);
const applicationRoutes = Router();
applicationRoutes.use(apiLimiter);
applicationRoutes.route("/question").get(asyncWrapper(questionController.getAllQuestionsController)).post(asyncWrapper(questionController.createQuestionController));
applicationRoutes.route("/question/:id").get(asyncWrapper(questionController.getSingleQuestionController));
applicationRoutes.route("/user-region-question/:regionId").get(questionController.getUserRegionQuestionController);

export default applicationRoutes;