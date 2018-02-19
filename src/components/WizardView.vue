<template>
<div class='wizard-centered'>
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
</div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      sss: 'none'
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
.wizard-centered {
    display: flex;
    justify-content: center;

    .wizard-main {
        background: rgba(0,0,30,.05);
        box-shadow: 0 6px 13px -4px rgba(0,0,0,.3);
        border: solid 1px rgba(0,0,0,.02);
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 10px;
        flex: 0 1 400px;

        .wizard-content-box {
            padding: 20px;
            flex-basis: 500px;

            .step-content {
                color: black;
            }
        }

        .wizard-title-box {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1em;
            background: rgba(90,120,200,.8);

            .wizard-title {
                text-align: center;
                font-weight: bold;
                color: white;
                padding: 6px 24px;
            }
        }

        .wizard-bottom-box {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>
