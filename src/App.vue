<template>
  <div class="main-container">
 
    <div class="prototype-logo">Architree Prototype </div> 
  
  <Main></Main></div>
</template>

<script>
import Main from '@/Main.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAurora } from '@mdi/js';

export default {
  name: "App",
  components: {
    Main,
    SvgIcon
  },
  data(){
    return {
      path: mdiAurora,
    };
  
  },

};
</script>

