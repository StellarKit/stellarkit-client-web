<template>
<v-dialog
  lazy
  v-model='visible'
  scrollable
  @keydown.esc="visible = false"
  max-width="640"
>
  <div class='main-container'>
    <dialog-title-bar
      :title=title
      v-on:close='visible = false'
    />

    <div class='help-contents'>
      <history-table
        v-if='publicKey'
        :publicKey='publicKey'
      />
    </div>
  </div>
</v-dialog>
</template>

<script>
import {
  DialogTitleBar
} from 'stellar-js-utils'
import HistoryTable from './HistoryTable.vue'

export default {
  props: ['ping', 'publicKey'],
  components: {
    DialogTitleBar,
    HistoryTable
  },
  data() {
    return {
      visible: false,
      title: 'History',
      users: []
    }
  },
  watch: {
    ping: function() {
      this.visible = true
    }
  },
  methods: {
    allowTrust(authorize) {
      // ddd
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../scss/styles.scss';

.main-container {
    @include standard-dialog-contents();

    .help-contents {
        @include inner-dialog-contents();

        .help-text {
            div {
                margin-bottom: 10px;
            }
            margin-bottom: 20px;

            .sub-header {
                font-size: 0.8em;
            }
        }
    }
}
</style>
