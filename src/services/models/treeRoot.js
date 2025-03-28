import { TreeNode } from './treeNode';

export class TreeRoot { // Renamed from Tree to TreeRoot

    constructor(id, name, isVisible) {    
        this.id = id;
        this.name = name;
        this.nodes = [];
        this.isVisible = isVisible;     
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getNodes() {
        return this.nodes;
    }

    setNodes(nodes) {
        this.nodes = nodes;
    }

    getIsVisible() {
        return this.isVisible;
    }

    setIsVisible(isVisible) {
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
