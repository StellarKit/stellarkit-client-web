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
              <!-- <v-tabs-slider color="white"></v-tabs-slider> -->
              <v-tooltip open-delay='800' bottom>
                <v-tabs-item slot='activator' to='/' exact class="custom-tab-item">
                  <div class='custom-tab-content'>
                    <v-icon>&#xE88A;</v-icon>
                    <div class='bottom-bar' />
                  </div>
                </v-tabs-item>
                <span>Make Payments</span>
              </v-tooltip>
              <v-tooltip open-delay='800' bottom>
                <v-tabs-item slot='activator' to='/token' exact class="custom-tab-item">
                  <div class='custom-tab-content'>
                    <v-icon>&#xE263;</v-icon>
                    <div class='bottom-bar' />
                  </div>
                </v-tabs-item>
                <span>Create Token</span>
              </v-tooltip>
              <v-tooltip open-delay='800' bottom>
                <v-tabs-item slot='activator' to='/buytoken' exact class="custom-tab-item">
                  <div class='custom-tab-content'>
                    <v-icon>&#xE851;</v-icon>
                    <div class='bottom-bar' />
                  </div>
                </v-tabs-item>
                <span>Buy token with Bifrost</span>
              </v-tooltip>
              <v-tooltip open-delay='800' bottom>
                <v-tabs-item slot='activator' to='/trades' exact class="custom-tab-item">
                  <div class='custom-tab-content'>
                    <v-icon>&#xE8C9;</v-icon>
                    <div class='bottom-bar' />
                  </div>
                </v-tabs-item>
                <span>Live Trades</span>
              </v-tooltip>
              <v-tooltip open-delay='800' bottom>
                <v-tabs-item slot='activator' to='/trust' exact class="custom-tab-item">
                  <div class='custom-tab-content'>
                    <v-icon>&#xE86C;</v-icon>
                    <div class='bottom-bar' />
                  </div>
                </v-tabs-item>
                <span>Allow Trust</span>
              </v-tooltip>
              <v-tooltip open-delay='800' bottom>
                <v-tabs-item slot='activator' to='/locked' exact class="custom-tab-item">
                  <div class='custom-tab-content'>
                    <v-icon>&#xE897;</v-icon>
                    <div class='bottom-bar' />
                  </div>
                </v-tabs-item>
                <span>Locked Tokens</span>
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
          <v-btn class='console-bar' icon dark @click.stop='clearLog()'>
            <v-tooltip open-delay='800' bottom>
              <v-icon slot='activator'>&#xE15C;</v-icon>
              <span>Clear console</span>
            </v-tooltip>
          </v-btn>

          <textarea readonly="readonly" wrap="off" class='output-container' v-model='consoleOutput'></textarea>
        </div>
      </div>

      <!-- <footer-component publicKey='GBRKGAEJ7NLGCSF66Q5HZIG7OCKUOKF3N2POSDDGS2VPIWZQCA5HGP3V' /> -->
      <!-- <footer-component publicKey='GCYQSB3UQDSISB5LKAL2OEVLAYJNIR7LFVYDNKRMLWQKDCBX4PU3Z6JP' /> -->
    </div>

    <v-snackbar :timeout="500" :multi-line=false :vertical=true v-model="snackbarModel">
      {{snackbarText}}
      <v-btn small dark flat @click.native="snackbarModel=false">Close</v-btn>
    </v-snackbar>
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

export default {
  components: {
    'ticker-component': TickerComponent,
    'footer-component': FooterComponent,
    'navivation-drawer': NavigationDrawer,
    'network-menu': NetworkMenu
  },
  data() {
    return {
      showNavigation: false,
      consoleOutput: '',
      snackbarText: '',
      snackbarModel: false,
      initializing: true
    }
  },
  created() {
    Storage.init()
      .then(() => {
        this.initializing = false
      })
      .catch((error) => {
        console.log(error)
      })
  },
  mounted() {
    Helper.vue().$on('console', this.log)
  },
  methods: {
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

        .app-console {
            position: relative;
            display: flex;
            flex: 1 1 300px;
            border-top: solid 1px transparent;

            .console-bar {
                display: flex;
                position: absolute;
                top: 0;
                left: 0;
                margin: 0;

                color: rgba(255,255,255,.3);
                &:hover {
                    color: rgba(255,255,255,1);
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
