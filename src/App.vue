<template>
<v-app>
  <div class='app-wrapper' v-if='!initializing'>
    <navivation-drawer :ping='showNavigation' />
    <div class='main-container'>
      <div class="top-bar">
        <v-tabs centered>
          <ticker-component />

          <v-toolbar dark class='top-toolbar'>
            <v-toolbar-side-icon @click='showDrawer'></v-toolbar-side-icon>
            <v-toolbar-title>{{pageTitle()}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="showGitHub">
              <v-icon>fa-github</v-icon>
            </v-btn>
            <v-tabs-bar slot="extension">
              <v-tooltip v-for='tab in tabs' open-delay='800' :key='tab.path' bottom>
                <v-tabs-item slot='activator' :to='tab.path' exact class="custom-tab-item">
                  <div class='custom-tab-content'>
                    <v-icon v-html='tab.icon'></v-icon>
                    <div class='bottom-bar' />
                  </div>
                </v-tabs-item>
                <span>{{tab.tooltip}}</span>
              </v-tooltip>
            </v-tabs-bar>
          </v-toolbar>
        </v-tabs>
      </div>

      <network-menu />
      <div class='app-content'>
        <div class='router-container '>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>

        <div class='app-console'>
          <div class='console-bar'>
            <v-btn icon dark @click.stop='clearLog()'>
              <v-tooltip open-delay='800' bottom>
                <v-icon slot='activator'>&#xE15C;</v-icon>
                <span>Clear console</span>
              </v-tooltip>
            </v-btn>
            <v-btn icon dark @click.stop='fullscreenConsole()'>
              <v-tooltip open-delay='800' bottom>
                <v-icon v-if='fullscreenMode' slot='activator'>&#xE5D1;</v-icon>
                <v-icon v-else slot='activator'>&#xE5D0;</v-icon>
                <span>Full Screen</span>
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
      </div>

      <!-- <footer-component publicKey='GBRKGAEJ7NLGCSF66Q5HZIG7OCKUOKF3N2POSDDGS2VPIWZQCA5HGP3V' /> -->
      <!-- <footer-component publicKey='GCYQSB3UQDSISB5LKAL2OEVLAYJNIR7LFVYDNKRMLWQKDCBX4PU3Z6JP' /> -->
    </div>

    <toast-component />
  </div>
</v-app>
</template>

<script>
import NavigationDrawer from './components/NavigationDrawer.vue'
import TickerComponent from './components/TickerComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import NetworkMenu from './components/NetworkMenu.vue'
import Helper from './js/helper.js'
import Storage from './js/storage.js'
import $ from 'jquery'
import ToastComponent from './components/ToastComponent.vue'

export default {
  components: {
    'ticker-component': TickerComponent,
    'footer-component': FooterComponent,
    'navivation-drawer': NavigationDrawer,
    'network-menu': NetworkMenu,
    'toast-component': ToastComponent
  },
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
      showNavigation: false,
      consoleOutput: '',
      snackbarText: '',
      snackbarModel: false,
      initializing: true,
      menu: false,
      condensedOutput: false,
      expandXDR: false,
      fullscreenMode: false,
      tabs: [{
        icon: String.fromCharCode('0xE88A'),
        tooltip: 'Make Payments',
        path: '/'
      }, {
        icon: String.fromCharCode('0xE263'),
        tooltip: 'Create Token',
        path: '/token'
      }, {
        icon: String.fromCharCode('0xE851'),
        tooltip: 'Buy token with Bifrost',
        path: '/buytoken'
      }, {
        icon: String.fromCharCode('0xE8C9'),
        tooltip: 'Live Trades',
        path: '/trades'
      }, {
        icon: String.fromCharCode('0xE86C'),
        tooltip: 'Allow Trust',
        path: '/trust'
      }, {
        icon: String.fromCharCode('0xE897'),
        tooltip: 'Locked Tokens',
        path: '/locked'
      }, {
        icon: String.fromCharCode('0xE1E0'),
        tooltip: 'Ledger Nano',
        path: '/ledger'
      }]
    }
  },
  created() {
    Storage.init()
      .then(() => {
        this.initializing = false

        this.condensedOutput = Helper.get('condensedOutput')
        this.expandXDR = Helper.get('expandXDR')
      })
      .catch((error) => {
        console.log(error)
      })
  },
  mounted() {
    Helper.vue().$on('console', this.log)
  },
  methods: {
    fullscreenConsole() {
      const appconsole = $(this.$el).find('.app-console')

      appconsole.toggleClass('fullscreen-console')

      this.fullscreenMode = appconsole.hasClass('fullscreen-console')
    },
    showGitHub() {
      Helper.openBrowser('https://github.com/StellarKit/stellar-client-web')
    },
    showDrawer() {
      this.showNavigation = !this.showNavigation
    },
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
    },
    consoleSettings() {
      // sdfdf
    },
    toast(message) {
      this.snackbarText = message
      this.snackbarModel = !this.snackbarModel
    },
    pageTitle() {
      return this.$router.currentRoute.name
    }
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons);
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);

@import '../node_modules/vuetify/dist/vuetify.min.css'
</style>

<style lang='scss'>
// gets rid of scrollbars on desktop
body,
html {
    overflow: hidden;
    height: 100%;
    width: 100%;
}

#app {
    height: 100%;
}

// hack for toolbar being too tall
#app > div.application--wrap > div > div.main-container > div.top-bar > div > nav > div.toolbar__content {
    height: auto !important;
}

// hack for toolbar title left margin
#app > div.application--wrap > div > div.main-container > div.top-bar > div > nav > div.toolbar__content > div.toolbar__title {
    margin: 0;
    font-size: 1.3em;
}
</style>

<style  lang='scss' scoped>
.app-wrapper {
    display: flex;
    flex: 1;
}

.main-container {
    display: flex;
    flex: 1;
    flex-direction: column;

    .top-bar {
        width: 100%;
        box-shadow: 0 1px 4px rgba(0,0,0,.5);

        .top-toolbar {
            background: linear-gradient(to bottom, rgb(55,55,55) , rgb(22,22,22));
        }

        li.custom-tab-item {
            color: white;

            a.tabs__item {
                .custom-tab-content {
                    display: flex;
                    flex-direction: column;

                    .bottom-bar {
                        opacity: 0;
                        height: 2px;
                        width: 100%;
                        background: white;
                    }
                }
                &.tabs__item--active {
                    .bottom-bar {
                        opacity: 1;
                    }
                }
            }
        }
    }

    .app-content {
        display: flex;
        width: 100%;
        flex: 1;

        flex-direction: column;

        .router-container {
            width: 100%;
            overflow-y: auto;
        }

        .fullscreen-console {
            position: fixed !important;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
        }

        .app-console {
            position: relative;
            display: flex;
            flex: 1 1 80px;

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
                background: rgb(0,20,0);
                overflow: auto;
                color: rgb(0,256,150);
                padding: 10px;
            }
        }
    }
}
</style>
