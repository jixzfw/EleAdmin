<template>
  <el-menu theme="dark" default-active="1" mode="horizontal" @select="jumpTo">
    <el-submenu>
      <template slot="title">我的工作台</template>
      <el-menu-item index="password">修改密码</el-menu-item>
      <el-menu-item index="modify">修改资料</el-menu-item>
      <hr>
      <el-menu-item index="exit">退出登录</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>

export default {
  minix : [ 
    handler 
  ],
  data () {
    
  }
}
</script>
<style scoped>
</style>
