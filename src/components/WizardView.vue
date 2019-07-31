<template>
<div class='wizard-main'>
  <div class='wizard-title-box'>
    <div class='wizard-steps-menu'>
      <v-menu offset-y>
        <v-btn
          icon
          dark
          small
          v-on="on"
        >
          <v-icon>&#xE5C5;</v-icon>
        </v-btn>
        <v-list>
          <v-list-item
            v-for="(item, index) in pageTitles"
            :key="item"
            @click="menuSelected(index)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class='wizard-title'>
      {{title}}
    </div>
  </div>

  <div class='wizard-content-box'>
    <slot name="content"></slot>
  </div>

  <div class='wizard-bottom-box'>
    <v-btn
      rounded
      small
      color='secondary'
      @click='buttonClick("previous")'
      :disabled='disablePreviousButton()'
    >
      Previous
    </v-btn>
    <v-btn
      rounded
      small
      color='primary'
      @click='buttonClick("next")'
      :disabled='disableNextButton()'
    >
      Next
    </v-btn>
  </div>
</div>
</template>

<script>
export default {
  props: ['title', 'numPages', 'currentPage', 'pageTitles'],
  data() {
    return {
      sss: 'none'
    }
  },
  methods: {
    disableNextButton() {
      return this.currentPage >= (this.numPages - 1)
    },
    disablePreviousButton() {
      return this.currentPage === 0
    },
    menuSelected(index) {
      this.$emit('menu-nav', index)
    },
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
    margin: 10px;
    overflow: hidden;
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
        flex-basis: 400px;

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
        position: relative;

        .wizard-steps-menu {
            position: absolute;
            top: 0;
            left: 0;
            button {
                margin: 3px 4px;
                padding: 0;
            }
        }

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
</style>
