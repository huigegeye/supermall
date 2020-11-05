<template>
  <div class="cart">
      <nav-bar class="navbar">
        <div slot="center">
          购物车({{cartLength}})
        </div>
      </nav-bar>
      <cart-list></cart-list>
      <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import CartList from "views/cart/childComps/CartList"
import CartBottomBar from "views/cart/childComps/CartBottomBar"

import {mapGetters} from "vuex"

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.navbar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
