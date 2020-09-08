const path = process.env.NODE_ENV === "production" ? "dist" : "src";
const ext = process.env.NODE_ENV === "production" ? "js" : "ts";

module.exports = {
  type: "postgres",

  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,

  entities: [`./${path}/app/modules/**/entities/*.${ext}`],
  migrations: [`./${path}/database/migrations/*.${ext}`],
  cli: {
    migrationsDir: `./${path}/database/migrations`,
  },
};
