export class TreeNode { // Renamed from Node to TreeNode

    constructor(aspect, id) { // Updated parameter name for clarity
        this.id = id;
        this.data = aspect; // Renamed to match the usage in Main.vue
        this.children = [];
        this.isVisible = true;
        this.showChildren = false;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    getChildren() {
        return this.children;
    }

    setChildren(children) {
        this.children = children;
    }

    getIsVisible() {
        return this.isVisible;
    }

    setIsVisible(isVisible) {
        this.isVisible = isVisible;
    }

    getShowChildren() {
        return this.showChildren;
    }

    setShowChildren(showChildren) {
        this.showChildren = showChildren;
    }
}