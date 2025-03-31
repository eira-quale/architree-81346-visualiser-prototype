<template>
  <!-- Always display the parent node -->
  <div class="node-container" @click="toggleExpand" :style="{ marginLeft: `${depth * 20}px` }">
    <span class="node-text rds">
      {{ node.data.name }}
      <span v-if="node.children && node.children.length" class="toggle-icon">
        {{ isExpanded ? '▼' : '▶' }}
      </span>
    </span>
  </div>

  <!-- Recursively render children if they exist and the node is expanded -->
  <div v-if="isExpanded && node.children && node.children.length" class="node-children">
    <Node
      v-for="(childNode, index) in node.children"
      :key="index"
      :node="childNode"
      :depth="depth + 1"
      @node-click="$emit('node-click', $event)"
    />
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
    depth: {
      type: Number,
      default: 0 // Start at depth 0 for the root node
    }
  },
  data() {
    return {
      isExpanded: false, // Track whether the node is expanded
    };
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded; // Toggle the expanded state
      this.$emit('node-click', this.node.data);
    },
  },
};
</script>

<style scoped>
.node-container {
  cursor: pointer; /* Indicate interactivity */
}

.toggle-icon {
  margin-left: 5px; /* Add spacing between the name and the toggle icon */
}
</style>