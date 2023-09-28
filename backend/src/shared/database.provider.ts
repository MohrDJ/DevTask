import * as dotenv from 'dotenv';
import { DataSourceOptions } from "typeorm"

dotenv.config();
export const dataBaseConfigOracle: DataSourceOptions = {
    type: 'oracle',
    name: process.env.DB_ORACLE_DATABASE,
    host: process.env.DB_ORACLE_HOST,
    port: Number(process.env.DB_ORACLE_PORT),
    username: process.env.DB_ORACLE_USERNAME,
    password: process.env.DB_ORACLE_PASSWORD,
    serviceName: process.env.DB_ORACLE_DATABASE,
    entities: ['dist/**/*.entity.js'],
    synchronize: false,
    sid: 'sankhya',
}