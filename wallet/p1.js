const Wallet = require('./index');
const Transaction = require('./transaction');
const TransactionPool = require('./transactions-pool');

const wallet = new Wallet();
const tp = new TransactionPool();
const amount = 30;
const tx = Transaction.newTransaction(wallet, 'sdsadada', amount);

tp.updateOrAddTransaction(tx);
console.log(tp.transactions.find(t => t.id == tx.id) === tx);
const newTx = tx.update(wallet, 'sdsadada', amount + 20);
tp.updateOrAddTransaction(newTx);
console.log(newTx);
console.log(tp.transactions.find(t => t.id == newTx.id) === newTx);