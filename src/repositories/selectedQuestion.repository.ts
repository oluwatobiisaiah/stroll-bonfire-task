import { BaseRepository, IBaseRepository } from ".";
import { SelectedQuestion } from "../database/entities/SelectedQuestion";

export interface ISelectedQuestionRepository<T> extends IBaseRepository<T> {

}
export default class SelectedQuestionRepository extends BaseRepository<SelectedQuestion> implements ISelectedQuestionRepository<SelectedQuestion> {
    constructor() {
        super(SelectedQuestion)
    }

    public async findOne(option: any) {
        return this.repository.findOne(option)
    }
}