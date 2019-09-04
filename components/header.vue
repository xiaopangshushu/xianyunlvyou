<template>
  <div class="container">
    <el-row type="flex" justify="space-between" class="main">
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt="闲云logo图" />
      </div>

      <!-- 导航的tab栏 -->
      <el-row type="flex" class="navs">
        <!-- nuxt-link 和router-link 作用和用法差不多 -->
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录跳转 -->
      <div>
        <nuxt-link to="/user/login">登录 / 跳转</nuxt-link>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  mounted(){
    console.log(this.$store.state.userInfo.token)
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 60px;
  width: 100%;
  line-height: 60px;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 2px 2px #ddd;
}
.main {
  width: 1000px;
  margin: 0 auto;
}

.navs {
  flex: 1;
  margin-left: 15px;
  a {
    display: block;
    height: 60px;
    padding: 0 20px;
    box-sizing: border-box;
    &:hover {
      color: #409eff;
      border-bottom: 5px solid #409eff;
    }
  }
  // 因为 elementUI 已经帮我们添加了一个点击时的样式，而且应该是和 a标签 同级别的，所以，覆盖就可以了
  // 该class是nuxt会去自动匹配nuxt-link的to的值，如果url和to的值相等会自动加上下面的class
  .nuxt-link-exact-active {
    background-color: #409eff;
    color: #fff;
    &:hover {
      color: fff;
    }
  }
}
.logo {
  padding-top: 9px;
  img{
    display: block;
    width: 156px;
    height: 42px;
  }
}
</style> 