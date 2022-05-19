module.exports = {
    "type": "postgres",
    "url":process.env.DATABASE_URL,
    "migrations": ["./dist/shared/typeorm/migrations/*.js"],
    "cli": {
        "migrationsDir": ["./src/shared/typeorm/migrations/"]
    },
    "entities": ["./dist/modules/**/typeorm/entities/*.js"]
}
