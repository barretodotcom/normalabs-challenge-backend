const ORMConfig = {
    "type": 'postgres',
    "url": process.env.DATABASE_URL,
    "migrations": ['./dist/shared/typeorm/migrations/*.js'],
    "cli": {
        "migrationsDir": ['./dist/shared/typeorm/migrations/'],
    },
    "entities": ['./dist/modules/**/typeorm/entities/*.js'],
    "ssl": true, "extra": { "ssl": { "rejectUnauthorized": false }}
};
module.exports = ORMConfig