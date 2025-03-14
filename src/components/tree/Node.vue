<template>
    <div @click="toggleShowChildren" class="node_container">

      
        <span >{{ aspect.rds }}</span>
        <span> {{ aspect.name }}</span>
      
    </div>
    
    <div class="node-container sub-node-container" v-for="(subnode, index) in aspect.children">
      <div v-show="aspect.showChildren">
     <span>{{ subnode.rds }} </span> 
     <span>{{ subnode.name }} </span> 
    </div>
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

  

        
      };
      
    },
    computed: {
      visibleNodes() {
        return this.aspect.showChildren ? [...this.aspect.children] : [];
  }
    },
    methods: {
      toggleShowChildren() {
      this.$emit("toggle-aspect", this.aspect.id, this.aspect.aspectType);
    
        
      },
      hasChildren(){
        if(this.aspect.children.length > 0){
          return true;
        } else {
          return false;
        }
      }
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
  