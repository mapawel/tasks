import { DataSource } from "typeorm";
import { config } from "dotenv-safe";

config();

export const mySQLDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 3306),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["./**/entity/*.ts"],
  logging: true,
  synchronize: false,
});
