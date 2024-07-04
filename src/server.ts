import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Ecommerce backend running on port: ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// gracefully maintain the server
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection is detected, shutting down ...', err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('Uncaught exception is detected, shutting down ..');
  process.exit(1);
});
