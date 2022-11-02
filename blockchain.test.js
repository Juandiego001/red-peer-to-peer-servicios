const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    let bc, bc2;
    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    });

    it('First block of the blockchain is genesis', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('Data of the last block is equal to the added', () => {
        const data = "helloworld";
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
    });

    it('Adding new block and expect to work well', () => {
        bc2.addBlock('foo');
        expect(bc2.isValidChain(bc2.chain)).toBe(true);
    })

    it('Validate the genesis block hash', () => {
        bc2.chain[0].hash = 'asdasdasdas';
        expect(bc2.isValidChain(bc2.chain)).toBe(false);
    })

    it('Validate that two chains are different', () => {
        bc2.addBlock('sdadsadas');
        bc2.chain[1].data = 'asdasdas';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });
})