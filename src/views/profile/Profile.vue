<template>
  <div>
  <nav-bar class="nav-bar"><div slot="center">百丽女装</div></nav-bar>
  <user-info/>
  <section class="account">
    <div class="account-item">
      <div class="number"><span class="balance">0.00</span>元</div>
      <div class="account-info">我的余额</div>
    </div>
    <div class="account-item">
      <div class="number"><span class="balance">0</span>个</div>
      <div class="account-info">我的优惠</div>
    </div>
    <div class="account-item">
      <div class="number"><span class="balance">0</span>分</div>
      <div class="account-info">我的积分</div>
    </div>
  </section>
  <list-view :listData="orderList"/>
  <list-view :listData="serviceList"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import UserInfo from "views/profile/childComps/UserInfo"
import ListView from "views/profile/childComps/ListView"

export default {
  name: 'Profile',
  components: {
    NavBar,
    UserInfo,
    ListView
    },
  data() {
    return {
      orderList: [
        {info:'我的消息'},
        {info:'积分商城'},
        {info:'会员商城'}
      ],
      serviceList: [
        {info:'我的购物车'},
        {info:'下载购物APP'}
      ]
    }
  }
}
</script>

<style >
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
 .account {
   display: flex;
 }
.account-item {
  text-align: center;
  width: 100%;
  background-color: #fff;
  margin-right: 1px;
  color: #666;
  font-size: 13px;
  padding: 18px;
}
.account-item:last-of-type {
  margin-right: 0;
}
 .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }
   .account-info {
    margin-top: 6px;
  }
</style>
