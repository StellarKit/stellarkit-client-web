<template>
  <div>
    <div v-if="password === 'secret'">
      <account-list :items="accountsUI"/>

      <instructions-header>
        <div>Content coming soon...</div>
      </instructions-header>

      <div class="main-container"></div>
    </div>
    <div v-else class="password-field">
      <v-text-field
        label="Password"
        placeholder="Password"
        v-model.trim="enteredPassword"
        @keyup.enter="checkPassword"
        hint="Password"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import StellarCommonMixin from '../../components/StellarCommonMixin.js'
import InstructionsHeader from '../../components/InstructionsHeader.vue'
import AccountList from '../../components/AccountList.vue'
import SettingsStore from '../../js/SettingsStore.js'

export default {
  mixins: [StellarCommonMixin],
  data() {
    return {
      password: '',
      enteredPassword: ''
    }
  },
  components: {
    'account-list': AccountList,
    'instructions-header': InstructionsHeader
  },

  mounted() {
    this.password = SettingsStore.get('experiments-password')
  },
  methods: {
    checkPassword() {
      this.password = this.enteredPassword
      SettingsStore.set('experiments-password', this.password)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../scss/styles.scss';

.password-field {
  margin: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  max-height: 60vh;
}
</style>
