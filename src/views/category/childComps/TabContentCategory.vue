<template>
  <div class="list">
          <div class="item" v-for="(item,index) in subcategories" :key=index>
              <a :href="item.link">
                  <img :src="item.image">
                  <div>{{item.title}}</div>
              </a>
          </div>
  </div>    
</template>

<script>
export default {
  name: 'TabContentCategory',
  components: {},
  data() {
    return {

    }
  },
  props: {
      subcategories: {
          type:Array,
          default() {
              return []
          }
      }
  }
}
</script>

<style scoped>
    .list {
        position: absolute;
        display: flex;
        flex-wrap: wrap;
        top: 44px;
        left: 80px;
    }
    .item{
        width: 100px;
        height: 100px;
        text-align: center;
    }
    .item img{
       width: 50px;
       height: 50px;
    }
    .item div {
        text-align: center;
    }
</style>
