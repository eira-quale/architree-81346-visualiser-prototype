export class Aspect {
    constructor({ id, rds, name, previousName, aspectType, realObjectId }) {
        this.id = id;
        this.rds = rds;
        this.name = name;
        this.previousName = previousName || "";
        this.aspectType = aspectType;
        this.realObjectId = realObjectId;
        this.otherDenominations = [];
    }

   
}


export default Aspect;