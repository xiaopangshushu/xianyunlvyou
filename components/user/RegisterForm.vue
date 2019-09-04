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
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        checkpassword: ""
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
        this.$alert('注册验证码是:000000','提示',{confirmButtonText:'确定'})
    },
    handleRegSubmit() {
      console.log(this.registerForm);
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