const Block = require('./block');

const fooBlock = Block.mineBlock(Block.genesis(), 'foobar');
console.log(Block.genesis().toString());
console.log(fooBlock.toString());