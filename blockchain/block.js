const SHA256 = require('crypto-js/sha256');

class Block {
    constructor (timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    toString() {
        return `Block
            \tTimestamp: ${this.timestamp}
            \tLasthash: ${this.lastHash}
            \tHash: ${this.hash}
            \tData: ${this.data}`
    }

    static genesis() {
        return new this('Genesis Timestamp', '0'.repeat(64), '0'.repeat(64), []);
    }

    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = this.hash(timestamp, lastHash, data);
        return new Block(timestamp, lastHash, hash, data);
    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    static blockHash(block) {
        const { timestamp, lastHash, data } = block;
        return Block.hash(timestamp, lastHash, data);
    }
}

module.exports = Block;