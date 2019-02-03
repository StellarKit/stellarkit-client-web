<template>
<div class='menu-button-main'>
  <div>
    {{title}}:
  </div>
  <v-menu offset-y>
    <v-btn
      flat
      color='primary'
      class='custom-menu-button'
      slot="activator"
    >
      {{getTitle()}}
      <v-icon>&#xE5C5;</v-icon>
    </v-btn>
    <v-list dense>
      <v-list-tile
        v-for="(item, index) in items"
        :key="item.title"
        @click="menuClick(item, index)"
      >
        <div>{{item.title}}</div>
      </v-list-tile>
    </v-list>
  </v-menu>
</div>
</template>

<script>
export default {
  props: ['title', 'items', 'selectedID'],
  data() {
    return {
      index: 0
    }
  },
  watch: {
    selectedID: function() {
      this.selectItemWithID(this.selectedID)
    }
  },
  mounted() {
    this.selectItemWithID(this.selectedID)
  },
  methods: {
    getTitle() {
      return this.getSelectedItem().title
    },
    menuClick(item, index) {
      this.$emit('menu-selected', item)
    },
    selectItemWithID(id) {
      for (const [index, item] of this.items.entries()) {
        if (id === item.id) {
          this.index = index
          break
        }
      }
    },
    getSelectedItem() {
      if (this.items && this.items.length > 0) {
        return this.items[this.index]
      }
      return {
        title: '--',
        id: ''
      }
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
