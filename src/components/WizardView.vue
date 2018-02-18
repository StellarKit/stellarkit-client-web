<template>
<div class='wizard-main'>
  <div class='wizard-title-box'>
    <div class='wizard-title'>
      {{title}}
    </div>
  </div>

  <div class='wizard-content-box'>
    <slot name="content"></slot>
  </div>

  <div class='wizard-bottom-box'>
    <v-btn round color='secondary' @click='buttonClick("previous")'>
      Back
    </v-btn>
    <v-btn round color='primary' @click='buttonClick("next")'>
      Continue
    </v-btn>
  </div>
</div>
</template>

<script>
export default {
  props: ['steps'],
  data() {
    return {
      title: 'none'
    }
  },
  methods: {
    buttonClick(id) {
      switch (id) {
        case 'previous':
        case 'next':
          this.$emit('click-nav', id)
          break
        default:
          break
      }
    }
  }
}
</script>

<style scoped lang='scss'>

 .wizard-main {
     background: rgba(0,0,30,.025);
     margin: 10px;
     box-shadow: 0 6px 13px rgba(0,0,0,.2);

     .wizard-content-box {
         margin: 20px;
         padding: 20px;

         background: rgba(255,255,255,.3);
      }

     .wizard-title-box {
         display: flex;
         align-items: center;
         justify-content: center;
         font-size: 1.4em;

         .wizard-title {
             font-weight: bold;
             text-align: center;
         }
     }

     .wizard-bottom-box {
       padding: 8px;
       display: flex;
       justify-content: flex-end;
     }
 }

 </style>
