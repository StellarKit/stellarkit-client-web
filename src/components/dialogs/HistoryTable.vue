<template>
<v-card>
  <table-header :vars='headerVars' />
  <v-data-table
    :headers="headers"
    :items="history"
    :loading='loading'
    sort-icon='keyboard_arrow_down'
    :search="headerVars.search"
    item-key="id"
    :rows-per-page-items='[15,30,100,{"text":"All","value":-1}]'
  >
    <v-progress-linear
      slot="progress"
      color="blue"
      indeterminate
    ></v-progress-linear>
    <template
      slot="items"
      slot-scope="props"
    >
      <tr @click="props.expanded = !props.expanded">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.value }}</td>
        <td>
          <v-btn
            small
            flat
            class='mx-0'
            @click.stop='clickLink(props.item.link)'
          >link</v-btn>
        </td>
      </tr>
    </template>

    <template
      slot="expand"
      slot-scope="props"
    >
      <v-card flat>
        nothing yet
      </v-card>
    </template>

    <v-alert
      slot="no-data"
      :value="true"
      color="success"
      icon="info"
    >
      Sorry, nothing to display here :(
    </v-alert>

    <v-alert
      slot="no-results"
      :value="true"
      color="error"
      icon="warning"
    >
      Your search for "{{ headerVars.search }}" found no results.
    </v-alert>
  </v-data-table>
</v-card>
</template>

<script>
import WalletStream from '../../js/WalletStream.js'
import TableHeader from '../TableHeader.vue'
import Helper from '../../js/helper.js'

export default {
  props: ['publicKey'],
  components: {
    TableHeader
  },
  data() {
    return {
      loading: false,
      walletStream: null,
      cache: null,
      headerVars: {
        title: 'History',
        search: ''
      },
      history: [],
      headers: [{
        text: 'Name',
        align: 'left',
        value: 'name'
      }, {
        text: 'XLM',
        align: 'left',
        value: 'value'
      }, {
        text: 'Link',
        align: 'right',
        sortable: false,
        value: 'link'
      }]
    }
  },
  watch: {
    publicKey() {
      this.setup()
    }
  },
  mounted() {
    this.setup()
  },
  methods: {
    clickLink(link) {
      Helper.openBrowser(link)
    },
    setup() {
      if (!this.publicKey) {
        console.log('publicKey null')
      } else {
        if (this.walletStream) {
          this.walletStream.stop()
          this.walletStream = null
        }

        this.walletStream = new WalletStream(this.publicKey)

        this.history = []

        this.walletStream.on('updated', () => {
          this.history = this.walletStream.getItems()
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.image-wrapper {
    border-radius: 500px;
    height: 40px;
    width: 40px;
    overflow: hidden;
    margin: 6px;
}
</style>
