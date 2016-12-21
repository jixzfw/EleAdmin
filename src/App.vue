<template>
  <div id="app">
    <el-row class="header" type="flex" align="middle">
      <el-col :span="3" class="logo">{{title}}</el-col>
      <el-col :span="18">
        <el-menu theme="dark" default-active="1"  mode="horizontal" @select="sendSubMenus">
          <template v-for="menu in menus">
            <el-menu-item :index="menu.index" >{{menu.title}}</el-menu-item>
          </template>
        </el-menu>
      </el-col>
      <el-col :span="3">
        <el-menu theme="dark" default-active="1"  mode="horizontal" @select="jumpTo">
          <el-submenu index="1">
            <template slot="title">我的工作台</template>
            <el-menu-item index="password">修改密码</el-menu-item>
            <el-menu-item index="modify">修改资料</el-menu-item>
            <hr>
            <el-menu-item index="exit">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
    <el-row class="main-line">
      <el-col :span="3" class="sidebar">
        <el-menu mode="vertical" default-active="1" theme="dark" :router="true">
          <template v-for="sub in slider">
            <el-menu-item :index="sub.index" :route="{path: sub.index,query:{url:sub.url}}">{{sub.title}}</el-menu-item>
          </template>
        </el-menu>
      </el-col>
      <router-view></router-view>
    </el-row>
  </div>
</template>

<script>


export default {
  data () {
    return {
      title:'',
      menus  : [],
      slider : []
    }
  },
  components: {
  },
  created: function () {
    //获取管理页面框架信息[标题、菜单列表、管理员信息]
    this.$http.get(window.bench).then((response) => {
    	var data = JSON.parse(response.body);
    	this.title = data.title;
    	this.menus = data.menus;
    	this.slider =  this.menus[0].submenus;
      }, (response) => {
        //TODO 错误处理
    });
  },
  methods : {
  	sendSubMenus: function (index,path){
  		this.slider =  this.menus[index-1].submenus;
  	},
    jumpTo: function (index,path){
      if(index == "exit"){
        window.location.href = window.exitPath;
      }else{
        var url = window.jsonPath+index;
        router.push({ path: index, query: { url: url }})
      }
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
.header{
  background-color: #324057;
  color: #c0ccda;
}
.logo{
  text-align: center;
}
.sidebar {
	border-top: thick solid #00ff00;
    width: 210px;
    height: 100%;
    overflow-y: scroll;
    position: fixed;
    background: #2a3542;
    padding: 15px 0;
    display: block;
}
.main {
	margin-left:220px;
	margin-top: 20px;
}
.main-block {
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    margin-bottom: 24px;
}
.main-block .search {
    padding: 24px;
    padding-bottom: 0;
}
.main-block .box {
    background-color: #f9fafc;
    border-top: 1px solid #eaeefb;
    clear: both;
    overflow: hidden;
    transition: height .2s;
}
.page {
	margin-top: 20px;
}
</style>
