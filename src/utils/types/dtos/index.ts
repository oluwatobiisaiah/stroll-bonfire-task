export interface QuestionDto{
    id:string;
    questionBody:string;
    options:QuestionOption[],
    allowVoiceReply:boolean;
    createdAt?:Date;
    updatedAt?:Date;
}

export interface QuestionOption{
    id:string;
    question:string;
    optionBody:string;
    createdAt?:Date;
    updatedAt?:Date
}