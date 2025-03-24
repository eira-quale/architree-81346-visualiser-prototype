<template>

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
      // Check if functional aspects contain the aspect with matching ID
      let foundAspect = this.functionalAspects.find(item => item.id === aspectId);

      // If not found in functional aspects, check in product aspects
      if (!foundAspect) {
        foundAspect = this.productAspects.find(item => item.id === aspectId);
      }

      // If still not found, check in location aspects
      if (!foundAspect) {
        foundAspect = this.locationAspects.find(item => item.id === aspectId);
      }

      // Return the found aspect (or undefined if not found)
      return foundAspect;
    },



    onNodeClick(aspect) {

      this.selectedAspect = aspect;

      aspect.toggleShowChildren();

      this.selectedAspect.linkedAspects.forEach((id) => {
        
        console.log(this.getAspectById(id))
      });


    },



  }



};
</script>


<style scoped></style>
