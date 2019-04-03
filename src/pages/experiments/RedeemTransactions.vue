<template>
  <div class="comp-box">
    <div>List of payments to burn: {{publicKey}}</div>

    <table-header :vars="headerVars"/>
    <v-data-table
      class="table-hacks"
      :headers="headers"
      must-sort
      :pagination.sync="pagination"
      :items="history"
      :loading="loading"
      sort-icon="keyboard_arrow_down"
      :search="headerVars.search"
      item-key="id"
      :rows-per-page-items="[15,30,100,{'text':'All','value':-1}]"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td>
            <v-btn
              small
              flat
              class="mx-0"
              @click.stop="clickLink(props.item.link)"
            >{{ props.item.date }}</v-btn>
          </td>

          <td>{{ props.item.name }}</td>
          <td>{{ props.item.value }}</td>
          <td>{{ props.item.from }}</td>
        </tr>
      </template>

      <template slot="expand">
        <v-card flat>nothing yet</v-card>
      </template>

      <v-alert
        slot="no-data"
        :value="true"
        color="success"
        icon="info"
      >Sorry, nothing to display here :(</v-alert>

      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"
      >Your search for "{{ headerVars.search }}" found no results.</v-alert>
    </v-data-table>
  </div>
</template>

<script>
import WalletStream from '../../js/WalletStream.js'
import TableHeader from '../../components/TableHeader.vue'
import Helper from '../../js/helper.js'

export default {
  props: ['asset', 'publicKey'],
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
      pagination: {
        descending: true
      },
      history: [],
      headers: [
        {
          text: 'Date',
          align: 'left',
          value: 'date'
        },
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Carbon',
          align: 'left',
          value: 'value'
        },
        {
          text: 'From',
          align: 'left',
          value: 'from'
        }
      ]
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
          const result = this.walletStream.getItems()

          for (const x of result) {
            if (x.assetCode === this.asset.getCode()) {
              this.history.push(x)
            }
          }
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../scss/styles.scss';

.image-wrapper {
  border-radius: 500px;
  height: 40px;
  width: 40px;
  overflow: hidden;
  margin: 6px;
}

.comp-box {
  // table header doesn't like flex
  //   display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
