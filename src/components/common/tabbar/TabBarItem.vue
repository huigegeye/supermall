<template>
  <div class="tabbar-item" @click="itemClick">
  <div v-if="!isActive"><slot name="item-icon"></slot></div>
  <div v-else><slot name="item-icon-active"></slot></div>
  <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default{
    name:'TabBarItem',
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path)!== -1
      },
      activeStyle(){
        return this.activeColor ? {color:this.activeColor} : {}
      }
    },
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    data(){
      return{
       
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)
      }
    }
}
</script>

<style>
 .tabbar-item{
   flex:1;
   text-align:center;
   height:49px;
 }

 .tabbar-item img{
     height:24px;
     width:24px;
 }
</style>