class Aspect {
  static VALID_ASPECT_TYPES = ["Functional", "Location", "Product"];

  constructor(id, rds, name, description, children = [], parentId = null) {
    this.id = id;
    this.rds = rds;
    this.name = name;
    this.description = description;
    this.children = children; // Array of sub-functions, sub-products, or sub-locations
    this.parentId = parentId; // Reference to the parent aspect
    this.isVisible = this.isRoot(); // Root nodes default to true, children default to false
    this.showChildren = false;
  }

  // Check if this node is a root node
  isRoot() {
    return this.parentId === null || this.parentId === undefined;
  }

  getisVisible() {
    return this.isVisible;
  }

  setisVisible(visible) {
    this.isVisible = visible;
  }

  // Getters
  getId() {
    return this.id;
  }

  getRds() {
    return this.rds;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getChildren() {
    return this.children;
  }

  getShowChildren() {
    return this.showChildren;
  }

  // Setters
  setId(id) {
    this.id = id;
  }

  setRds(rds) {
    this.rds = rds;
  }

  setName(name) {
    this.name = name;
  }

  setDescription(description) {
    this.description = description;
  }

  setChildren(children) {
    this.children = children;
  }

  setShowChildren(showChildren) {
    this.showChildren = showChildren;
  }

  toggleShowChildren() {
    this.showChildren = !this.showChildren;

    this.children = [...this.children];
    // Recursively toggle showChildren for all children
    this.children.forEach(child => {
      child.isVisible = !child.isVisible;
    });
  }

  hasChildren() {
    return Array.isArray(this.children) && this.children.length > 0;
  }

}

export default Aspect;
