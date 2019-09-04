<template>
    <el-form 
        :model="RegisterForm" 
        ref="RegisterForm" 
        :rules="rules" 
        class="RegisterForm">
            <el-form-item class="form-item">
                <el-input 
                placeholder="用户名手机">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item">
                <el-input 
                placeholder="验证码" >
                    <template slot="append">
                        <el-button >
                            @click="handleSendCaptcha"
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item">
                <el-input 
                placeholder="你的名字">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item">
                <el-input 
                placeholder="密码" 
                type="password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item">
                <el-input 
                placeholder="确认密码" 
                type="password">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            >
            @click="handleRegSubmit"
                注册
            </el-button>
        </el-form>
</template>
<script>
export default {
    data(){
        return{
            RegisterForm:{
                
            }
        }
    }
}
</script>
<style lang="less" scoped>

</style>