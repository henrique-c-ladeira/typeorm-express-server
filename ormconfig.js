const PostgressConnectionStringParser = require('pg-connection-string');

// const database = (process.env.mode === 'TEST') ? process.env.DB_NAME_TEST : process.env.DB_NAME;
const dropSchema = (process.env.mode === 'TEST');
const ssl = (process.env.NODE_ENV === 'production') ? { rejectUnauthorized: false } : false;

const databaseUrl = process.env.DATABASE_URL;
const connectionOptions = (process.env.mode === 'TEST')
  ? PostgressConnectionStringParser.parse(`${databaseUrl}_test`)
  : PostgressConnectionStringParser.parse(databaseUrl);

const config = (process.env.NODE_ENV === 'production')
  ? {
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
    }
  : {
      entities: [
        'src/entity/**/*.ts'
      ],
      migrations: [
        'src/migration/**/*.ts'
      ],
      subscribers: [
        'src/subscriber/**/*.ts'
      ],
      cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber'
      }
    };

const ormconfig = {
  type: 'postgres',
  host: connectionOptions.host,
  port: connectionOptions.port,
  database: connectionOptions.database,
  username: connectionOptions.user,
  password: connectionOptions.password,
  dropSchema,
  synchronize: true,
  ssl,
  logging: false,
  ...config
};

module.exports = ormconfig;
