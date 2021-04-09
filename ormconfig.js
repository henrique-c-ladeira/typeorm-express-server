const database = (process.env.mode === 'TEST') ? process.env.DB_NAME_TEST : process.env.DB_NAME;
const dropSchema = (process.env.mode === 'TEST');

const ormconfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database,
  dropSchema,
  synchronize: true,
  logging: false,
  entities: [
    'build/src/entity/**/*.js'
  ],
  migrations: [
    'build/src/migration/**/*.js'
  ],
  subscribers: [
    'build/src/subscriber/**/*.js'
  ],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
};

module.exports = ormconfig;
