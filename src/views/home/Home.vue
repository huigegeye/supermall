<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl2"
      class="tab-control"
      v-show="isFixd"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTopClick" v-show="isBackTopShow" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/conent/tabControl";
import GoodsList from "components/conent/goods/GoodsList";
import BackTop from "components/conent/backTop/BackTop";

import HomeSwiper from "views/home/childComps/HomeSwiper";
import RecommendView from "views/home/childComps/RecommendView";
import FeatureView from "views/home/childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import {itemListenerMixin} from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isBackTopShow: false,
      tabOffsetTop: 0,
      isFixd: false,
      saveY: 0
    };
  },
  mixins:[itemListenerMixin],
  created() {
    //请求多个数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh, 500);
    // //监听item中图片加载完成
    // this.itemImageListener= () => {
    //   refresh();
    //   }
    // this.$bus.$on("itemImageLoad",this.itemImageListener);
  },
  //处于活跃时
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  //不处于活跃时
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();

    //取消全局事件的监听,需要传递要取消的全局事件的参数
    this.$bus.$off("itemImageLoad",this.itemImageListener)
  },
  methods: {
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
    },
    //事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      //判断是否显示回到顶部
      this.isBackTopShow = -position.y > 1000;
      //判断tabcontrol是否吸顶
      this.isFixd = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    //网络请求方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px;  */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
