import { Knex } from "knex";

import config from "./config";
import db from "./db";

const { database: dbConfig } = config;

export const baseKnexConfig = {
  client: dbConfig.client,
  connection: {
    database: dbConfig.database,
    host: dbConfig.host,
    password: dbConfig.password,
    user: dbConfig.user,
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