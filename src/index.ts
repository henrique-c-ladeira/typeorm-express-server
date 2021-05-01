import { config } from 'dotenv-safe';
import 'reflect-metadata';
import path from 'path';
import { createConnection } from 'typeorm';
import app from './server';

config({ path: path.join(__dirname, '../.env') });

// eslint-disable-next-line no-void
void (async (): Promise<void> => {
  // create db connection
  await createConnection();
  // start express server
  app.listen(process.env.PORT ?? 3000, () => console.log("Oh GEE I'm up."));
})();
