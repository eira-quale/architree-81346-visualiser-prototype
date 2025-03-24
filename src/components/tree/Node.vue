<template>

  <div @click="handleNodeClick" class="node-container" :class="getClass(aspect)">
    <svg-icon type="mdi" :path="getChevron()"></svg-icon>

    <span class="node-text rds">{{ aspect.rds }}</span>
    <span class="node-text name"> {{ aspect.name }}</span>

  </div>

  <div v-for="(subnode, index) in aspect.children">
    <div v-show="subnode.isVisible">
      <div class="node-container subnode" :class="  getClass(subnode) "
        @click="handleSubNodeClick(subnode)">
        <span class="node-text rds">{{ subnode.rds }} </span>
        <span class="node-text name">{{ subnode.name }} </span>
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
    selectedAspect: Aspect,


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

    getClass(aspect) {



      if (this.isSelectedAspect(aspect)) {
        return 'selectedAspect'
      } 
      
      if (this.isLinkedAspect(aspect)) {

        return 'linkedAspect'
      } 

      return 'node-container';

    },


    isSelectedAspect(aspect) {
      return this.selectedAspect?.id === aspect.id;


    },

    isLinkedAspect(aspect) {
      return this.selectedAspect?.linkedAspects?.includes(aspect.id) || false;
    },
    handleSubNodeClick(subnode) {

      this.$emit("handle-node-click", subnode)

    },
    getChevron() {
      if (!this.aspect.hasChildren()) {
        return null;
      } else {
        if (this.aspect.showChildren) {
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

<style scoped></style>