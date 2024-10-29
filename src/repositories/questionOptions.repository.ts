import { BaseRepository,IBaseRepository } from ".";
import { QuestionOptions } from "../database/entities/QuestionOptions";
 
export interface IQuestionOptionsRepository<T> extends IBaseRepository<T> { 
 
} 
export default class QuestionOptionsRepository extends BaseRepository<QuestionOptions> implements IQuestionOptionsRepository<QuestionOptions> { 
    constructor() { 
        super(QuestionOptions) 
    } 

}