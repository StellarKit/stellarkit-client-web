<template>
<div class='app-console'>
  <div class='console-bar'>
    <v-btn icon dark @click.stop='fullscreenConsole()'>
      <v-tooltip open-delay='800' bottom>
        <v-icon v-if='fullscreenMode' slot='activator'>&#xE5D1;</v-icon>
        <v-icon v-else slot='activator'>&#xE5D0;</v-icon>
        <span>Full Screen</span>
      </v-tooltip>
    </v-btn>
    <v-btn icon dark @click.stop='clearLog()'>
      <v-tooltip open-delay='800' bottom>
        <v-icon slot='activator'>&#xE15C;</v-icon>
        <span>Clear console</span>
      </v-tooltip>
    </v-btn>
    <div>
      <v-menu offset-x :close-on-content-click="false" :nudge-width="200" v-model="menu">
        <v-btn slot='activator' icon dark>
          <v-tooltip open-delay='800' bottom>
            <v-icon slot='activator'>&#xE8B8;</v-icon>
            <span>Console settings</span>
          </v-tooltip>
        </v-btn>

        <v-card>
          <v-list dense>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Console Settings</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-action>
                <v-switch v-model="condensedOutput" color="primary"></v-switch>
              </v-list-tile-action>
              <v-list-tile-title>Condensed output</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-switch v-model="expandXDR" color="primary"></v-switch>
              </v-list-tile-action>
              <v-list-tile-title>Expand XDR</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </div>

  <textarea readonly="readonly" wrap="off" class='output-container' v-model='consoleOutput'></textarea>
</div>
</template>

<script>
import Helper from '../js/helper.js'
import $ from 'jquery'

export default {
  props: ['publicKey'],
  watch: {
    condensedOutput: function () {
      Helper.set('condensedOutput', this.condensedOutput)
    },
    expandXDR: function () {
      Helper.set('expandXDR', this.expandXDR)
    }
  },
  data() {
    return {
      consoleOutput: '',
      menu: false,
      condensedOutput: Helper.get('condensedOutput'),
      expandXDR: Helper.get('expandXDR'),
      fullscreenMode: false
    }
  },
  mounted() {
    Helper.vue().$on('console', this.log)
    Helper.vue().$on('clear-console', this.clearLog)
  },
  methods: {
    log(output) {
      this.consoleOutput += output + '\n\n'

      this.scrollToEnd()
    },
    scrollToEnd(delay = 250) {
      this.$nextTick(() => {
        $('.output-container').animate({
          scrollTop: $('.output-container')[0].scrollHeight,
          scrollLeft: 0
        }, delay)
      })
    },
    clearLog() {
      this.consoleOutput = ''
    }
  }
}
</script>

<style lang='scss' scoped>
.app-console {
    position: relative;
    display: flex;
    flex: 1 1 80px;
    background: rgb(0,20,0);

    .console-bar {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;

        button {
            margin: 0;
            color: rgba(255,255,255,.4);
            &:hover {
                color: rgba(255,255,255,1);
            }
        }
    }

    .output-container {
        width: 100%;
        resize: none;
        outline: none;
        font-size: 0.8em;
        font-family: monospace;
        overflow: auto;
        color: rgb(0,256,150);
        margin-left: 30px;
    }
}
</style>
