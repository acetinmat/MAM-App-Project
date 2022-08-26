require('dotenv').config();
const errorMiddleware = require('./middlewares/error');
const data = require('./routes/data');
const Net = require('net');
const express = require('express');
const winston = require('winston');
const logger = require('./controlers/logger');

const server = new Net.Server();
const app = express();

logger.exceptions.handle(new winston.transports.File({ filename: 'exceptions.log', dirname: 'logFiles' }));
logger.rejections.handle(new winston.transports.File({ filename: 'exceptions.log', dirname: 'logFiles' }));

require('./startup/db')();
require('./startup/tcp.server')(server);
require('./startup/scheduled.tasks')();

app.use('/api/data', data);

app.use(errorMiddleware);

const expressPort = process.env.EXPRESS_PORT || 3000;
const expressServer = app.listen(expressPort, () => logger.info(`Express Server is listenning on port ${expressPort}`));

process.on('SIGTERM', () => {
    let tcpErr, expressErr;
    console.info('SIGTERM signal received.');
    console.log('Closing tcp server.');
    server.close((err) => {
      console.log('Http server closed.');
      tcpErr = err;
    });
    console.log('Closing express server.');
    expressServer.close((err) => {
      console.log('Http server closed.');
      expressErr = err;
    });
    const exitCode = (tcpErr || expressErr);
    process.exit(exitCode ? 1 : 0);
  });
