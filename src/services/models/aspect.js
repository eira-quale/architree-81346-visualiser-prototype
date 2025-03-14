class Aspect {
  static VALID_ASPECT_TYPES = ["Functional", "Location", "Product"];

  constructor(id, rds, name, description, aspectType, children = []) {
    if (!Aspect.VALID_ASPECT_TYPES.includes(aspectType)) {
      throw new Error(`Invalid aspectType: ${aspectType}. Must be one of ${Aspect.VALID_ASPECT_TYPES.join(", ")}`);
    }
    
    this.id = id;
    this.rds = rds;
    this.name = name;
    this.description = description;
    this.aspectType = aspectType;
    this.children = children; // Array of sub-functions, sub-products, or sub-locations
    this.showChildren = false; // New property, default is false
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
      child.showChildren = !child.showChildren;
    });
  }
  hasChildren() {
    return Array.isArray(this.children) && this.children.length > 0;
  }
}



export default Aspect;
