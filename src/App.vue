<template>
  
 
  
  <Main></Main>
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

