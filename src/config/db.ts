import knex from "knex";
import config from "./config";

export const db = knex({
  client: "pg",
  connection: {
    host: config.DATABASE.HOST,
    user: config.DATABASE.USER,
    password: config.DATABASE.PASSWORD,
    database: config.DATABASE.NAME,
    port: Number(config.DATABASE.PORT),
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export const initializeDatabase = async () => {
  try {
    await db.raw("SELECT NOW()");
  } catch (error) {
    throw error;
  }
};
