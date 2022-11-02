const Block = require('./block');

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

})