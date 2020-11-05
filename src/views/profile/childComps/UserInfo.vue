<template>
  <div class="userinfo">
      <div class="img"></div>
      <div class="user-name">
          <h4>登录/注册</h4>
          <span>暂无绑定手机号</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo'
}
</script>

<style scoped>
 .userinfo {
     position: relative;
     width: 100%;
     height: 100px;
     background-color: var(--color-tint);
 }
 .userinfo .img {
     position: absolute;
     top: 25px;
     left: 25px;
     height: 60px;
     width: 60px;
     background-color: #fff;
     border-radius: 50px;
 }
 .user-name {
     position: absolute;
     left: 100px;
     top: 35px;
     color: #fff;    
 }
 .user-name h2 {
     font-size: 14px;
 }
 .user-name span {
     font-size: 10px;
 }
</style>
