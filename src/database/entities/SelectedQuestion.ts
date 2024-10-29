import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { AppUserRegion } from "./AppUserRegions";
import { Question } from "./Questions";

@Entity()
export class SelectedQuestion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(()=>Question,(question)=>question.id)
  question:string;

  @ManyToOne(()=>AppUserRegion,(region)=>region.id)
  userRegion:string;

  @Column({type:"timestamptz",default:()=> "CURRENT_TIMESTAMP"})
  @CreateDateColumn()
  createdAt:Date;

  @Column({type:"timestamptz",default:()=> "CURRENT_TIMESTAMP"})
  @UpdateDateColumn()
  updatedAt:Date;
}