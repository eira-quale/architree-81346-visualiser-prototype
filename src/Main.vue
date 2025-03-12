<template>

<div class="main-trees-container">

<Tree ref="tree-functional" treeTitle="Function" :tree="this.functionalAspects"></Tree>


<Tree ref="tree-products" treeTitle="Product" :tree="this.productAspects"></Tree>

<Tree ref="tree-locations" treeTitle="Location" :tree="this.locationAspects"></Tree>

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

    Tree
    
    
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
    }
  }
 
 

};
</script>


<style scoped>


</style>
