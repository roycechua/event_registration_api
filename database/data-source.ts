import { DataSource } from "typeorm";
import { Event } from "./entity/Event";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "eventregistration",
    synchronize: false,
    logging: true,
    entities: [Event],
    subscribers: [],
    migrations: [],
})