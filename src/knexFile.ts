import { Knex } from "knex";

import config from "./config";
import path from 'path';

const { database: dbConfig } = config;

export const baseKnexConfig = {
  client: 'pg',
  connection: {
    database: 'todo_api',
    host: '127.0.0.1',
    password: 'sainik@28',
    user: 'postgres',
  },
};


const knexConfig: Knex.Config = {
  ...baseKnexConfig,
  migrations: {
    directory: "./database/migrations",
    stub: "./stubs/migration.stub",
    tableName: "migrations",
  },
  seeds: {
    directory: "./database/seeds",
    stub: "./stubs/seed.stub",
  },
};


export default knexConfig;
