const SHA256 = require('crypto-js/sha256');

class Block
{
    constructor (index, data, previusHash = '')
    {
        this.index = index;
        this.date = new Date();
        this.data = data;
        this.previusHash = previusHash;
        this.hash = this.createHash();
        this.nonce = 0;
    }

    createHash()
    {
        return SHA256(this.index + this.date + this.data + this.previusHash + this.nonce).toString();
    }

    mine(difficulty)
    {
        while (!this.hash.startsWith(difficulty))
        {
            this.nonce++;
            this.hash = this.createHash();
        }
    }

}

class BlockChain
{
    constructor (genesis, difficulty = '00')
    {
        this.chain = [this.createFirstBlock(genesis)];
        this.difficulty = difficulty;
    }

    createFirstBlock(genesis)
    {
        return new Block(0,genesis);
    }

    getLastBlock()
    {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data)
    {
        let prevBlock = this.getLastBlock();
        let block = new Block(prevBlock.index + 1, data, prevBlock.hash);
        block.mine(this.difficulty);
        console.log('Minado! Hash: ' + block.hash + ' | Nonce: ' + block.nonce);
        this.chain.push(block);
    }

    isValid()
    {
        for (let i = 1; i < this.chain.length; i++)
        {
            let prevBlock = this.chain[i - 1];
            let currBlock = this.chain[i];

            if (currBlock.previusHash != prevBlock.hash)
                return false;
            if (currBlock.createHash() != currBlock.hash)
                return false;
            return true;
        }
    }
}

// block = new Block(0,'test');
// console.log(JSON.stringify(block,null,2));

let eduCoin = new BlockChain('eduCoin', '000');
eduCoin.addBlock('test1');
eduCoin.addBlock('test2');

eduCoin.chain[1].data = 'test1';

console.log(eduCoin.isValid());
// console.log(JSON.stringify(eduCoin.chain,null,2));