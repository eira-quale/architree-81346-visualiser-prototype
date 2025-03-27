<template>

<FilterDropdown></FilterDropdown>

  <div class="main-container">

  
    <div class="main-trees-container">



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
    



  },
  methods: {




  }



};
</script>


<style scoped></style>
