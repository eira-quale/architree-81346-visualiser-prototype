<template>

    <div class="tree">
    <div class="tree-title-container">

      <h1>{{ treeTitle }}</h1>
      <svg-icon class="tree-icon" type="mdi" :path="icon"></svg-icon>

    </div>
    <div class="tree-container">
      <Node v-for="(node, index) in tree" :aspect="node"  @toggle-aspect="forwardNodeClick">
      </Node>
    </div>
  </div>
</template>

<script>
import Node from './Node.vue';
import SvgIcon from '@jamescoyle/vue-icon';

export default {
  name: "Tree",

  props: {
    icon: Object,
    treeTitle: String,
    tree: {
      type: Array,
      required: true,
      validator(value) {
        return value.every(
          (item) => typeof item.id === "number" && typeof item.name === "string"
        );
      },
    },
  },
  data() {
    return {



    };

  },
  components: {

    Node,
    SvgIcon
    
 

  },
  computed: {
    // Your computed properties
  },
  methods: {
    forwardNodeClick(id, aspectType) {
      this.$emit("toggle-aspect", id, aspectType); // Forward event to Main
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