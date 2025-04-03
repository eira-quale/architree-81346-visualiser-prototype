<template>




  <div class="main-container">
    <div class="main-content">

      <div class="top-panel">
      <FilterDropdown :dynamicOptions="dynamicOptions" @filter-changed="onFilterChanged" />
    </div>

      <div class="main-tree-container">
        <Tree v-for="(tree, index) in filteredTrees" :selectedAspect="this.selectedAspect" :key="index" :tree="tree" @handle-node-click="handleNodeClick" />
      </div>
      </div>
      <div class="side-panel-container">
        <SidePanel :selectedAspect="this.selectedAspect" />
      </div>
    </div>
</template>

<script>

import { getParsedTreesFromBuffer } from '@/services/excel-parser/parser';


import FilterDropdown from './components/FilterDropdown.vue';

import SidePanel from './components/side-panel/SidePanel.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMapMarkerPath } from '@mdi/js';
import { mdiCube } from '@mdi/js';
import { mdiHammerWrench } from '@mdi/js';
import { TreeRoot } from '@/services/models/treeRoot.js';
import { TreeNode } from '@/services/models/treeNode.js';
import Tree from './components/tree/Tree.vue';

export default {
  data() {
    return {
      mockData: null,
      selectedAspect: null,
      trees: [],
      selectedFilters: [],
      functionalPath: mdiHammerWrench,
      locationPath: mdiMapMarkerPath,
      productPath: mdiCube
    };
  },
  components: {
    Tree,
    SidePanel,
    SvgIcon,
    FilterDropdown
  },
  async mounted() {
    const response = await fetch('/raw-data-with-location.xlsx');
    const buffer = await response.arrayBuffer();

    this.trees = getParsedTreesFromBuffer(buffer);

    this.$nextTick(() => {
      this.selectedFilters = this.trees.map(tree => tree.name.toLowerCase());
    });
  },
  computed: {
    dynamicOptions() {
      if (!this.trees.length) return [];
      const uniqueNames = [...new Set(this.trees.map(tree => tree.name))];
      return uniqueNames.map(name => ({
        label: name,
        value: name.toLowerCase()
      }));
    },
    filteredTrees() {
      if (!this.selectedFilters.length) return [];
      return this.trees.filter(tree =>
        this.selectedFilters.includes(tree.name.toLowerCase())
      );
    }
  },
  methods: {




    handleNodeClick(node) {
      console.log(node.data.name)
      this.selectedAspect = node;
    },
    onFilterChanged(newFilters) {
      this.selectedFilters = newFilters;
    }
  }
};
</script>

<style scoped></style>
