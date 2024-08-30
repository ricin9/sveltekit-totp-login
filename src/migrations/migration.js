// @ts-nocheck
import { createClient } from "@libsql/client";
import fs from "fs";
import path from "path";

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const migration = fs.readFileSync("src/migrations/migration.sql", {
  encoding: "utf-8",
});

turso
  .executeMultiple(migration)
  .then(() => console.log("[MIGRATION] migration has run successfully"))
  .catch(() => console.error("[MIGRATION] migration has failed"));
