import { config } from 'dotenv';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './server';

config();

// eslint-disable-next-line no-void
void (async (): Promise<void> => {
  // create db connection
  await createConnection();
  // start express server
  app.listen(process.env.PORT, () => console.log('Oh GEE I\'m up on PORT'));
})();
