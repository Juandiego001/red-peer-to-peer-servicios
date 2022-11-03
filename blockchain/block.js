const SHA256 = require('crypto-js/sha256');
const { DIFICULTY } = require('../config');

class Block {
    constructor (timestamp, lastHash, hash, data, nonce) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    toString() {
        return `Block
            \tTimestamp: ${this.timestamp}
            \tLasthash: ${this.lastHash}
            \tHash: ${this.hash}
            \tData: ${this.data}
            \tNonce: ${this.nonce}`
    }

    static genesis() {
        return new this('Genesis Timestamp', '0'.repeat(64), '0'.repeat(64), [], 0);
    }

    static mineBlock(lastBlock, data) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            hash = this.hash(timestamp, lastHash, data);
        } while (hash.substring(0, DIFICULTY) != "0".repeat(DIFICULTY));

        return new this(timestamp, lastHash, hash, data, nonce);
    }

    static hash(timestamp, lastHash, data, nonce) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
    }

    static blockHash(block) {
        const { timestamp, lastHash, data, nonce } = block;
        return Block.hash(timestamp, lastHash, data, nonce);
    }
}

module.exports = Block;