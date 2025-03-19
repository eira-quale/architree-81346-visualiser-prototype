<template>
  <div 
      @click="handleNodeClick"
      class="node-container"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
      :class="{ 'hovered': isHovered, 'selected': selectedNode?.id === aspect.id }"
  >
      <svg-icon type="mdi" :path="getChevron()" @click.stop="toggleChildren"></svg-icon>
      <span class="node-text rds">{{ aspect.rds }}</span>
      <span class="node-text name">{{ aspect.name }}</span>
  </div>
  
  <div v-show="aspect.showChildren" class="subnodes-container">
      <Node 
          v-for="subnode in aspect.children"
          :key="subnode.id"
          :aspect="subnode"
          :selectedNode="selectedNode"
          @handle-node-click="$emit('handle-node-click', subnode)"
          :isSubnode="true"
      />
  </div>
</template>

  
  <script>
import Aspect from '../../services/models/aspect';

import SvgIcon from '@jamescoyle/vue-icon';
import { mdilChevronDown, mdilChevronRight } from '@mdi/light-js';
  export default {
    name: "Node",
    props: {
        aspect: Object,
        selectedNode: Object,
        
        isSubNode: {
            type: Boolean,
            default: false
        }
      

    },
    data() {
      return {

        isHovered: false,
        hoverStates: {},
      
        chevronRight: mdilChevronRight,
        chevronDown: mdilChevronDown

      };
     
      
    },
    components: {
        SvgIcon
      },
  
    
    methods: {
      handleNodeClick() {

      //this.selectedNode = this.aspect;
      this.$emit("handle-node-click", this.aspect);
      this.toggleChildren();
    
        
      },
      
      handleSubNodeClick(subnode){

        //this.selectedNode = subnode;
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

      toggleChildren(){
        this.aspect.showChildren = !this.aspect.showChildren;
      }
      
    },
    watch: {
      // Your watchers
    },
    mounted() {
      if (this.aspect.showChildren === undefined) {
        this.$set(this.aspect, 'showChildren', false);
        // Lifecycle hook - runs when the component is mounted
    }},
  };
  </script>
  
  <style scoped>

  </style>
  