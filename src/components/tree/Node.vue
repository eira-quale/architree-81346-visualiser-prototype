<template>
  
    <div @click="handleNodeClick" class="node-container">
      <svg-icon type="mdi" :path="getChevron()"></svg-icon>
      
        <span class="node-text rds">{{ aspect.rds }}</span>
        <span class="node-text name"> {{ aspect.name }}</span>
      
    </div>
    
    <div :class="node-container" v-for="(subnode, index) in aspect.children"  >
      <div v-show="subnode.isVisible">
        <div class="node-container subnode" @click="handleSubNodeClick(subnode)">
     <span>{{ subnode.rds }} </span> 
     <span>{{ subnode.name }} </span> 
    </div>
    </div>
  </div>
  </template>
  
  <script>
import Aspect from '../../services/models/aspect';

import SvgIcon from '@jamescoyle/vue-icon';
import { mdilChevronDown, mdilChevronRight } from '@mdi/light-js';
  export default {
    name: "Node",
    props: {
        aspect: Aspect,
      

    },
    data() {
      return {

        chevronRight: mdilChevronRight,
        chevronDown: mdilChevronDown

      };
     
      
    },
    components: {
        SvgIcon
      },
  
    
    methods: {
      handleNodeClick() {
      this.$emit("handle-node-click", this.aspect);
    
        
      },
      
      handleSubNodeClick(subnode){

        this.$emit("handle-node-click", subnode)

      },
      getChevron(){
        if(!this.aspect.hasChildren()){
          return null;
        } else {
          if(this.aspect.showChildren){
            return mdilChevronDown;
          } else {
            return mdilChevronRight;
          }
        }
        

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

  </style>
  