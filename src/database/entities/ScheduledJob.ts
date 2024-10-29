import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinColumn } from "typeorm";
import { QuestionOptions } from "./QuestionOptions";

@Entity()
export class ScheduledJob {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type:"timestamptz",default:()=> "CURRENT_TIMESTAMP"})
  @CreateDateColumn()
  createdAt:Date;

  @Column({type:"timestamptz",default:()=> "CURRENT_TIMESTAMP"})
  @UpdateDateColumn()
  updatedAt:Date;
}