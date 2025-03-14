<template>

<div class="main-trees-container">

<Tree ref="tree-functional" treeTitle="Function" :tree="this.functionalAspects"
@toggle-aspect="onToggleShowChildren"></Tree>

<Tree ref="tree-products" treeTitle="Product" :tree="this.productAspects" @toggle-aspect="onToggleShowChildren"></Tree>

<Tree ref="tree-locations" treeTitle="Location" :tree="this.locationAspects" @toggle-aspect="onToggleShowChildren"></Tree>

</div>

</template>

<script>

import Tree from '@/components/tree/Tree.vue'
import Aspect from '@/services/models/aspect.js'
import {fetchMockData} from '@/services/treeService.js'


export default {
  
  props: {
   
  },
  data(){
    return {


    mockData: null,
    functionalAspects: null,
    productAspects: null,
    locationAspects: null


  }
},
  components:
  {

    Tree,
    
    
    
  },
  async mounted(){
  
  
      this.mockData = await fetchMockData();

      if (this.mockData != null) {
      this.functionalAspects = this.mockData.functional_aspects.map(aspect => this.createAspect(aspect, "Functional"));
      this.productAspects = this.mockData.product_aspects.map(aspect => this.createAspect(aspect, "Product"));
      this.locationAspects = this.mockData.location_aspects.map(aspect => this.createAspect(aspect, "Location"));
    }
    

  },
  methods: {
    createAspect(data, aspectType) {
      return new Aspect(
        data.id,
        data.rds,
        data.name,
        data.description,
        aspectType,
        data.children ? data.children.map(child => this.createAspect(child, aspectType)) : []
      );
    },
    onToggleShowChildren(id, aspectType) {
      let aspect;
      switch (aspectType) {
        case "Functional":
          aspect = this.functionalAspects.find(aspect => aspect.id === id);
          break;
        case "Product":
          aspect = this.productAspects.find(aspect => aspect.id === id);
          break;
        case "Location":
          aspect = this.locationAspects.find(aspect => aspect.id === id);
          break;
        default:
          console.warn(`Unknown aspect type: ${aspectType}`);
          return;
      }

      if (aspect) {
        aspect.toggleShowChildren();
      } else {
        console.warn(`Aspect with ID ${id} not found in ${aspectType} aspects`);
      }
    },

  }
 
 

};
</script>


<style scoped>


</style>
