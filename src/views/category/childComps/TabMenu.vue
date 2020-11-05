<template>
  <scroll id="tab-menu">
      <div class="tab-list">
          <div class="tab-item" v-for="(item,index) in categories" :key="index"
                                @click="itemClick(index)"
                                :class="{active: currentIndex === index}"
          >
              {{item.title}}
          </div>
      </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

export default {
  name: 'TabMenu',
  components: {Scroll},
  props: {
      categories: Array
  },
  data() {
      return {
          currentIndex: 0
      }
  },
  methods: {
      itemClick(index) {
          this.currentIndex = index;
          this.$emit("getCurrentIndex",this.currentIndex)
      },
  }
}
</script>

<style scoped>
    #tab-menu {
    background-color: #f6f6f6;
    height: 100%;
    width: 80px;
    box-sizing: border-box;
  }
    .tab-list{
        display: flex;
        flex-direction: column;
    }
    .tab-item{
        flex: 1;
        height: 40px;
        width: 80px;
        text-align: center;
        line-height: 40px;
        font-size: 12px;
        background-color: #f6f6f6;
    }
    .active {
        color: var(--color-tint);
        background-color: #fff;
        border-left: 3px solid var(--color-tint);
    }
</style>
