<template>
  <div id="app">
    <div class="left logo">{{title}}</div>
    <el-row class="header" type="flex" align="middle">
      <el-col :span="20">
        <el-menu theme="dark" mode="horizontal" @select="sendSubMenus">
            <el-menu-item :index="menu.index" v-for="menu in menus">{{menu.title}}</el-menu-item>
        </el-menu>   
      </el-col>
      <el-col :span="4">
        <el-menu theme="dark" mode="horizontal" @select="jumpTo">
          <el-submenu index="my">
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
      <div class="sidebar left-bar">
        <el-menu mode="vertical" default-active="1" theme="dark" @select="send">
          <template v-for="sub in slider">
            <el-menu-item :index="sub.index">{{sub.title}}</el-menu-item>
          </template>
        </el-menu>
      </div>
      <el-col class="main">
        
        <div class="main-block">
          <div class="panel panel-warning">
            <div class="panel-header"><div class="panel-title">{{caption}}</div></div>
            <div class="panel-body">
              <component :mate="mate" 
                   v-bind:is="view">
              </component>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {
    Formor: function index (resolve) {
      require(['./components/Formor.vue'], resolve)
    },
    KTable: function index (resolve) {
      require(['./components/KTable.vue'], resolve)
    },
    KTreer: function index (resolve) {
      require(['./components/KTreer.vue'], resolve)
    }
  },
  data () {
    return {
      title: '',
      caption: '管理页面',
      menus: [],
      slider: [],
      view: '',
      mate: {}
    }
  },
  created: function () {
    this.$root.monitor = this.refesh
    var vm = this
    this.$nextTick(function () {
      // 获取管理页面框架信息[标题、菜单列表、管理员信息]
      this.$root.ajaxData(window.bench, {'path': 'hello.txt'}, function (data) {
        vm.title = data.title
        vm.menus = data.menus
        vm.slider = data.menus[0].subMenus
      })
    })
  },
  methods: {
    sendSubMenus: function (index) {
      this.slider = this.findFromMenusByIndex(this.menus, index).subMenus
    },
    jumpTo: function (index) {
      if (index === 'exit') {
        window.location.href = window.exitPath
      } else {
        // this.refesh()
      }
    },
    refesh: function (menu) {
      var vm = this
      this.$root.ajaxData(menu.url, {'path': menu.path}, function (data) {
        vm.mate = data.mate
        vm.view = data.view || data.currentView //兼容旧版
        vm.caption = data.title
      })
    },
    send: function (index) {
      this.refesh(this.findFromMenusByIndex(this.slider, index))
    },
    findFromMenusByIndex (menus, index) {
      let i = menus.findIndex(v => v.index === index)
      return menus[i]
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
  border: 0;
  margin: 0;
}

#app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
}

.header{
  background-color: #324057;
  color: #c0ccda;
  height: 80px;
  padding-left: 50px;
}

.logo{
  text-align: center;
  width: 230px;
  height: 80px;
  line-height: 78px;
  background-color: #e7604a;
  color: #e9e9e9;
}


.left-bar {
  width: 230px;
}
.main {
  margin-left:230px;
  padding-left:10px;
  width: calc(100% - 260px);
  
}
.left {
  float: left;
}
.sidebar {
    /**overflow-y: scroll;**/
    position: absolute;
    background: #2a3542;
    padding: 15px 0;
    display: block;
    bottom: 0;
    top:0;
}

.main-line {
  height: calc(100% - 80px);
  
}
.main-block {

    transition: .2s;
    margin-bottom: 24px;
    margin-top: 24px;
}


.panel {
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 0;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
}

.panel-primary {
    border-color: #10a0ea;
}

.panel-primary > .panel-header {
    color: #fff;
    background-color: #0e90d2;
    border-color: #10a0ea;
}

.panel-warning {
    border-color: #fbd0ae;
}

.panel-warning > .panel-header {
    color: #F37B1D;
    background-color: rgba(243,123,29,.15);
    border-color: #fbd0ae;
}

.panel-header {
    padding: .6rem 1.25rem;
    border-bottom: 1px solid transparent;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
}

.panel-title {
    margin: 0;
    font-size: 100%;
    color: inherit;
}

.panel-body {
    padding: 1.25rem;
}
</style>

