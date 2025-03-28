<template>

<FilterDropdown></FilterDropdown>

  <div class="main-container">

  
    <div class="main-trees-container">
      
      <Tree v-for="(tree, index) in trees" 
        :key="index"
        :tree="tree"
        ></Tree>


    </div>
    <SidePanel :selectedAspect="this.selectedAspect"></SidePanel>
  </div>

</template>

<script>

import FilterDropdown from './components/FilterDropdown.vue';

import Aspect from '@/services/models/aspect.js'
import { fetchMockData } from '@/services/treeService.js'
import SidePanel from './components/side-panel/SidePanel.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMapMarkerPath } from '@mdi/js';
import { mdiCube } from '@mdi/js';
import { mdiHammerWrench } from '@mdi/js';
import { TreeRoot } from '@/services/models/treeRoot.js'; // Updated import
import { TreeNode } from '@/services/models/treeNode.js'; // Updated import
import Tree from './components/tree/Tree.vue';

export default {

  props: {

  },
  data() {
    return {

     
      mockData: null,
      selectedAspect: null,
      trees: [],
      
      
      // Icons
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
    this.initializeTrees();
    



  },
  methods: {

    initializeTrees() {
      const randomId = Math.random().toString(36).substr(2, 9);
      const newTree = new TreeRoot(randomId, "Lokalisering", true); // Updated reference

      const createNodeFromData = (data) => {
        const aspect = new Aspect(data.id, data.rds, data.name, data.previousName);
        const nodeId = Math.random().toString(36).substr(2, 9);
        const node = new TreeNode(aspect, nodeId); // Updated reference

        if (data.children && data.children.length > 0) {
          data.children.forEach((child) => {
            const childNode = createNodeFromData(child);
            node.children.push(childNode);
          });
        }

        return node;
      };

      this.mockData.forEach((mockItem) => {
        const node = createNodeFromData(mockItem);
        newTree.addNode(node);
      });

      this.trees.push(newTree);
    }



  }



};
</script>


<style scoped></style>
