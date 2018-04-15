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
    <v-btn icon dark @click.stop='saveConsoleToFile()'>
      <v-tooltip open-delay='800' bottom>
        <v-icon slot='activator'>&#xE161;</v-icon>
        <span>Save console output to file</span>
      </v-tooltip>
    </v-btn>
  </div>

  <textarea readonly="readonly" wrap="off" class='output-container' v-model='consoleOutput'></textarea>
</div>
</template>

<script>
import Helper from '../js/helper.js'
import $ from 'jquery'
const SaveFile = require('save-file')

export default {
  props: ['publicKey'],
  watch: {
    condensedOutput: function() {
      Helper.set('condensedOutput', this.condensedOutput)
    },
    expandXDR: function() {
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
    fullscreenConsole() {
      const appconsole = $(this.$el).closest('.app-console')

      appconsole.toggleClass('fullscreen-console')

      this.fullscreenMode = appconsole.hasClass('fullscreen-console')
    },
    saveConsoleToFile() {
      SaveFile(this.consoleOutput, 'console-output.txt', (err, data) => {
        if (err) {
          Helper.debugLog('save failed')
        }

        Helper.debugLog('file saved')
      })
    },
    log(output) {
      this.consoleOutput += output + '\n\n'

      this.scrollToEnd()
    },
    scrollToEnd(delay = 250) {
      this.$nextTick(() => {
        // make sure view hasn't disappeared
        if ($('.output-container')[0]) {
          $('.output-container').animate({
            scrollTop: $('.output-container')[0].scrollHeight,
            scrollLeft: 0
          }, delay)
        }
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
        margin: 4px 0 0 30px;

        &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        &::-webkit-scrollbar-track {
            background: black;
        }

        &::-webkit-scrollbar-thumb {
            background-color: darkgreen;
        }
        &::-webkit-scrollbar-corner {
            background: black;
        }
    }
}

.fullscreen-console {
    position: fixed !important;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
</style>
