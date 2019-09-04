<template>
  <el-form :model="loginForm" ref="loginform" :rules="rules" class="loginform">
    <el-form-item class="form-item" prop="username">
      <el-input  placeholder="请输入用户名/手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input  placeholder="请输入密码" type="password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules:{
          username:[
              {required:true, message:'请输入用户名', trigger:'blur'}
          ],
          password:[
              { required: true, message: '请输入密码', trigger: 'blur' }
          ]
      }
    };
  },
  methods:{
    //   目前先不做错误判断，等后面用拦截器统一做错误判断
      handleLoginSubmit(){
          this.$ref.loginform.validate((valid)=>{
          if(valid){
              console.log(this.loginForm)
            //   设置，存储token值  嗯，用到了vuex

            //请求登录接口
            this.$axios({
              url:"/accounts/login",
              method:'post',
              data:this.form
            })
            .then(res=>{
              console.log(res) // 其实可以不用打印的，因为数据本身就是表单中的

            })
          }else{
            console.log('验证失败')
          }
          })
      }
  }
};
</script>
<style lang="less" scoped>
.form{
    padding: 25px;
}
.form-item{
    margin-bottom:20px;
}
.form-text{
    font-size: 12px;
    color:#409EFF;
    text-align: right;
    line-height: 1;
}
.submit{
    width: 100%;
    margin-top: 10px;
}
</style>