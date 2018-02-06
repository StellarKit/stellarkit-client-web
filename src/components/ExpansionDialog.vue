<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='expansion-contents'>
      <v-expansion-panel class='custom-expansion-panel'>
        <v-expansion-panel-content v-for="(item,i) in items" v-bind:value="i === 0" :key="i">
          <div slot="header" class='expansion-title' v-html='item.title'></div>
          <div class='expansion-message' v-html='item.content'></div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>
  </div>
</v-dialog>
</template>

<script>
import {
  DialogTitleBar
} from 'stellar-js-utils'

export default {
  props: ['ping', 'title'],
  components: {
    'dialog-titlebar': DialogTitleBar
  },
  data() {
    return {
      errorMessage: '',
      visible: false,
      items: []
    }
  },
  watch: {
    ping: function () {
      this.visible = true
    }
  },
  created() {
    this.items = [{
        title: 'How do I create a Token?',
        content: 'Click the Create Token tab and follow the instructions'
      },
      {
        title: 'How do I distribute a time locked token?',
        content: 'Click the Locked Token tab and follow the instructions'
      }
    ]
  },
  methods: {
    // sdf
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/styles.scss';
.main-container {
    @include standard-dialog-contents();

    .expansion-contents {
        padding: 10px 20px;
        text-align: left;

        flex: 1 1 auto;
        overflow-y: auto;
        font-size: 1.3em;

        .custom-expansion-panel {
            box-shadow: none;

            .expansion-title {
                text-align: left;
                font-weight: $bold;
                width: 100%;
            }
            .expansion-message {
                font-size: 0.9em;
                padding: 0 26px 10px;
            }
        }
    }
}
</style>
