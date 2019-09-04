<template>
  <div class="container">
    <!-- 轮播图 -->
    <el-carousel :interval="5000" trigger="click">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <!-- <h3 class="small">{{ $axios.defaults.baseURL +item.url }}</h3> -->
        <div
          class="banner-image"
          :style="`
                background:url(${$axios.defaults.baseURL +item.url}) center center no-repeat;
                background-size:contain contain;
                `"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!--tab栏 -->
        <el-row type="flex" class="search-tab">
          <span
            v-for="(item, index) in options"
            :key="index"
            :class="{active: currentIndex === index}"
            @click="handleOption(index)"
          >
            <i>{{item.title}}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <!-- align flex布局下的垂直排列方式  像以前学习的flex -->
        <el-row type="flex" align="middle" class="search-input">
          <input :placeholder="options[currentIndex].placeholder"
           v-model="searchValue" />
          <i class="el-icon-search"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //轮播图数据
      banners: [
        // 可以在这边模拟有数据，但似乎以后都是通过接口方法获取数据的
        //可以在这里面放对象，对象中以键值对的方式放我们需要的数据，像下面这样
        // {
        //   url: "http://157.122.54.189:9095/assets/images/th03.jfif"
        // },
        // {
        //   url: "http://157.122.54.189:9095/assets/images/th04.jfif"
        // }
      ],
      //tab栏和搜索栏的数据
      options: [
        {
          title: "攻略",
          placeholder: "请输入城市"
        },
        {
          title: "酒店",
          placeholder: "请输入城市搜索酒店"
        },
        {
          title: "机票",
          placeholder: ""
        }
      ],
      currentIndex: 0, // 当前选定项的索引
      searchValue: ""
    };
  },
  mounted() {
    //因为nuxt已经默认封装了axios 所以可以直接下面这样使用
    this.$axios({
      url: "/scenics/banners",
      method: "get"
    })
      .then(res => {
        console.log(res);
        this.banners = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    //tab栏切换 
    handleOption(index) {
      this.currentIndex = index;
      // tab栏显示是机票的时候，跳转到几篇页面
      if(this.currentIndex === 2){
        this.$router.push('/air')
      }
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/.el-carousel__container {
    // 这个是elementUI框架的内置样式 ，前面加/deep/是可以深度查找到同名的内置样式，可以覆盖
    height: 700px;

    .banner-image {
      width: 100%;
      height: 100%;
    }
  }
  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }
    }

    span {
      width: 82px;
      height: 36px;
      display: block;
      position: relative;
      margin-right: 8px;
      cursor: pointer;
      i {
        position: absolute;
        z-index: 2;
        display: block;
        width: 100%;
        height: 100%;
        line-height: 30px;
        text-align: center;
        color: #fff;
      }
      &::after {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        content: "";
        width: 100%;
        height: 100%;
        border: 1px rgba(255, 255, 255, 0.2) solid;
        border-bottom: none;
        transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
        transform-origin: bottom left;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 1px 2px 0 0;
        box-sizing: border-box;
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>