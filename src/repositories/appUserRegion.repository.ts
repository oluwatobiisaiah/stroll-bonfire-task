import { BaseRepository, IBaseRepository } from ".";
import { AppUserRegion } from "../database/entities/AppUserRegions";

export interface IAppUserRegionRepository<T> extends IBaseRepository<T> {

}
export default class AppUserRegionRepository extends BaseRepository<AppUserRegion> implements IAppUserRegionRepository<AppUserRegion> {
    constructor() {
        super(AppUserRegion)
    }

    public async findOne(option: any) {
        return this.repository.findOne(option)
    }
}