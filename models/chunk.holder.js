
class ChunkHolder {
    constructor() {
        this.chunk = "";    // takes data from socket
        this.errorCount = 0;    // error count while saving data to database
        this.lastEditTime = null; 
    }
}

module.exports = new ChunkHolder();