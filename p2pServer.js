const webSocket = require('ws');
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
const P2P_PORT = process.env.P2P_PORT || 5001;

class p2pServer {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen() {
        const server = new webSocket.Server({port: P2P_PORT});
        server.on('connection', socket => this.connectSocket(socket));
        console.log('Listening for peer to peer connections on port ' + P2P_PORT);
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        console.log('[+] Socket connected');
    }
}

