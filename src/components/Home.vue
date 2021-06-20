<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/star.png" alt="" />
        <span>安心购后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">
          <i class="el-icon-s-fold"></i>
        </div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="rgb(241, 243, 244)"
          text-color="rgb(102, 106, 109)"
          active-text-color="#409BFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+subItem.path + ''"
              v-for="subItem in item.children"
              :key="subItem.id" 
              @click="saveNavState('/'+subItem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //左侧菜单数据
      menulist: [],
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao',
      },
      //是否折叠
      isCollapse: false,
      //被激活的链接地址
      activePath:""
    }
  },
  created() {
    this.getMenuList()
    this.activePath = sessionStorage.getItem('activePath')
    
  },
  methods: {
    logout() {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    //获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
    },
    //点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath){
      sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    }
  },
}
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
}
.el-header {
  color: #333;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 10px;
  padding-left: 0;
  align-items: center;
  background: rgb(231, 234, 237);
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 20px;
    }
  }
  img {
    height: 60px;
  }
  border-bottom: 1px solid #dcdfe6;
}
.el-aside {
  background: rgb(241, 243, 244);
  .el-menu {
    border-right: none;
  }
  
}
.el-main {
  background: #fff;
}
.iconfont {
  margin-right: 12px;
}
.toggle-button {
  .el-icon-s-fold {
    display: block;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    color: #555;
  }
}
</style>