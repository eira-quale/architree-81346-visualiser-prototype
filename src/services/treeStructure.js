
export class FunctionalTree{

    constructor(){
        this.nodes = [];
    }

    
    

}








  export class TreeNode {
    constructor(value, nodeType, parent = null) {
      this.key = makeid(5)
      this.value = value;
      this.nodeType = nodeType;

      this.parent = parent;
      this.children = [];
    }


  
    get isLeaf() {
      return this.children.length === 0;
    }
  
    get hasChildren() {
      return !this.isLeaf;
    }
  }

  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}


  