<template>
  <div>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            :pull-up-load="true">
      <cart-list-item v-for="(item,index) in cartList"
                      :key="index"
                      :product="item"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'

  import {mapGetters} from 'vuex'

	export default {
		name: "CartList",
    components: {
		  Scroll,
      CartListItem
    },
    activated() {
		  this.$refs.scroll.refresh()
    },
    computed: {
		  ...mapGetters(['cartList'])
    },
    methods: {
      loadMore() {
        this.$refs.scroll.finishPullUp()
      },
      contentScroll(position) {
      }
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .content {
    height: calc(100% - 40px);
    overflow: hidden;
  }
</style>
