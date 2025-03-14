<template>
    <aside v-show="visible" class="side-panel">
        <div class="side-panel-title-container">
      <h2>{{ selectedAspect ? selectedAspect.rds : null}}</h2>
      <h1>{{  selectedAspect ? selectedAspect.name : null }}</h1>
      <span> {{  selectedAspect ? selectedAspect.description : null }}</span>
    </div>

    <div class="side-panel-other-denominations">
      <span>Other denominations: </span>
      <div class="side-panel-other-denominations-box">

        <span class="side-panel-other-denominations-box span">###ABC</span>
        
      </div>
    </div>
      
    </aside>
  </template>
  
  <script>
  import Aspect from '../../services/models/aspect';
  export default {
    name: "SidePanel",
    props: {
        selectedAspect: Aspect
    },
    data() {
      return {
        title: "Side Panel",
        visible: false,
      };
    },
    watch: {

        selectedAspect: {
            handler(){
                if(this.selectedAspect == null){
                    this.visible = false;

                } else {
                    this.visible = true;
                }
            }
        }

    },
    methods: {
      handleClick() {
        alert("Side panel toggled!");
      },
    },
  };
  </script>
  
