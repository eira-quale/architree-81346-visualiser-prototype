<template>
  <!-- Print parent node -->
  <div class="node-container">
    <span class="node-text rds">{{ node.data.name }}</span>
  </div>

  <div v-for="(childNode, index) in node.children" :key="index" class="node-children">
    <span class="node-text">{{ childNode.data.name }}</span>
    <!-- Check if the child node has children and recursively render them -->
    <Node v-if="childNode.children && childNode.children.length" :node="childNode" />
  </div>
</template>

<script>
import { TreeNode } from '../../services/models/treeNode';

export default {
  name: "Node", // The name property allows Vue to resolve recursive components
  props: {
    node: {
      type: TreeNode
    },
  },
  data() {
    return {};
  },
  // Removed explicit import and registration of Node
  methods: {},
  watch: {
    // Your watchers
  },
  mounted() {
    // Lifecycle hook - runs when the component is mounted
  },
};
</script>

<style scoped></style>