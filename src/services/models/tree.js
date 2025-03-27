export class Tree {
    constructor(id, name, nodes = [], isVisible) {
        this.id = id;
        this.name = name;
        this.nodes = nodes; // Default to an empty array
        this.isVisible = isVisible;
    }

    // Getters
    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getNodes() {
        return this.nodes;
    }

    getIsVisible() {
        return this.isVisible;
    }

    // Setters
    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setNodes(nodes) {
        this.nodes = nodes;
    }

    setIsVisible(isVisible) {
        this.isVisible = isVisible;
    }
}


