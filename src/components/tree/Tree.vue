<template>


  <div class="tree">
    <div class="tree-title">{{ tree.name }}</div>
   
    
        <Node
       
        v-for="(node, index) in tree.nodes"
        :key="index"
        :node="node"
        @handle-node-click="forwardNodeClick" 
        :selectedAspect="selectedAspect">
       

        </Node>
       
      
     
  </div>
</template>

<script>
import Node from './Node.vue';
import { TreeRoot } from '../../services/models/treeRoot.js';

export default {
  name: "Tree",

  props: {
  
    selectedAspect: {
      type: Object,
      default: null,
    },

  
    tree: {
      type: TreeRoot
      
      },
    },
  
  data() {
    return {

   
  

    };

  },
  components: {

    Node



    
 

  },
  computed: {
    // Your computed properties
  },
  methods: {
    forwardNodeClick(node) {
      this.$emit("handle-node-click", node); // Forward event to Main
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