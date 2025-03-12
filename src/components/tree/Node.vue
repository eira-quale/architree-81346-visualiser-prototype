<template>
    <div class="node_container">

      
        <span >{{ aspect.rds }}</span>
        <span> {{ aspect.name }}</span>
      
    </div>
    
    <div class="node-container sub-node-container" v-for="(subnode, index) in aspect.children">
     <span>{{ subnode.rds }} </span> 
     <span>{{ subnode.name }} </span> 
    </div>
  </template>
  
  <script>
import Aspect from '../../services/models/aspect';

  export default {
    name: "Node",
    props: {
        aspect: Aspect

    },
    data() {
      return {

        expanded: false
      

        
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

  </style>
  