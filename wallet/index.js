const { INITIAL_BALANCE } = require('../config');
const ChainUtil = require('../chain-utils');

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
}

module.exports = Wallet;