<template>
    <div class="node_container">
       
      
    </div>
  </template>
  
  <script>
  export default {
    name: "Node",
    props: {
        nodeData: {
            rds: "",
            
        }

    },
    data() {
      return {
      

        
      };
      
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
 .node_container {
    width: 100px;
    height: 20px;
    border-radius: 5px;
    background-color: red;
 }
  </style>
  