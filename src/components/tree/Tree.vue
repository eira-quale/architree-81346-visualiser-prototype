<template>

    <div class="tree">
    <div class="tree-title-container">
      <h1>{{ treeTitle }}</h1>
    </div>
    <div class="tree-container">
      <Node v-for="(node, index) in tree" :aspect="node"       @toggle-aspect="forwardToggleAspect">
      </Node>
    </div>
  </div>
</template>

<script>
import Node from './Node.vue';
export default {
  name: "Tree",

  props: {
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
      aspect: "Functional",


    };

  },
  components: {

    Node

  },
  computed: {
    // Your computed properties
  },
  methods: {
    forwardToggleAspect(id, aspectType) {
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