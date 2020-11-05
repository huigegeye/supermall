<template>
  <div class="list">
      <div class="item" v-for="(item,index) in listData" :key="index">
         {{item.info}}
      </div>
  </div>
</template>

<script>
export default {
  name: 'ListView',
  components: {},
  props: {
      listData: {
          type:Array,
          default:function() {
              return []
          }
      }
 }
}
</script>

<style scoped>
    .list {
        border-top: 10px solid #ebe6e6ef;
    }
    .item {
        height: 50px;
        line-height: 50px;
        text-align: left;
        margin-left: 50px;
        border-bottom: 2px solid rgb(224, 222, 222);
    }
    .item:last-of-type {
        border-bottom: 0;
    }
</style>
