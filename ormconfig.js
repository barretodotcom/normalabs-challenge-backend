console.log(process.env.DATABASE_URL);

module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    migrations: ['./dist/shared/typeorm/migrations/*.js'],
    cli: {
        migrationsDir: ['./dist/shared/typeorm/migrations'],
    },
    entities: ['./dist/modules/**/typeorm/entities/**.js'],
};
