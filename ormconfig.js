const PostgressConnectionStringParser = require('pg-connection-string');

// const database = (process.env.mode === 'TEST') ? process.env.DB_NAME_TEST : process.env.DB_NAME;
const dropSchema = (process.env.mode === 'TEST');

const databaseUrl = process.env.DATABASE_URL;
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);

const ormconfig = {
  type: 'postgres',
  host: connectionOptions.host,
  port: connectionOptions.port,
  database: connectionOptions.dbname,
  username: connectionOptions.user,
  password: connectionOptions.password,
  dropSchema,
  synchronize: true,
  ssl: { rejectUnauthorized: false },
  logging: false,
  entities: [
    'dist/entity/**/*.js'
  ],
  migrations: [
    'dist/migration/**/*.js'
  ],
  subscribers: [
    'dist/subscriber/**/*.js'
  ],
  cli: {
    entitiesDir: 'dist/entity',
    migrationsDir: 'dist/migration',
    subscribersDir: 'dist/subscriber'
  }
};

module.exports = ormconfig;
