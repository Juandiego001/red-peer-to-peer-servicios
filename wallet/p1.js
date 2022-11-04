const Wallet = require('./index');
const Transaction = require('./transaction');

const w1 = new Wallet();
const w2 = new Wallet();
const amount = 20000;

console.log(w2.publicKey);

const tx = Transaction.newTransaction(w1, w2.publicKey, amount);
console.log(tx);

console.log('Transaction verify ' + Transaction.verifyTransaction(tx));