<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px" v-if="currentTab === 0">
      <el-form-item label="出发城市">
        <!-- 文档地址：https://element.eleme.cn/#/zh-CN/component/input#yuan-cheng-sou-suo -->

        <!-- fetch-suggestions: 获取搜索建议，并且显示在输入框的下拉框中 -->
        <!-- select：在下拉框中选中时候时候触发的事件 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          v-model="searchForm.departCity"
          @select="handleDepartSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          v-model="searchForm.destCity"
          @select="handleDestSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          v-model="searchForm.departDate"
          style="width: 100%;"
          @change="handleDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>

    <!-- 试着写下往返的搜索页面 -->
    <el-form v-else>往返的搜索页面</el-form>
  </div>
</template>

<script>
import moment from "moment"; // 引入moment 用于格式化出发的日期时间
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      searchForm: {
        departCity: "", //出发城市
        departCode: "", //出发城市代码
        destCity: "", //目标城市
        destCode: "", //目标城市代码
        departDate: "" // 出发日期
      }
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      this.currentTab = index;
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      //   cb([{ value: 1 }, { value: 2 }, { value: 3 }]);
      //   cb([{ value: '' }, { value: '' }, { value: '' }]);
      cb([]);
      console.log(value); // value的值其实就是输入框里面输入的内容，更方便似乎
      if (!value) {
        // 也可以在这里传递一个 cb([])，解决没有输入的时候，会出现下拉菜单
        return; // 如果输入框里面没有内容，返回
      }
      //根据用户的输入，请求城市
      this.$axios({
        url: "/airs/city",
        params: {
          name: value // 这是输入框的文字
        }
      }).then(res => {
        console.log(res);
        // 由组件远程搜索输入框的说明可知，需要给数据每一项添加一个value 属性，用来显示选择
        const { data } = res.data;
        let newData = [];
        data.forEach(v => {
          // 给data内每一项 添加value属性
          // v.value = v.name.replace('市','')  // 这是替换
          v.value = v.name.slice(0, v.name.length - 1);
          newData.push(v);
        });
        this.searchForm.departCity = newData[0].value;
        this.searchForm.departCode = newData[0].sort;
        cb(newData); // 把数据显示在下拉菜单中
      });
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      //   cb([{ value: 1 }, { value: 2 }, { value: 3 }]);
      cb([]);
      if (!value) {
        return; // 如果输入框里面没有内容，返回
      }
      // 根据用户输入的内容发送请求查询
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // 可以打印出来看数据
        // 把我们需要的数据从返回的数据中解构出来
        const { data } = res.data;
        let newData = [];
        data.forEach(v => {
          v.value = v.name.slice(0, v.name.length - 1);
          newData.push(v);
          console.log(123);
        });
        this.searchForm.destCity = newData[0].value;
        this.searchForm.destCode = newData[0].sort;
        cb(newData);
      });
    },

    // 事件的文档地址：https://element.eleme.cn/#/zh-CN/component/input#autocomplete-events
    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // console.log(12313131313131313)
      console.log(item);
      // console.log(this.searchForm.departCity)
      // 把选中的赋值设置给form

      this.searchForm.departCity = item.value;
      this.searchForm.departCode = item.sort;
    },

    // 出发城市下拉选择时触发
    // 事件的文档地址：https://element.eleme.cn/#/zh-CN/component/input#autocomplete-events
    // item是当然选中的对象
    handleDestSelect(item) {
      this.searchForm.destCity = item.value;
      this.searchForm.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      // console.log(333333333333333333)
      this.searchForm.departDate = moment(value).format("YYYY-MM-DD");
      console.log(this.searchForm.departDate);
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      // 切换城市，其实就是交叉赋值  // 可以把所有的数据都解构出来，看起来高大上
      const { departCity, departCode,destCity, destCode  } = this.searchForm;
      // 交叉赋值
      this.searchForm.departCity = destCity
      this.searchForm.destCity = departCity
      this.searchForm.departCode = destCode
      this.searchForm.destCode = departCode
    },

    // 提交表单是触发
    handleSubmit() {
      // 非空验证,其实是可以在rules的规则中写的，但是rules的页面默认提示会影响布局
      const { departCity, destCity, departDate } = this.searchForm;
      if (!departCity) {
        this.alert("出发城市不能为空", "提示");
        return;
      }
      if (!destCity) {
        this.alert("目的地城市不能为空", "提示");
        return;
      }
      if (!departDate) {
        this.alert("出发时间不能为空", "提示");
        return;
      }
      // 跳转到机票列表页 /air/flights
      this.$router.push({
        path: "/air/flights",
        // url携带的参数
        query: this.searchForm
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
