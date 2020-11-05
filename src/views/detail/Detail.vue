<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick" />
    <scroll class="contents" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :paramInfo="paramInfo" ref="params" />
      <detail-comment :commentInfo="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addToclick="addToCart"/>
  </div>
</template>

<script>
import DetailNavBar from "views/detail/childComps/DetailNavBar";
import DetailSwiper from "views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childComps/DetailParamInfo";
import DetailComment from "views/detail/childComps/DetailComment";
import DetailBottomBar from "views/detail/childComps/DetailBottomBar";

import GoodsList from "components/conent/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailComment,
    GoodsList,
    DetailBottomBar
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currenIndex: 0,
    };
  },
  mixins: [itemListenerMixin],
  created() {
    //保存商品的iid
    this.iid = this.$route.params.iid;
    //发送请求获取数据
    getDetail(this.iid).then((res) => {
       console.log(res);
      const data = res.data.result;
      this.topImages = data.itemInfo.topImages;

      //创建Goods对象，整合数据商品信息的类
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //保存店铺信息
      this.shop = new Shop(data.shopInfo);

      //保存商品详情信息
      this.detailInfo = data.detailInfo;

      //保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //保存评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    //请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.data.list;
    }),
      //对图片加载后保存位置进行防抖
      (this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      }));
  },
  mounted() {
    //     const refresh = debounce(this.$refs.scroll.refresh, 500)
    //     //监听详情页中图片的加载
    //     this.itemImageListener= () => {
    //     refresh();
    //     }
    //     this.$bus.$on("itemImageLoad",this.itemImageListener)
    // },
    // destroyed(){
    //     //取消详情页全图片加载事件的监听
    //     this.$bus.$off("itemImageLoad",this.itemImageListener)
  },
  methods: {
    imageLoad() {
      this.newRefresh();

      //图片加载完成后保存组件的位置
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
      // console.log(index)
    },
    //滚动位置与导航联动
    contentScroll(position) {
      //获取y值
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      //对当前位置进行判断
      for (let i=0; i < length; i++) {
        if (
          this.currenIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currenIndex = i;
          console.log(this.currenIndex)
          this.$refs.nav.currenIndex = this.currenIndex;
        }
      }
    },
    addToCart(){
      //获取购物车需要展示的信息
      const product={}
      product.image=this.topImages[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.oldPrice
      product.iid=this.iid

      //将商品添加到购物车里
      this.$store.dispatch("addCart",product)
    }
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.contents {
  height: calc(100% - 44px - 49px);
}
</style>
