const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Uncaught exceptions : Bugs or errors that occur in sync code but not handled anywhere
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successfull'));

const port = 3000;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

// Each time there is an unhandled rejection in the application, the process object will emmit an object called unhandledRejection
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION 💥 Shutting down...');
  console.log(err.name, err.message);

  server.close(() => {
    //Server.close allows the server time to finish all the requests that are still pending or being handled
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  //sigterm is a signal that is used to cause a programme to really stop running
  console.log('👋 SIGTERM RECIEVED. Shutting down gracefully');
  server.close(() => {
    console.log('🧨 Process terminated!');
  });
});
