<template>
  <div class="header-bar">
    <div class="left-header-bar">
      <v-btn icon small @click="clickButton('menu')">
        <v-icon>&#xE5D2;</v-icon>
      </v-btn>

      <div class="tab-indicator">{{pageTitle}}</div>
    </div>
    <div class="right-header-bar">
      <div v-if="networkIndicator" class="network-indicator">
        <v-tooltip v-if="isTestnet" left>
          <template v-slot:activator="{ on }">
            <div class="testnet" v-on="on" />
          </template>
          <span>Test Network</span>
        </v-tooltip>
        <v-tooltip v-else left>
          <template v-slot:activator="{ on }">
            <div class="publicnet" v-on="on" />
          </template>
          <span>Public Network</span>
        </v-tooltip>
      </div>
      <v-btn v-else icon small @click="clickButton('github')">
        <v-icon>fab fa-github</v-icon>
      </v-btn>
    </div>

    <div class="header-tab-bar">
      <div class="header-tab-bar-inner">
        <v-btn
          icon
          small
          v-if="!tab.disabled"
          v-for="tab in tabs"
          :to="tab.path"
          exact
          :key="tab.path"
          class="bar-item"
          active-class="header-active-tab"
        >
          <v-tooltip open-delay="800" bottom>
            <template v-slot:activator="{ on }">
              <v-icon slot="activator" v-html="tab.icon"></v-icon>
            </template>
            <span>{{tab.tooltip}}</span>
          </v-tooltip>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '../js/helper.js'
import StellarUtils from '../js/StellarUtils.js'

export default {
  props: ['items', 'tabs', 'networkIndicator', 'homeTitle'],
  computed: {
    pageTitle: function() {
      if (this.$route.path === '/') {
        return this.homeTitle
      }
      return this.$route.name
    }
  },
  data() {
    return {
      isTestnet: true
    }
  },
  mounted() {
    this.isTestnet = StellarUtils.isTestnet()

    Helper.vue().$on('settings-updated', key => {
      if (key === 'server') {
        this.isTestnet = StellarUtils.isTestnet()
      }
    })

    Helper.vue().$on('enable-experiments', () => {
      for (const tab of this.tabs) {
        if (tab.disabled === true) {
          tab.disabled = false
        }
      }
    })
  },
  methods: {
    clickButton(id) {
      switch (id) {
        case 'menu':
          this.$emit('show-drawer')
          break
        case 'github':
          this.$emit('show-github')
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.header-bar {
  position: relative;
  display: flex;
  background: steelblue;
  align-items: center;

  .left-header-bar {
    display: flex;
    align-items: center;
    flex: 1 1 auto;

    .tab-indicator {
      font-size: 1.2em;
      color: rgba(255, 255, 255, 0.4);
      font-weight: bold;
    }
    @media all and (max-width: 600px) {
      .tab-indicator {
        visibility: hidden;
      }
    }
  }

  .network-indicator {
    margin-right: 13px;

    .publicnet,
    .testnet {
      width: 12px;
      height: 12px;
      border-radius: 500px;
    }

    .publicnet {
      background: rgb(0, 255, 70);
    }

    .testnet {
      background: rgb(0, 194, 255);
      box-shadow: 0 0 1px white;
    }
  }

  .right-header-bar {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
  }

  .header-tab-bar {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    flex: 1 1 auto;
    pointer-events: none;

    .header-tab-bar-inner {
      pointer-events: all;

      a {
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }

      .header-active-tab {
        color: white;
      }
      a {
        margin: 1px 2px;
        padding: 0;
      }
    }
  }
}
</style>
