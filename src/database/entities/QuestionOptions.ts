import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Question } from "./Questions";

@Entity()
export class QuestionOptions {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type:String})
  optionBody:string;

  @ManyToOne(()=>Question,(question)=>question.id)
  question:string;

  @Column({type:"timestamptz",default:()=> "CURRENT_TIMESTAMP"})
  @CreateDateColumn()
  createdAt:Date;

  @Column({type:"timestamptz",default:()=> "CURRENT_TIMESTAMP"})
  @UpdateDateColumn()
  updatedAt:Date;
}