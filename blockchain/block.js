const ChainUtil = require('../chain-utils');
const { DIFFICULTY, MINE_RATE, INITIAL_BALANCE } = require('../config');

class Block {
    constructor (timestamp, lastHash, hash, data, nonce, difficulty, processTime) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
        this.processTime = processTime;
    }

    toString() {
        return `Block
            \tTimestamp: ${this.timestamp}
            \tLasthash: ${this.lastHash}
            \tHash: ${this.hash}
            \tData: ${this.data}
            \tNonce: ${this.nonce}
            \tDifficulty: ${this.difficulty}
            \tProcess Time: ${this.processTime}`
    }

    static genesis() {
        return new this('Genesis Timestamp', '0'.repeat(64), '0'.repeat(64), [], 0, this.difficulty || DIFFICULTY, 0);
    }

    static mineBlock(lastBlock, data) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;
        let timeStart = Date.now();
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data, nonce);
        } while (hash.substring(0, difficulty) != "0".repeat(difficulty));
        let timeEnd = Date.now();

        let processTime = timeEnd - timeStart; 

        return new this(timestamp, lastHash, hash, data, nonce, difficulty, processTime);
    }

    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block) {
        const { timestamp, lastHash, data, nonce, difficulty } = block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return  difficulty;
    }
}

module.exports = Block;