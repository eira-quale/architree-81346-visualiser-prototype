<template>
  <div class="filter-banner">
      <FilterDropdown
        :dynamicOptions="dynamicOptions"
        @filter-changed="onFilterChanged"
      />
  </div>

  <div class="main-container">
    <div class="main-trees-container">
      <Tree
        v-for="(tree, index) in filteredTrees"
        :key="index"
        :tree="tree"
        :selected-node-id="selectedNodeId"
        @handle-node-click="handleNodeClick"
      />
    </div>
    <SidePanel :selectedAspect="this.selectedAspect" />
  </div>
</template>

<script>
import FilterDropdown from './components/FilterDropdown.vue';
import Aspect from '@/services/models/aspect.js';
import { fetchMockData } from '@/services/treeService.js';
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
      productPath: mdiCube,
      selectedNodeId: null,

    };
  },
  components: {
    Tree,
    SidePanel,
    SvgIcon,
    FilterDropdown
  },
  async mounted() {
    this.mockData = await fetchMockData();
    this.initializeTrees();
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
    initializeTrees() {
      this.mockData.forEach((mockItem) => {
        const randomId = Math.random().toString(36).substr(2, 9);
        const newTree = new TreeRoot(randomId, mockItem.name, true); // Create TreeRoot

        const createNodeFromData = (data) => {
          const aspect = new Aspect(data.id, data.rds, data.name, data.previousName); // Create Aspect
          const nodeId = Math.random().toString(36).substr(2, 9);
          const node = new TreeNode(aspect, nodeId); // Create TreeNode

          if (data.children && data.children.length > 0) {
            data.children.forEach((child) => {
              const childNode = createNodeFromData(child); // Recursively process children
              node.children.push(childNode);
            });
          }

          return node;
        };

        if (mockItem.nodes && mockItem.nodes.length > 0) {
          mockItem.nodes.forEach((nodeData) => {
            const node = createNodeFromData(nodeData); // Process top-level nodes
            newTree.addNode(node);
          });
        }

        this.trees.push(newTree); // Add completed TreeRoot to trees
      });
    },
    handleNodeClick(aspect) {
      this.selectedAspect = aspect;
      this.selectedNodeId = aspect.id;
    },
    onFilterChanged(newFilters) {
      this.selectedFilters = newFilters;
    }
  }
};
</script>

<style scoped>
</style>
