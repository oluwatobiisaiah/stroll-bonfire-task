import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AppUserRegion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type:String})
  userRegion:string;

  @Column({type:"timestamptz",default:()=> "CURRENT_TIMESTAMP"})
  @CreateDateColumn()
  createdAt:Date;

  @Column({type:"timestamptz",default:()=> "CURRENT_TIMESTAMP"})
  @UpdateDateColumn()
  updatedAt:Date;
}