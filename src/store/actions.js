export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let product = context.state.cartList.find(item => item.iid === payload.iid)
      if (product) {
        context.commit('addCounter', product)
        // product.count += 1
        resolve('购物车数量+1')
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('已添加到购物车')
      }
    })
  }
}
