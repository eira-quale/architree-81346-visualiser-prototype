<template>
  <!-- Always display the parent node -->
  <div class="node-container" @click="toggleExpand" :style="{ marginLeft: `${depth * 20}px` }"
    :class="{ selected: isSelected, 'linked-node': isLinkedNode }">
    <svg-icon v-if="hasChildren" type="mdi" :path="toggleIcon" class="toggle-icon" />
    <span class="node-name">{{ node.data.name }}</span>
    <span class="node-rds">{{ shortRds }}</span>
  </div>

  <!-- Recursively render children if they exist and the node is expanded -->
  <div v-if="isExpanded && node.children && node.children.length" class="node-child">
    <Node
      v-for="(childNode, index) in node.children"
      :key="index"
      :node="childNode"
      :depth="depth + 1"
      :selectedAspect="selectedAspect"
      @handle-node-click="$emit('handle-node-click', $event)" />
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdilChevronRight } from '@mdi/light-js';
import { mdilChevronDown } from '@mdi/light-js';
import { TreeNode } from '../../services/models/treeNode';

export default {
  name: "Node", // Gör att Vue kan lösa rekursiva komponenter
  props: {
    node: {
      type: TreeNode
    },
    depth: {
      type: Number,
      default: 0 // Börjar på depth 0 för rot-noden
    },
    selectedAspect: {
      type: Object,
      default: null
    },
  },
  components: {
    SvgIcon
  },
  data() {
    return {
      isExpanded: false, // Spårar om noden är expanderad
    };
  },
  watch: {
    // När selectedAspect ändras, kolla om denna nod (eller dess barn) ska expanderas
    selectedAspect: {
      handler() {
        this.expandIfNeeded();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    toggleExpand() {
      // Används vid manuellt klick
      this.isExpanded = !this.isExpanded;
      this.$emit('handle-node-click', this.node);
    },
    expandIfNeeded() {
      // Om ett selectedAspect finns och noden eller något barn matchar realObjectId, expandera noden
      if (this.selectedAspect && this.containsLinkedNode(this.node)) {
        this.isExpanded = true;
      }
    },
    containsLinkedNode(node) {
      // Kolla om denna nod matchar selectedAspect:s realObjectId
      if (node.data.realObjectId === this.selectedAspect.data.realObjectId) {
        return true;
      }
      // Om noden har barn, kolla rekursivt
      if (node.children && node.children.length) {
        return node.children.some(child => this.containsLinkedNode(child));
      }
      return false;
    },
  },
  computed: {
    isSelected() {
      return this.node?.id === this.selectedAspect?.id;
    },
    isLinkedNode() {
      return this.node?.data.realObjectId === this.selectedAspect?.data.realObjectId;
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

      // Annars: plocka prefix och sista delen
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
/* Lägg till dina komponent-specifika stilar här */
</style>
