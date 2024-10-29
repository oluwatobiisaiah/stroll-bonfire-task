import { BaseRepository,IBaseRepository } from ".";
import { Question } from "../database/entities/Questions";
 
export interface IQuestionRepository<T> extends IBaseRepository<T> { 
 
} 
export default class QuestionRepository extends BaseRepository<Question> implements IQuestionRepository<Question> { 
    constructor() { 
        super(Question) 
    } 

    public async findOne(option:any){
        return this.repository.findOne(option)
    }

}