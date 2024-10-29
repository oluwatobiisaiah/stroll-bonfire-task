import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinColumn } from "typeorm";
import { QuestionOptions } from "./QuestionOptions";

@Entity()
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type:String})
  questionBody:string;

  @Column({type:Boolean,default:true})
  allowVoiceReply:boolean;

  @OneToMany(()=>QuestionOptions,(option)=>option.question)
  // @Column({nullable:true})
  options:QuestionOptions[];

  @Column({type:"timestamptz",default:()=> "CURRENT_TIMESTAMP"})
  @CreateDateColumn()
  createdAt:Date;

  @Column({type:"timestamptz",default:()=> "CURRENT_TIMESTAMP"})
  @UpdateDateColumn()
  updatedAt:Date;
}