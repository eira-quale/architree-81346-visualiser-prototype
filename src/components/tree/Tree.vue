<template>
  <div class="tree">
        
    </div>
    <div class="tree-container">
      <!-- Scrollable area for nodes -->
      <div class="tree-title-container">
        <h1>{{ tree.name }}</h1>
      <div class="tree-content">
        <Node
        v-for="(node, index) in tree.nodes"
        :key="index"
        :node="node"
        @node-click="forwardNodeClick"
        ></Node>       
      
      </div>
    </div>
  </div>
</template>

<script>
import Node from './Node.vue';
import { mdilBook } from '@mdi/light-js';
import { TreeRoot } from '../../services/models/treeRoot.js';

export default {
  name: "Tree",

  props: {
  

  
    tree: {
      type: TreeRoot
      
      },
    },
  
  data() {
    return {

      icon: mdilBook,
  

    };

  },
  components: {

    Node 

  },
  computed: {
    // Your computed properties
  },
  methods: {
    forwardNodeClick(aspect) {
      this.$emit("handle-node-click", aspect); // Forward event to Main
    },
  },
  watch: {
    // Your watchers
  },
  mounted() {
    // Lifecycle hook - runs when the component is mounted
  },
};
</script>

<style scoped>
/* Your component-specific styles */
</style>