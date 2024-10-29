import dotenv from "dotenv";
dotenv.config();

interface Config {
  DATABASE_HOST?: string;
  DATABASE_PORT?: string;
  DATABASE_USERNAME?: string;
  DATABASE_PASSWORD?: string;
  DATABASE_NAME?: string;
  NODE_ENV: string;
  APP_PORT: string | number;
  LIMIT_REQUEST_PER_MINUTE: string;
  REDIS_HOST:string;
  REDIS_PORT:string;
  REDIS_NAME:string;
  QUESTION_DURATION_IN_DAYS:number
}

const config: Config = {
  DATABASE_HOST: process.env.DATABASE_HOST || "localhost",
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME||"root",
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME ,
  NODE_ENV: process.env.NODE_ENV || "development",
  APP_PORT: process.env.APP_PORT || 4000,
  LIMIT_REQUEST_PER_MINUTE: process.env.LIMIT_REQUEST_PER_MINUTE || "20",
  REDIS_HOST:process.env.REDIS_HOST || "localhost",
  REDIS_PORT:process.env.REDIS_PORT || "6379",
  REDIS_NAME:process.env.REDIS_NAME || "bonfire_task",
  QUESTION_DURATION_IN_DAYS:Number(process.env.QUESTION_DURATION_IN_DAYS) || 7
};

export default config;
