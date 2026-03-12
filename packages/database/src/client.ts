import dotenv from "dotenv";

import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "./generated/prisma/client.js";

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });
