import { DataSource, DataSourceOptions } from "typeorm"
import config from "../config/config"

export const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    synchronize: config.NODE_ENV === "test",
    dropSchema: config.NODE_ENV === "test",
    logging: ["development", "test"].includes(config.NODE_ENV) ? ["query", "error", "schema", "info", "migration"] : false,
    database: config.DATABASE_NAME,
    host: config.DATABASE_HOST,
    port: Number(config.DATABASE_PORT),
    username: config.DATABASE_USERNAME,
    password: config.DATABASE_PASSWORD,
    entities: ["src/database/entities/*{.js,.ts}", "src/database/entities/*/*{.js,.ts}"],
    migrations: ["src/database/migrations/*{.js,.ts}"],
    subscribers: ["src/subscribers/*{.js.ts}"],
    ssl: ["development", "test"].includes(config.NODE_ENV) ? undefined : { rejectUnauthorized: false },
}

export const AppDataSource = new DataSource(dataSourceOptions)