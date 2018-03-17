<template>
<div class='header-bar'>
  <div class='left-header-bar'>
    <v-btn icon small @click='clickButton("menu")'>
      <v-icon>&#xE5D2;</v-icon>
    </v-btn>

    <div class='tab-indicator'>
      {{pageTitle}}
    </div>
  </div>
  <div class='right-header-bar'>
    <v-btn icon small @click='clickButton("github")'>
      <v-icon>fa-github</v-icon>
    </v-btn>
  </div>

  <div class='header-tab-bar'>
    <div class='header-tab-bar-inner'>
      <v-btn icon small v-if='!tab.disabled' v-for='tab in tabs' :to='tab.path' exact :key='tab.path' class="bar-item" active-class="header-active-tab">
        <v-tooltip open-delay='800' bottom>
          <v-icon slot='activator' v-html='tab.icon'></v-icon>
          <span>{{tab.tooltip}}</span>
        </v-tooltip>
      </v-btn>
    </div>
  </div>

</div>
</template>

<script>
export default {
  props: ['items'],
  computed: {
    pageTitle: function() {
      return this.$route.name
    }
  },
  data() {
    return {
      tabs: [{
        icon: String.fromCharCode('0xE88A'),
        tooltip: 'Common Actions',
        path: '/'
      }, {
        icon: String.fromCharCode('0xE3E7'),
        tooltip: 'ICO Manager',
        path: '/ico'
      }, {
        icon: String.fromCharCode('0xE889'),
        tooltip: 'History Viewer',
        path: '/history'
      }, {
        icon: String.fromCharCode('0xE8C9'),
        tooltip: 'Live Trades',
        path: '/trades'
      }, {
        icon: String.fromCharCode('0xE263'),
        tooltip: 'Create Token Tutorial',
        path: '/token'
      }, {
        icon: String.fromCharCode('0xE86C'),
        tooltip: 'Allow Trust',
        path: '/trust'
      }, {
        icon: String.fromCharCode('0xE897'),
        tooltip: 'Locked Tokens',
        path: '/locked'
      }, {
        icon: String.fromCharCode('0xE851'),
        tooltip: 'Buy token with Bifrost',
        path: '/buytoken'
      }, {
        icon: String.fromCharCode('0xE1E0'),
        tooltip: 'Ledger Nano',
        path: '/ledger',
        disabled: true
      }]
    }
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
            color: rgba(255,255,255,.4);
            font-weight: bold;
        }
        @media all and (max-width: 600px) {
            .tab-indicator {
                visibility: hidden;
            }
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
                    background: rgba(255,255,255,.3);
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
