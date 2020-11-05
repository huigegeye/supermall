<template>
  <div class="category">
    <!--navbar部分-->
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <!--侧边栏部分-->
    <tab-menu :categories="categories" @getCurrentIndex="setCuerrentIndex"/>
    <!--列表部分-->
    <tab-content-category :subcategories="subCategories"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import Scroll from "components/common/scroll/Scroll"
 
import TabMenu from "views/category/childComps/TabMenu"
import TabContentCategory from "views/category/childComps/TabContentCategory"

import {getCategory,getSubcategory} from "network/category"


export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    TabContentCategory,
    Scroll
    },
  data() {
    return {
      categories: [],
      subCategories: [],
      index: 0
    };
  },
  created: function() {
    //在created生命周期函数中请求分类数据
   this._getCategory();
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        console.log(res);
        //获取分类列表数据
        this.categories = res.data.data.category.list;
        getSubcategory(this.categories[this.index].maitKey).then(res => {
          console.log(res);
          //获取详细分类数据
          this.subCategories = res.data.data.list;
        })
      })
    },
    setCuerrentIndex(currentindex) {
      //获取用户当前点击类的index
      this.index = currentindex;
      //根据index刷新数据
      this._getCategory();
    }
  }
};
</script>

<style >
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
