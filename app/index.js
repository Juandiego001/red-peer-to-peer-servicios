const express = require('express');
const cors = require('cors');
const Blockchain = require('../blockchain/index');

const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 3000;

// ************************
//      The blockchain
// ************************
const bc = new Blockchain();

// Middlewares
app.use(express.json());
app.use(cors());

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
})

app.post('/mine', (req, res) => {
    const theBlock = bc.addBlock(req.body.data);
    console.log(`Block added succesfull: ${theBlock.toString()}`);
    res.redirect('/blocks');
})

app.listen(HTTP_PORT, () => {
    console.log(`Server listen on port ${HTTP_PORT}...`);
})

