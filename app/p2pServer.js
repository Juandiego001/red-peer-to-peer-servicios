const webSocket = require('ws');
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
const P2P_PORT = process.env.P2P_PORT || 5001;

const MESSAGE_TYPES = {
    chain: 'CHAIN',
    transaction: 'TRANSACTION',
    clear_transactions: 'CLEAR_TRANSACTION'
}

class p2pServer {
    constructor(blockchain, transactionsPool) {
        this.transactionsPool = transactionsPool;
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen() {
        const server = new webSocket.Server({port: P2P_PORT});
        server.on('connection', socket => this.connectSocket(socket));
        this.connectToPeers(peers);
        console.log('Listening for peer to peer connections on port ' + P2P_PORT);
    }

    connectToPeers(peers) {
        peers.forEach(peer => {
            const socket = new webSocket(peer);
            socket.on('open', () => this.connectSocket(socket));
        })
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        console.log('[+] Socket connected');
        this.messageHandler(socket);
        this.sendChain(socket);
    }

    messageHandler(socket) {
        socket.on('message', message => {
            const data = JSON.parse(message);
            if (data.type == MESSAGE_TYPES.chain) {
                this.blockchain.replaceChain(data.chain);
            } else if (data.type == MESSAGE_TYPES.transaction) {
                this.transactionsPool.updateOrAddTransaction(data.transaction);
            } else if (data.type == MESSAGE_TYPES.clear_transactions) {
                this.transactionsPool.clear();
            }
        })
    }

    sendChain(socket) {
        socket.send(JSON.stringify({
            type: MESSAGE_TYPES.chain,
            chain: this.blockchain.chain
        }));
    }

    sendTransaction(socket, transaction) {
        socket.send(JSON.stringify({
            type: MESSAGE_TYPES.transaction,
            transaction
        }));
    }

    syncChains() {
        this.sockets.forEach(socket => {
            this.sendChain(socket);
        })
    }

    broadcastTransaction(transaction) {
        this.sockets.forEach(socket => this.sendTransaction(socket, transaction));
    }

    broadcastClearTransactions() {
        this.sockets.forEach(socket => socket.send(JSON.stringify({
            type: MESSAGE_TYPES.clear_transactions
        })))
    }
}

module.exports = p2pServer;

