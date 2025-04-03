import { defineConfig } from "drizzle-kit";
import dotenv from 'dotenv'

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined. Please check your environment variables and ensure the database is provisioned.");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});