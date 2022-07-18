import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const { Pool } = pg;

const configDatabase : {
  connectionString: string | undefined,
  ssl: any
} = {
  connectionString: process.env.DATABASE_URL,
  ssl: undefined
}

if(process.env.MODE === "PROD") {
  configDatabase.ssl = {
    rejectUnauthorized: false
  }
}

export const connection = new Pool(configDatabase);
