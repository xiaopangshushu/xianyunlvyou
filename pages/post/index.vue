<template>
  <div class="container">
  <el-container>
    <el-aside width="200px"> Aside
      <div class="navs">
        左边导航菜单
      </div>
      <div class="recomm">
        <h4>推荐城市</h4>
        <br>
        <a href="">
          <img src="" alt="这里有一张图片">
        </a>  
      </div>
    </el-aside>
    <el-main> Main
      <div class="post-wrapper">
        <div class="search-wrapper">
          <!-- 搜索框 -->
          <div class="search-bar">
            <input type="text" name="" id="">
          </div>
          <!-- 搜索推荐 -->
          <div class="search-recommend">
            <nuxt-link to="">推荐</nuxt-link>
            <nuxt-link to="">广州</nuxt-link>
            <nuxt-link to="">上海</nuxt-link>
            <nuxt-link to="">北京</nuxt-link>
          </div>
        </div>
        <div class="post-title">
          <h4>推荐攻略</h4>
          <button>
            <i class="el-icon-edit"></i>
            <span>写游记</span></button>
        </div>
        <div class="post-list">评论文章
          <div>
            <!-- 评论文章里面的循环 -->
            <div class="post-item">
              <h4><a href="">塞班贵？一定是你的打开方式不对！6000块玩转塞班</a></h4>
              <p class="post-desc">评论描述</p>
              <div class="img"><a href=""><img src="" alt="">评论的图片</a></div>
              <div class="post-info">
                <div class="post-info-left">
                  <span>
                    <i class="el-icon-location-outline"></i>
                    北京市
                  </span>
                  <div class="post-user">
                    <a href="">
                      <img src="" alt="这里是用户头像">这里是用户头像
                    </a>
                    <a href="">这里可以用插值，这里是用户名</a>
                  </div>
                  <span></span>
                </div>
                <div class="post-info-right">99赞</div>
              </div>
            </div>
          </div>
        </div>
        <div class="pagenagation">分页，可以用elementUI插件分页来写</div>
      </div>
    </el-main>
  </el-container>

  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
.container{
  width: 1000px;
  margin: 0 auto;
}
</style>