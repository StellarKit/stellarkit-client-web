<template>
<div class='accounts'>
  <div class='account-item' v-for="item in items" @click.stop='clickItem(item)' :key='item.name'>
    <v-tooltip open-delay='200' bottom>
      <div slot="activator"> {{item.name}}<br> XLM: {{item.XLM}}<br>LMB: {{item.LMB}}<br><br> </div>
      <span>{{item.publicKey}}</span>
    </v-tooltip>
    <v-btn class='delete-button' icon small @click.stop='deleteItem(item)'>
      <v-icon>&#xE15C;</v-icon>
    </v-btn>
  </div>
</div>
</template>

<script>
export default {
  props: ['items'],
  methods: {
    clickItem(item) {
      this.$emit('click-item', item)
    },
    deleteItem(item) {
      this.$emit('delete-item', item)
    }
  }
}
</script>

<style lang='scss' scoped>
.accounts {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;

    .account-item {
        position: relative;
        color: black;
        font-weight: bold;
        font-size: 0.85em;
        margin: 5px;
        padding: 15px;
        border: solid 1px rgba(0,0,0,.4);
        border-radius: 8px;
        background: white;
        box-shadow: 0 7px 12px -7px rgba(0,0,0,.7);

        .delete-button {
            color: rgba(255, 0, 0, .7);
            z-index: 1;
            position: absolute;
            bottom: -8px;
            right: -8px;
        }
    }
}
</style>
