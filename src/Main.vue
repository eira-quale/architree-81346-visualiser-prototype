<template>

<FilterDropdown></FilterDropdown>
  <div class="main-container">

  
    <div class="main-trees-container">

      <Tree ref="tree-functional" treeTitle="Function" :tree="this.functionalAspects" @handle-node-click="onNodeClick"
        :icon="this.functionalPath" :selectedAspect="selectedAspect"></Tree>

      <Tree ref="tree-products" treeTitle="Product" :tree="this.productAspects" @handle-node-click="onNodeClick"
        :icon="this.productPath" :selectedAspect="selectedAspect"></Tree>

      <Tree ref="tree-locations" treeTitle="Location" :tree="this.locationAspects" @handle-node-click="onNodeClick"
        :icon="this.locationPath" :selectedAspect="selectedAspect"></Tree>


    </div>
    <SidePanel :selectedAspect="this.selectedAspect"></SidePanel>
  </div>

</template>

<script>

import FilterDropdown from './components/FilterDropdown.vue';
import Tree from '@/components/tree/Tree.vue'
import Aspect from '@/services/models/aspect.js'
import { fetchMockData } from '@/services/treeService.js'
import SidePanel from './components/side-panel/SidePanel.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMapMarkerPath } from '@mdi/js';
import { mdiCube } from '@mdi/js';
import { mdiHammerWrench } from '@mdi/js';



export default {

  props: {

  },
  data() {
    return {

     
      mockData: null,
      functionalAspects: null,
      productAspects: null,
      locationAspects: null,
      selectedAspect: null,
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
    FilterDropdown


  },
  async mounted() {


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
        data.linkedAspects
      );
    },
    getAspectById(aspectId) {
  // Helper function to check if an aspect or its children contains the given aspectId
  const searchInChildren = (aspectList) => {
    for (let aspect of aspectList) {
      // First check if the aspect itself matches
      if (aspect.id === aspectId) {
        return aspect;
      }

      // Then check if any of the children have the matching ID
      if (aspect.children && aspect.children.length > 0) {
        const childFound = aspect.children.find(child => child.id === aspectId);
        if (childFound) {
          return childFound;
        }
      }
    }
    return null; // Return null if no match found
  };

  // Search in functional aspects
  let foundAspect = searchInChildren(this.functionalAspects);

  // If not found in functional aspects, check in product aspects
  if (!foundAspect) {
    foundAspect = searchInChildren(this.productAspects);
  }

  // If still not found, check in location aspects
  if (!foundAspect) {
    foundAspect = searchInChildren(this.locationAspects);
  }

  return foundAspect; // Return the found aspect or null if not found
},


    onNodeClick(aspect) {

      this.selectedAspect = aspect;

      aspect.toggleShowChildren();

      this.selectedAspect.linkedAspects.forEach((id) => {
        
        const linkedAspect = this.getAspectById(id);

       if(!linkedAspect?.isVisible){
        if(linkedAspect.parentId != null){
          const parentId = this.getAspectById(linkedAspect.parentId);

          parentId.toggleShowChildren();

        }
       }

   
      })





    }
  



  }



};
</script>


<style scoped></style>
