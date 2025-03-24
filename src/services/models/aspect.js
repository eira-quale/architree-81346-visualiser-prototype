class Aspect {
  static VALID_ASPECT_TYPES = ["Functional", "Location", "Product"];

  constructor(id, rds, name, description, aspectType, children = [], parentId = null, linkedAspects) {
    if (!Aspect.VALID_ASPECT_TYPES.includes(aspectType)) {
      throw new Error(`Invalid aspectType: ${aspectType}. Must be one of ${Aspect.VALID_ASPECT_TYPES.join(", ")}`);
    }

    this.id = id;
    this.rds = rds;
    this.name = name;
    this.description = description;
    this.aspectType = aspectType;
    this.children = children; // Array of sub-functions, sub-products, or sub-locations
    this.parentId = parentId; // Reference to the parent aspect
    this.isVisible = this.isRoot(); // Root nodes default to true, children default to false
    this.showChildren = false;
    this.linkedAspects = linkedAspects;
  }

  // Check if this node is a root node
  isRoot() {
    return this.parentId === null || this.parentId === undefined;
  }


  getisVisible(){
    return this.isVisible;

  }

  setisVisible(visible){
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

  getAspectType() {
    return this.aspectType;
  }

  getChildren() {
    return this.children;
  }

  getShowChildren() {
    return this.showChildren;
  }

  getLinkedAspecta(){
    return this.linkedAspects;
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

  setAspectType(aspectType) {
    if (!Aspect.VALID_ASPECT_TYPES.includes(aspectType)) {
      throw new Error(`Invalid aspectType: ${aspectType}. Must be one of ${Aspect.VALID_ASPECT_TYPES.join(", ")}`);
    }
    this.aspectType = aspectType;
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
