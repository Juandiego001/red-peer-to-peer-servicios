const Wallet = require('./index');
const Transaction = require('./transaction');

const wallet = new Wallet();
const tx = Transaction.rewardTransaction(wallet, Wallet.blockchainWallet());

console.log(tx.outputs.find(output => output.address === wallet.publicKey).amount);