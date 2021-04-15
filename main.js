class Block {
    constructor (index, data, previusHash = '')
    {
        this.index = index;
        this.date = new Date();
        this.data = data;
        this.previusHash = previusHash;
        this.hash = '';
    }

}