<template>
<div>
  <balance-component :publicKey='publicKey' />
</div>
</template>

<script>
import BalanceComponent from './BalanceComponent.vue'

export default {
  props: ['publicKey'],
  components: {
    'balance-component': BalanceComponent
  },
  data() {
    return {}
  }
}
</script>
