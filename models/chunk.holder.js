
class ChunkHolder {
    constructor() {
        this.chunk = "";    // takes data from socket
        this.lastEditTime = null 
    }
}

module.exports = new ChunkHolder();