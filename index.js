const temp = require('./routes/temp');
const data = require('./routes/data');
const Net = require('net');
const express = require('express');

const server = new Net.Server();
const app = express();

require('./startup/db')();
require('./startup/tcp.server')(server);
require('./startup/scheduled.tasks')();

app.use('/api/data', data);
app.use('/api/temp', temp);

const expressPort = process.env.EXPRESS_PORT || 3000;
app.listen(expressPort, () => console.log(`Express Server is listenning on port ${expressPort}`));