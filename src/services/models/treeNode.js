export class TreeNode {
    constructor(aspect, id) {
      this.id = id;
      this.data = aspect;        // Instance of Aspect
      this.children = [];
      this.isVisible = true;
      this.showChildren = false;
      this.locatedHere = [];     // RealObject IDs located at this node (only used in Lokalisering tree)
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