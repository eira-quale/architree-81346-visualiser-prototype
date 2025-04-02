<template>
    <div v-show="true" class="side-panel">
        <div class="side-panel-title-container">
      <h2 class="side-panel-rds">{{ selectedAspect ? selectedAspect.data.rds : null}}</h2>
      <h1>{{  selectedAspect ? selectedAspect.data.name : null }}</h1>
      <span> {{  selectedAspect ? selectedAspect.data.description : null }}</span>   
    </div>

    <div class="side-panel-other-denominations">
      <span>Other denominations: </span>
      <div class="side-panel-other-denominations-box">

        <span class="side-panel-other-denominations-box span">{{ selectedAspect && selectedAspect.previousName ? selectedAspect.previousName : 'N/A' }}</span>

        
        <img class="img-map" src='../../assets/map.png'/>       
        
      </div>
    </div>
      
  </div>
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
  
