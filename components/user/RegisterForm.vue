<template>
  <el-form :model="registerForm" ref="registerForm" :rules="rules" class="registerForm">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="registerForm.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="registerForm.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="registerForm.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="registerForm.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkpassword">
      <el-input placeholder="确认密码" type="password" v-model="registerForm.checkpassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>
<script>
export default {
  data() {
        // rule当前的规则，目前是空的
        // value输入框的值
        // callback是回调函数，必须要调用
    //    var validatePass2 = (rule, value, callback) => {
    const checkpassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "", // 用户名，也就是手机号那栏
        nickname: "", // 名字
        captcha: "",  //验证码
        password: "", // 密码
        checkpassword: ""  // 确认密码栏
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入你的名字", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkpassword: [{ validator: checkpassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSendCaptcha() {
        //弹框，显示 默认的验证码 000000 
        // this.$alert('注册验证码是:000000','提示',{confirmButtonText:'确定'})

        //发送验证码之前，要先判断手机号是否已输入
        // 手机号，其实就是username里面的内容
        if(!this.registerForm.username){
            this.$message({
                type:'error',
                message:'请先输入手机号'
            })
            return;
        }
        //发送请求，获取验证码，可以看文档接口
        this.$axios({
            url:'/captchas',
            method:'post',
            data:{
                tel:this.registerForm.username
            }
        })
        .then(res=>{
            console.log(res)
            //解构出返回值里面的code，即验证码
            const {code} = res.data
            this.$alert(`验证码是：${code}`,'提示',{confirmButtonText:'确定'})
        })
    },
    handleRegSubmit() {
      console.log(this.registerForm)
      this.$refs.registerForm.validate(valid=>{
          if(valid){
              //可以一项一项的从对象中赋值，也可以使用es6的 ... 从对象中结构出来不需要的 checkpassword ，剩下的就是我们需要的
              //一般来说，尽量不要往后台多穿参数，多传值，所以，最好把接口文档中不需要的值拿掉再传
              const {checkpassword,...restData} = this.registerForm
              // 发送请求，实现注册
              this.$axios({
                  url:'/accounts/register',
                  method:'post',
                  data:restData
              })
              .then(res=>{
                  console.log('-----------------------------------')
                  console.log(res)
                   console.log('************************************')
                   // 注册成功后帮用户自动登录
                  // commit接受两个参数，第一个mutations参数是方法名，第二个参数数据
                this.$store.commit('user/setUserInfo',res.data) // 因为state中的存储就是这样的
              })
          }
      })

    }
  }
};
</script>
<style lang="less" scoped>
.registerForm{
    padding: 25px;
}
.form-item{
        margin-bottom:20px;
    }
    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }
    .submit{
        width:100%;
        margin-top:10px;
    }
</style>