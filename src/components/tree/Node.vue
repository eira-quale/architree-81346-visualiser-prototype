<template>
  <!-- Always display the parent node -->
  <div class="node-container" @click="toggleExpand" :style="{ marginLeft: `${depth * 20}px` }" :class="{ selected: isSelected, 'is-leaf': !hasChildren }">
    <span class="node-text rds">
    <span class="node-name">{{ node.data.name }}</span>
    <span class="node-rds">{{ shortRds }}</span>
  </span>
      <svg-icon
        v-if="hasChildren"
        type="mdi"
        :path="toggleIcon"
        class="toggle-icon"
      />
  </div>

  <!-- Recursively render children if they exist and the node is expanded -->
  <div v-if="isExpanded && node.children && node.children.length" class="node-children">
    <Node
      v-for="(childNode, index) in node.children"
      :key="index"
      :node="childNode"
      :depth="depth + 1"
      :selected-node-id="selectedNodeId"
      @node-click="$emit('node-click', $event)"
    />
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdilChevronRight } from '@mdi/light-js';
import { mdilChevronDown } from '@mdi/light-js';
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
    },

    selectedNodeId: {
      type: String,
      default: null
    },
  },

  components: {
    SvgIcon
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

  computed: {
  isSelected() {
    return this.node.data.id === this.selectedNodeId;
  },

  hasChildren() {
    return this.node.children && this.node.children.length > 0;
  },

  toggleIcon() {
    return this.isExpanded ? mdilChevronDown : mdilChevronRight;
  },

  shortRds() {
  const rds = this.node.data.rds;
  if (!rds) return '';

  // Om ingen punkt finns, returnera hela rds
  if (!rds.includes('.')) return rds;

  // Annars: plocka prefix och sista del
  const prefixMatch = rds.match(/^[^a-zA-Z0-9]+/);
  const prefix = prefixMatch ? prefixMatch[0] : '';

  const parts = rds.split('.');
  const lastPart = parts[parts.length - 1];

  return `${prefix}${lastPart}`;
},


},

};
</script>

<style scoped>
</style>