<template>
  <div class="tabs" style="padding:50px;">
      <div class="tabs_info" style="margin-bottom:15px;">
          <span 
          style="margin-right:10px;"       
    v-for="(item,index) in tabList "
      :key="index"
      @click="handleClick(index)"
      :class="{active:currentOption === index}"
      >
      {{item}}
      </span>
          
      </div>
      <div v-show="currentOption === 0" >
          <ul>
              <li>中秋节快到了</li>
              <li>中秋节快到了</li>
              <li>中秋节快到了</li>
          </ul>
      </div>
      <div v-show="currentOption === 1">
          <ul>
              <li>黄晓明离婚了</li>
              <li>黄晓明离婚了</li>
              <li>黄晓明离婚了</li>
          </ul>
      </div>
      <div v-show="currentOption === 2">
          <ul>
              <li>中国男篮夺冠了</li>
              <li>中国男篮夺冠了</li>
              <li>中国男篮夺冠了</li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
data(){
    return{
        currentOption:0,
        tabList:['新闻','娱乐','体育']
    }
},
methods:{
    handleClick(index){
        this.currentOption = index
    }
}
}
</script>

<style lang="less" scoped>
.active{
    color: red;
    background-color: rgb(168, 223, 202);
    font-size: 18px;
}
.tabs_info{
    cursor: pointer;
}

</style>