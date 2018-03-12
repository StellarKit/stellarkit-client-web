<template>
<div class='menu-button-main'>
  <div>
    {{title}}:
  </div>
  <v-menu offset-y>
    <v-btn flat color='primary' class='custom-menu-button' slot="activator">
      {{getTitle()}}
      <v-icon>&#xE5C5;</v-icon>
    </v-btn>
    <v-list dense>
      <v-list-tile v-for="(item, index) in items" :key="item.title" @click="menuSelected(item, index)">
        <div>{{item.title}}</div>
      </v-list-tile>
    </v-list>
  </v-menu>
</div>
</template>

<script>
export default {
  props: ['title', 'items'],
  data() {
    return {
      index: 0
    }
  },
  methods: {
    getTitle() {
      if (this.items && this.items.length > 0) {
        return this.items[this.index].title
      }

      return '--'
    },
    menuSelected(item, index) {
      this.index = index
      this.$emit('menu-selected', item)
    }
  }
}
</script>

<style lang='scss' scoped>
.menu-button-main {
    display: flex;
    align-items: center;
    font-size: 0.95em;

    .custom-menu-button {
        margin: 0 0 0 6px;
    }
}
</style>
