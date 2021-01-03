<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button-all"
                    :is-checked="isSelectAll"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calculateClick">
      去计算({{checkedLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      calculateClick() {
        if (!this.checkedLength) {
          this.$toast.show('请选择购买的商品')
        }
      }
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preVal, currentVal) => {
          return preVal + currentVal.price * currentVal.count
        }, 0)
      },
      checkedLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.$store.state.cartList.length === 0) return false
        return !(this.$store.state.cartList.some(item => !item.checked))
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 49px;
    line-height: 40px;
    background-color: #eee;
    display: flex;
  }
  .check-content {
    display: flex;
    width: 60px;
    align-items: center;
    margin-left: 10px;
    margin-right: 30px;
  }
  .check-button-all {
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin-right: 5px;
  }
  .total-price {
    flex: 1;
  }
  .calculate {
    width: 100px;
    text-align: center;
    color: #fff;
    background-color: orangered;
  }
</style>
