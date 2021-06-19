<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="left_box">
        <img src="../assets/beijing.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <div class="right_box">
        <img src="../assets/dl.png" alt="" />
        <h2>LOGIN</h2>
        <el-form
          :model="loginForm"
          :rules="loginFormRules"
          label-width="80px"
          ref="loginFormRef"
        >
          <!-- 用户名 -->
          <el-form-item label=" 账号 " prop="username">
            <el-input
              v-model="loginForm.username"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label=" 密码 " prop="password">
            <el-input
              v-model="loginForm.password"
              prefix-icon="el-icon-lock"
              type="password"
            ></el-input>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      // 这是表单的验证规则
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        //将登录成功之后的token，保存到客户端的sessionStrorage中
        //项目中出了登陆之外的其他api接口，必须在登录之后才可以访问
        //token只应该在当前网站打开期间生效，所以将token保存在sessionStroage中
        sessionStorage.setItem('token', res.data.token)
        //通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  /* background: #2b4b6b; */
  background: url('./../assets/back.jpg');
  height: 100%;
}
.login_box {
  width: 600px;
  height: 400px;
  padding: 40px;
  background: #fff;
  border-radius: 14px;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  .left_box {
    img {
      width: 300px;
      height: 400px;
      border-radius: 18px;
    }
  }
  .right_box {
    img {
      width: 180px;
    }
    h2 {
      position: absolute;
      top: 77px;
      right: 74px;
      font-size: 25px;
      font-weight: 600;
      color: #555;
      letter-spacing: 2px;
    }
  }
}
</style>

