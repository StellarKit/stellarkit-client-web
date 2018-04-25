<template>
<div class='table-header'>
  {{vars.title}}
  <v-btn v-if='vars.showAdd' small icon @click='addData'>
    <v-icon>add_circle</v-icon>
  </v-btn>
  <v-btn v-if='vars.showRefresh' small icon @click='refreshData'>
    <v-icon>refresh</v-icon>
  </v-btn>
  <v-spacer></v-spacer>
  <v-text-field class='table-textview' append-icon="search" label="Search" hide-details v-model="vars.search"></v-text-field>
</div>
</template>

<script>
export default {
  props: ['vars'],
  data() {
    return {
      xx: false
    }
  },
  methods: {
    refreshData() {
      this.$emit('refresh-data')
    },
    addData() {
      this.$emit('add-data')
    }
  }
}
</script>

<style lang='scss' scoped>
.table-header {
    display: flex;
    align-items: center;
    padding: 0 14px;

    .table-textview {
        max-width: 250px;
    }
}
</style>
