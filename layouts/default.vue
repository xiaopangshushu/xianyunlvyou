<template>
  <div>
    <!-- 这个default.vue组件相当于根组件的作用 -->
    <!-- 头部公共部分的组件 -->
    <Header></Header>
    <!-- 坑 -->
    <nuxt />
    <!-- 底部公共部分 -->
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
export default {
  components:{
    Header,
    Footer
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
/* 样式初始化的操作 */
*{
  margin: 0;
  padding: 0;
}
ul,ol,li{
  list-style: none;
}
a{
  color:inherit;
  text-decoration: none;
}
a:hover{
  color:inherit;
}
i,em{
  font-style: normal;
}

</style>
