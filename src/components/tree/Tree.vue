<template>
    
  </template>
  
  <script>
  import Node from './Node.vue';
  export default {
    name: "Tree",
 
    props: {
      treeData

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
      // Your methods
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
  