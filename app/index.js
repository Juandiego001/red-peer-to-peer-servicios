const express = require('express');
const cors = require('cors');
const Blockchain = require('../blockchain/index');
const P2pServer = require('./p2pServer');

const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 3000;

// ************************
//      The blockchain
// ************************
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

// Middlewares
app.use(express.json());
app.use(cors());

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
})

app.post('/mine', (req, res) => {
    const theBlock = bc.addBlock(req.body.data);
    console.log(`Block added succesfull: ${theBlock.toString()}`);
    p2pServer.syncChains();
    res.redirect('/blocks');
})

app.listen(HTTP_PORT, () => {
    console.log(`Server listen on port ${HTTP_PORT}...`);
})

p2pServer.listen();

