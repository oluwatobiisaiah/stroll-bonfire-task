import { UpdateResult, InsertResult, DeepPartial, ObjectLiteral, Repository, EntityTarget, In, FindOptionsWhere } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
export interface IBaseRepository<T> {
    save(data: DeepPartial<T>): Promise<T>;
    findAll(filters?: Record<string, any>): Promise<T[]>;
    findOne(searchParams: any): Promise<T | null>;
    update(searchParams: any, data: QueryDeepPartialEntity<T>): Promise<UpdateResult>;
    upsert(fieldParam: any, data: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[]): Promise<InsertResult>;
    delete(id: string): Promise<any>;
    softDelete(id: string | number): Promise<void>;
    recoverSoftDeletedEntity(id: string | number): Promise<UpdateResult>;
}

export class BaseRepository<T extends ObjectLiteral> implements IBaseRepository<T> {
    protected repository: Repository<T>;

    constructor(entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(entity);
    }
    async save(data: DeepPartial<T>): Promise<T> {
        const resource = this.repository.create(data);
        return await this.repository.save(resource);
    }
    async findAll(filters?: Record<string, any>): Promise<T[]> {
        return await this.repository.find(filters);
    }
    async findOne(searchParams: any): Promise<T | null> {
        const result = await this.repository.findOne({ where: searchParams });
        return result;
    }
    async findByIds(ids: number[]): Promise<T[]> {
        const whereCondition: FindOptionsWhere<T> = {
            id: In(ids) as any, // Cast In(ids) to any to bypass type check 
        };

        return await this.repository.find({ where: whereCondition });
    }
    async findByNames(fieldName: keyof T, names: string[]): Promise<T[]> {
        const filters = {
            [fieldName]: In(names),
        } as FindOptionsWhere<T>; // Type assertion to match FindOptionsWhere<T> 

        return await this.repository.find({
            where: filters,
        });
    }
    async update(searchParams: any, data: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
        return await this.repository.update(searchParams, data);
    }
    async upsert(fieldParam: any, data: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[]): Promise<InsertResult> {
        return await this.repository.upsert(data, fieldParam)
    }
    async delete(id: string | number): Promise<any> {
        return await this.repository.delete(id)
    }
    async bulkDelete(ids: string[]): Promise<any> {
        return await this.repository.delete(ids)
    }

    async softDelete(id: string | number): Promise<void> {
        await this.repository.softDelete(id);
    }
    async recoverSoftDeletedEntity(id: string | number): Promise<UpdateResult> {
        const resource = await this.repository.restore(id);
        return resource;
    }

}