import { debounce } from "common/utils";

export const itemListenerMixin={
  data(){
      return{
        itemImageListener:null,
        newRefresh:null
      }
  },
    mounted(){
      this.newRefresh = debounce(this.$refs.scroll.refresh, 500)
      //监听详情页中图片的加载
      this.itemImageListener= () => {
      this.newRefresh();
      }
      this.$bus.$on("itemImageLoad",this.itemImageListener)
      // console.log("我是混入的内容")
    }
}
