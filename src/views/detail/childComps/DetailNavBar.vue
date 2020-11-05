<template>
  <div>
    <nav-bar>
      <div slot="center" class="title">
        <div
          v-for="(item,index) in titles"
          :key="index"
          class="title-item"
          :class="{active: index === currenIndex}"
          @click="titleClick(index)"
        >{{item}}</div>
      </div>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetaliNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currenIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currenIndex = index;
      this.$emit("titleClick",index)
    },
    backClick(){
        this.$router.back()
    }
  },
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img{
    margin-top: 12px;
}
</style>
