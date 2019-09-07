<template>
    <div class="flight-item">
        <div>
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info">
                <el-col :span="6">
                    <!-- <span>东航 </span> MU5316 -->
                    <span>{{ data.airline_name }}</span> {{data.flight_no}}
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="space-between" class="flight-info-center">
                        <el-col :span="8" class="flight-airport">
                            <!-- <strong>20:30</strong> -->
                            <strong>{{data.dep_time}}</strong>
                            <!-- <span>白云机场T1</span> -->
                            <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-time">
                            <span>2时20分</span>
                        </el-col>
                        <el-col :span="8" class="flight-airport">
                            <!-- <strong>22:50</strong> -->
                            <strong>{{data.arr_time}}</strong>
                            <!-- <span>虹桥机场T2</span> -->
                            <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{data.base_price / 2}}</span>起
                </el-col>
            </el-row>
        </div>
        <div class="flight-recommend">
            <!-- 隐藏的座位信息列表 -->
            <el-row type="flex"  justify="space-between" align="middle">
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20">
                    <!-- 可能会有多种座位，所以要循环显示 -->
                    <el-row type="flex" 
                    justify="space-between" 
                    align="middle" 
                    class="flight-sell"
                    v-for="(item,index) in data.seat_infos"
                    :key="index">
                        <el-col :span="16" class="flight-sell-left">
                            <!-- <span>经济舱</span> | 上海一诺千金航空服务有限公司 -->
                            <span>{{item.name}}</span> | {{item.supplierName}}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{item.par_price}}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <el-button 
                            type="warning" 
                            size="mini">
                            选定
                            </el-button>
                            <p>剩余：{{item.discount}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    props: {
        // 数据
        //data 表示组件可以接收的属性
        data: {
            type: Object,  // 生命类型，默认是空数组  即就是 type:[]
            // 如果调用组件不传值，默认为default
            default: {}
        }
    },
    mounted(){
        console.log('-------------------------')
        console.log(this.data)
    }
    // 可以在这里发请求，但其实这是循环组件内部，这样并不好，应该在循环调用组件的页面中发请求
    // mounted(){
    //     this.$axios({
    //         url:'airs',
    //         // method:'get'
    //         params:this.$route.query
    //     })
    //     .then(res=>{
    //         console.log(res)

    //         // console.log(123123121213123131313)
    //         // console.log(this.$route.query)

    //     })
    // }
}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{
            
            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            } 

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>