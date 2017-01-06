<template>
  <Boxer :mate="mate" :btnDisable="btnDisable" @action="handleButton">
    <div slot="main">
      <el-row>
        <el-col :span="24">
          <div class="rltv">
            <div class="title tree-head-first">标题</div>
            <el-row class="last">
              <el-col :span="6" class="title div-center">说明</el-col>
              <el-col :span="6" class="title div-center">其他</el-col>
              <el-col :span="12" class="title div-center">操作</el-col>
            </el-row>
          </div>
          <div>
            <el-tree :data="mate.rows"
              :props="defaultProps" 
              @node-click="handleNodeClick" 
              :render-content='renderContent'
              show-checkbox>
            </el-tree>
          </div>
        </el-col>
      </el-row>
    </div>
  </Boxer>
</template>
<script>
  export default {
    components: {
      Boxer: function index(resolve) {
        require(['./Boxer.vue'], resolve);
      }
    },
    props: {
      mate:Object
    },
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        btnDisable : true
      };
    },
    methods: {
      handleNodeClick(data) {
        var btn = currentButton;
        if(btn.switch){
            btn.url = btn["urls"][data[btn.switchKey]];
        }
        if(btn.action){
          this.$emit('action',btn,data);
          currentButton = {};
        }else{
          console.log("bangbang");
        }
      },
      renderContent: function(h, node) {
        //console.log(node);
        var vm = this;

        
        var domBtns   = [];
        //domBtns.push(h('span', node.data.label));

        for (var btn of this.mate.actions) {
          var action = btn.action;
          var disabled = btn.disable && node.data.status == 0;
          var label,btnType;
          if(btn.switch){
            label   = btn['label'][node['data'][btn.switchKey]];
            btnType = btn['type'][node['data'][btn.switchKey]];
          }else{
            label = btn.label;
            btnType = btn.type;
          }
          domBtns.push(h('el-button',{
              attrs: {
                size: 'small'
              },
              props: {
                type: btnType,
                btn : btn,
                disabled : disabled
              },
              on: {
                click: clickHandler.bind(btn)
              }
          },label));
          //domBtns
        }
        return h('span',[h('span', node.data.label),h('div',{class:{"line-row":true}},
          [h('el-row',[h('el-col',{props:{span:6}},"-"),h('el-col',{props:{span:6}},"-"),h('el-col',{props:{span:12},class:{"col-tree":true}},domBtns)])]
        )]);
      },
      handleButton(btn){
        this.$emit('action',btn);
      }
    }
  };

  var currentButton = {};

  function clickHandler()
  {
    //console.log(this);
    currentButton = this;
  }
</script>

<style>
  .el-tree-node__content {
    line-height: 52px;
    height: 52px;
    position: relative;
    
  }
  .line-btn {
    margin-left: 0;
    position   : absolute;
    top        : 10px
  }
  .title {
    border: 1px solid #e0e6ed;
    white-space: nowrap;
    overflow: hidden;
    background-color: #EFF2F7;
    text-align: center;
    height: 52px;
    min-width: 0;
    text-overflow: ellipsis;
    box-sizing: border-box;
    line-height: 52px;
    font-size: 14px;
    color: #1f2d3d;
  }
  .tree-head-first {
    width:30%;
    position:absolute;
    left:0;
    top:0;
  }
  .line-row{
    position:absolute;
    left:30%;
    top:0;
    width: 70%;
  }
  .last {
    margin-left:30%;
  }

  .rltv{
    position:relative
  }
  .col-tree{
    text-align: center;
  }

  .div-center{
    text-align: center;
  }

  .btnblock {
    padding: 30px 24px;
    overflow: hidden;
    border-bottom: 1px solid #eff2f6;
  }
</style>