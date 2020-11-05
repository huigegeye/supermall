<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <div class="n-price">{{goods.price}}</div>
      <div class="o-price">{{goods.oldPrice}}</div>
      <div class="discount" v-if="goods.discountDesc">{{goods.discountDesc}}</div>
    </div>
    <div class="info-other">
      <div>{{goods.columns[0]}}</div>
      <div>{{goods.columns[1]}}</div>
      <div>{{goods.services[goods.services.length-1].name}}</div>
    </div>
    <div class="info-service">
      <div v-for="index in goods.services.length-1" :key="index" class="info-service-item">
        <img :src="goods.services[index-1].icon" alt />
        {{goods.services[index-1].name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style  scoped>
    .base-info{
        margin-top: 15px;
        padding:0 8px;
        color: #999;
        border-bottom: 5px solid #f2f5f8;
    }
    .info-title{
        color: #222;
    }
    .info-price{
        margin-top: 10px;
        color: var(--color-tint);
        font-size: 20px;
    }
    .info-other{
        display: flex;
        flex: 1;
    }
    .info-other div{
        margin-left: 38px;
        margin-top: 10px;
    }
    .info-service{
        display: flex;
        flex: 1;
        color: #000000;
    }
    .info-service div{
        margin-left: 23px ;
        margin-top: 20px;
    }
    .info-service img{
        height: 15px;
        widows: 15px;
    }
</style>
