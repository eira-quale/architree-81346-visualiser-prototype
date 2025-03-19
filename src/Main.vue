<template>

<div class="main-container">

<div class="main-trees-container">

<Tree ref="tree-functional" treeTitle="Function" :tree="this.functionalAspects"
@handle-node-click="onNodeClick" :icon="this.functionalPath" :selectedAspect="selectedAspect" :selectedNode="selectedNode"
@update-selected-node="setSelectedNode"></Tree>

<Tree ref="tree-products" treeTitle="Product" :tree="this.productAspects" @handle-node-click="onNodeClick" :icon="this.productPath" :selectedAspect="selectedAspect" :selectedNode="selectedNode" 
@update-selected-node="setSelectedNode"></Tree>

<Tree ref="tree-locations" treeTitle="Location" :tree="this.locationAspects" @handle-node-click="onNodeClick" :icon="this.locationPath" :selectedAspect="selectedAspect" :selectedNode="selectedNode" 
@update-selected-node="setSelectedNode" ></Tree>


</div>
<SidePanel :selectedAspect="this.selectedAspect"></SidePanel>
</div>

</template>

<script>

import Tree from '@/components/tree/Tree.vue'
import Aspect from '@/services/models/aspect.js'
import {fetchMockData} from '@/services/treeService.js'
import SidePanel from './components/side-panel/SidePanel.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMapMarkerPath } from '@mdi/js';
import { mdiCube } from '@mdi/js';
import { mdiHammerWrench } from '@mdi/js';


export default {
  
  props: {
   
  },
  data(){
    return {


    mockData: null,
    functionalAspects: null,
    productAspects: null,
    locationAspects: null,
    selectedAspect: null,
    selectedNode: null,
    functionalPath: mdiHammerWrench,
    locationPath: mdiMapMarkerPath,
    productPath: mdiCube


  }
},
  components:
  {

    Tree,
    SidePanel,
    SvgIcon,
   
    
    
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
  createAspect(data, aspectType, parentId = null) {
    return new Aspect(
      data.id,
      data.rds,
      data.name,
      data.description,
      aspectType,
      data.children ? data.children.map(child => this.createAspect(child, aspectType, data.id)) : [],
      parentId,
      false
    );
  },


    onNodeClick(aspect) {

      this.selectedAspect = aspect;
      
      

        aspect.toggleShowChildren();
     
    
      
    },

    setSelectedNode(aspect) {
      this.selectedNode = aspect;
      this.selectedAspect = aspect;
    
    }

  }
 
 

};
</script>


<style scoped>


</style>
