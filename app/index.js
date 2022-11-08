const express = require('express');
const cors = require('cors');
const Blockchain = require('../blockchain/index');
const P2pServer = require('./p2pServer');
const Miner = require('./miner');
const Wallet = require('../wallet/index');
const TransactionPool = require('../wallet/transactions-pool');


// ************************
//      The blockchain
// ************************
const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();

const theWallets = [];

const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 3000;

const p2pServer = new P2pServer(bc, tp);
const miner = new Miner(bc, tp, wallet, p2pServer);

// Middlewares
app.use(express.json());
app.use(cors());

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
})

app.get('/balance', (req, res) => {
    res.json(wallet.calculateBalance(bc, wallet.publicKey));
})

app.post('/address-balance', (req, res) => {
    res.json(wallet.calculateBalance(bc, req.body.address));
})

app.post('/mine', (req, res) => {
    const theBlock = bc.addBlock(req.body.data);
    console.log(`Block added succesfull: ${theBlock.toString()}`);
    p2pServer.syncChains();
    res.redirect('/blocks');
})

app.get('/transactions', (req, res) => {
    res.json(tp.transactions);
});

app.post('/transaction', (req, res) => {
    const { recipient, amount, message } = req.body;
    const transaction = wallet.createTransaction(recipient, amount, bc, tp, message);
    p2pServer.broadcastTransaction(transaction);
    res.redirect('/transactions');
})

app.get('/public-key', (req, res) => {
    res.json({publicKey: wallet.publicKey});
})

app.post('/mine-transactions', (req, res) => {
    const block = miner.mine();
    console.log(`Added new block ${block}`);
    res.redirect('/blocks');

})

app.listen(HTTP_PORT, () => {
    console.log(`Server listen on port ${HTTP_PORT}...`);
})

p2pServer.listen();

