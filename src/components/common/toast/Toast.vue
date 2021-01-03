<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message='默认文字', duration=1500) {
        this.isShow = true
        this.message = message
        setTimeout(() => {
          this.isShow = false
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    color: #fff;
    padding: 8px 12px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, .8);
    transform: translate(-50%, -50%);
    z-index: 9999;
  }
</style>
