<template>
  <el-container class="height">

    <el-aside :width="sideWidth + 'px'" class="shadow">
      <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow"/>
    </el-aside>

    <el-container>
      <el-header class="fold">
        <Header :collapseBtnClass="collapseBtnClass" @asideCollapse="collapse" :user="user"/>
      </el-header>

      <el-main>
        <!-- 表示当前页面的子路由会在 <router-view /> 里面展示-->
        <router-view @refreshUser="getUser"/>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>

import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
  name: 'Home',
  data() {
    return {
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      user: {}
    }
  },
  components: {
    Aside,
    Header
  },
  mounted() {
    // 从后台获取最新的User数据
    this.getUser()
  },
  methods: {

    // 点击收缩按钮触发
    collapse() {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {  // 收缩
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      } else {   // 展开
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    },

    //获取管理员信息
    getUser() {
      let username = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : ""
      if (username) {
        // 从后台获取User数据
        this.request.get("/user/username/" + username).then(res => {
          // 重新赋值后台的最新User数据
          this.user = res.data
        })
      }
    }
  }
}
</script>

<style scoped>
.height {
  min-height: 100vh;
}

.shadow {
  box-shadow: 2px 0 6px rgb(0 21 41);
}

.fold {
  border-bottom: 1px solid #ccc;
}

</style>