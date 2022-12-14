const Block = require('./block');
const { DIFFICULTY } = require('../config');

describe('block', () => {
    let data, lastBlock, block;
    beforeEach(() => {
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, lastBlock.data);
    });

    it('Set the data to match the input', () => {
        expect(block.data).toEqual(lastBlock.data);
    });

    it('Set the lastHash to match the hash of the last block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

    it('Generates the hash to match the difficulty', () => {
        expect(block.hash.substring(0, DIFFICULTY)).toEqual("0".repeat(DIFFICULTY));
    })

})