<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list class="cart-list"/>
    <cart-bottom-bar />
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // ...mapGetters({
      //   length: 'cartLength',
      //   list: 'cartList'
      // })
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
    position: relative;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /*font-weight: 700;*/
  }
  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>
