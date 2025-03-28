class Aspect {

  constructor(id, rds, name, previousName) {
    this.id = id;
    this.rds = rds;
    this.name = name;
    this.previousName = previousName;
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


}

export default Aspect;
