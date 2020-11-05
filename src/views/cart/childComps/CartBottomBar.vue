<template>
  <div class="bottom-bar">
      <div class="check-content">
          <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
          <span>全选</span>
      </div>

      <div class="price">
          合计：{{totalPrice}}
      </div>

      <div class="calculate" @click="calcClick">
          去计算({{checkLength}})
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/conent/checkButton/CheckButton';

export default {
  name: 'CartBottomBar',
  components: {
      CheckButton
  },
  computed:{
      //总价格
      totalPrice(){
          return '¥' + this.$store.state.cartList.filter(item => {
              return item.checked
          }).reduce((preValue,item) => {
              return preValue + item.price*item.count
          },0)
      },
      //总数量
      checkLength(){
          return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
          if(this.$store.state.cartList.length === 0) return false
          return !this.$store.state.cartList.find(item => !item.checked)
      },
  },
  methods:{
       checkClick(){
          if(this.isSelectAll){
            this.$store.state.cartList.forEach(item => item.checked=false)
          }else{
              this.$store.state.cartList.forEach(item => item.checked=true)
          }
      },
      calcClick(){
          if(!this.isSelectAll){
              this.$toast.show('请选择商品',2000)
          }
      }
  }
}
</script>

<style scoped>
.bottom-bar{
    height: 40px;
    position: relative;
    background-color: #eee;
    line-height: 40px;
    bottom: 40px;
    display: flex;
}
.check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
}
.check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
}
.price{
    margin-left: 20px;
    flex: 1;
}
.calculate{
    width: 80px;
    background-color:red;
    color: #fff;
    text-align: center;
}
</style>
