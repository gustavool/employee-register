module.exports = {
  type: 'postgres',
  port: process.env.TYPEORM_PORT,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database:
    process.env.NODE_ENV === 'test'
      ? process.env.TYPEORM_DATABASE_TEST
      : process.env.TYPEORM_DATABASE,
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/entities/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
