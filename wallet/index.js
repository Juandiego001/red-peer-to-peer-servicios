const { INITIAL_BALANCE } = require('../config');
const ChainUtil = require('../chain-utils');
const Transaction = require('./transaction');

class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString() {
        return `Wallet
                publicKey: ${this.publicKey}
                balance: ${this.balance}`
    }

    sign(datahash) {
        return this.keyPair.sign(datahash);
    }

    createTransaction(recipient, amount, blockchain, transactionPool, message=null) {
        this.balance = this.calculateBalance(blockchain, this.publicKey);
        if (amount > this.balance) {
            console.log(`Amount ${amount} exceeds balance ${this.balance}`);
            return;
        }

        let transaction = transactionPool.existingTransaction(this.publicKey);

        if (transaction) {
            transaction.update(this, recipient, amount, message);
        } else {
            transaction = Transaction.newTransaction(this, recipient, amount, message);

            transactionPool.updateOrAddTransaction(transaction);
        }
        return transaction;
    }

    static blockchainWallet() {
        const blockchainWallet = new this();
        blockchainWallet.address = 'Coinbase-000000XX';
        return blockchainWallet;
    }

    calculateBalance(blockchain, address) {
        let balance = this.balance;
        let transactions = [];
        if (blockchain.chain.length <= 1) {
            return balance;
        } else {
            const bcCopy = blockchain.chain.slice(1, blockchain.chain.length);
            bcCopy.forEach(block => {
                block.data.forEach(transaction => {
                    transactions.push(transaction);
                })
            })
        }

        const walletInputs = transactions.filter(transaction => transaction.input.address == address);
        let startTime = 0;
        if (walletInputs.length > 0) {
            const recentInputs = walletInputs.reduce((prev, current) => prev.input.timestamp > current.input.timestamp ? prev : current);
            balance = recentInputs.outputs.find(output => output.address == address).amount;
            startTime = recentInputs.input.timestamp;
        }

        transactions.forEach(transaction => {
            if (transaction.input.timestamp > startTime) {
                transaction.outputs.find(output => {
                    if (output.address == address) {
                        balance = output.amount + balance;
                    }
                })
            }
        })

        return balance;
    }
}

module.exports = Wallet;