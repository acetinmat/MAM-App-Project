const logger = require('../controlers/logger');
const saveDataToDatabase = require('../controlers/saveDataToDatabase');

const tcpPort = process.env.TCP_PORT || 3001;

class ChunkHolder {
    constructor() {
        this.chunk = "";    // takes data from socket
    }
}

let chunkHolder = new ChunkHolder();

module.exports = function (server) {
    server.listen(tcpPort, function () {
        logger.info(`Server listening for connection requests on socket localhost:${tcpPort}`);
    });

    // emits when saved data that is taken from tcp socket to chunkHolder.chunk 
    server.on('dataAdded', saveDataToDatabase);

    server.on('connection', function (socket) {
        logger.info('A new connection has been established.');
        // Now that a TCP connection has been established, the server can send data to
        // the client by writing to its socket.
        // socket.write('Hello, client.');

        // The server can also receive data from the client by reading from its socket.
        socket.on('data', function (data) {
            logger.info('Data recieved.');
            chunkHolder.chunk += data.toString(); // Add string on the end of the variable 'chunkHolder.chunk'
            server.emit('dataAdded', chunkHolder);
        });

        // When the client requests to end the TCP connection with the server, the server
        // ends the connection.
        socket.on('end', function () {
            logger.info('Closing connection with the client');
        });

        // Don't forget to catch error, for your own sake.
        socket.on('error', function (err) {
            logger.error(err.message, err);
        });
    });
}