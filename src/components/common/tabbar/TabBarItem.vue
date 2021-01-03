<template>
  <div id="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-active-icon"></slot></div>
    <div :style="activeStyle"><slot name="item-title"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    methods: {
      itemClick() {
        this.$router
            .replace(this.path)
            .catch(err => {
              console.log(err)
            })
      }
    },
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    }
  }
</script>

<style scoped>
  #tab-bar-item {
    flex: 1;
    height: 49px;
    font-size: 14px;
    text-align: center;
  }
  #tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
