import { TreeNode } from './treeNode';

export class TreeRoot { // Renamed from Tree to TreeRoot

    constructor(id, name, isVisible) {    
        this.id = id;
        this.name = name;
        this.nodes = [];
        this.isVisible = isVisible;     
    }


    addNode(node) {
        if (node instanceof TreeNode) {
            this.nodes.push(node);
        } else {
            throw new Error('Only instances of TreeNode can be added.');
        }
    }
}
