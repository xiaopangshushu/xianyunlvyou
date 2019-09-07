<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    
                </div>
                
                <!-- 航班头部布局 -->
                <div>
                    <FlightsListHead />
                </div>
                
                
                <!-- 航班信息 -->
                <div>
                    <FlightsItem 
                    v-for="(item,index) in dataList"
                    :key="index"
                    :data="item"
                    />
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead.vue'
import FlightsItem from '@/components/air/flightsItem.vue'
import moment from "moment";

export default {
    data(){
        return {
          flightsData:{}, // 机票列表返回的总数据 ，包含4个属性 flights/info/options/total
          dataList:[] // 航班列表数据数组，用于flightsItem组件，单独出来，是因为方便处理分页     
        }
    },
    components:{
        FlightsListHead,
        FlightsItem
    },
     mounted(){
        this.$axios({
            url:'airs',
            // method:'get'
            params:this.$route.query
        })
        .then(res=>{
            console.log(res)

            console.log(123123121213123131313)
            // console.log(this.$route.query)
            this.flightsData = res.data
            this.dataList = this.flightsData.flights

        })
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>