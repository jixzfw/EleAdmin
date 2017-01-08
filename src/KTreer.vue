<template>
  <Boxer :mate="mate" :btnDisable="btnDisable" @action="handleButton">
    <div slot="main">
      <el-row>
        <el-col :span="24">
          <div class="rltv">
            <div class="title tree-head-first">标题</div>
            <el-row class="last">
              <el-col v-for="col of mate.columns" :span="col.span" class="title div-center">{{col.label}}</el-col>
              <el-col :span="12" class="title div-center">操作</el-col>
            </el-row>
          </div>
          <div>
            <el-tree :data="mate.rows"
              :props="defaultProps" 
              :render-content='renderContent'>
            </el-tree>
          </div>
        </el-col>
      </el-row>
    </div>
  </Boxer>
</template>

<script>

import KBtn from './KBtn.vue';

  export default {
    components: {
      KBtn,
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
      renderContent: function(h, node) {
        //console.log(node);
        var vm = this;
        
        var domBtns   = [];
        //domBtns.push(h('span', node.data.label));

        for (var btn of this.mate.actions) {
          // var action = btn.action;
          // var disabled = btn.disable && node.data[btn.disKey];
          // var label,btnType;
          // if(btn.switch){
          //   label   = btn['label'][node['data'][btn.switchKey]];
          //   btnType = btn['type'][node['data'][btn.switchKey]];
          // }else{
          //   label = btn.label;
          //   btnType = btn.type;
          // }
          domBtns.push(h(KBtn,{
              props: {
                act : btn,
                row : node.data,
                size: "small"
              },
              on: {
                action: vm.handleButton
              }
          }));
          //domBtns
        }

        var cols = this.mate.columns.map((col)=>{
        	var value = "--";
        	if(node.data[col.name] && node.data[col.name]!=""){
        		value = node.data[col.name];
        	}
        	return h('el-col',{props:{span:col.span},class:{"col-tree":true}},value);
        });

        cols.push(h('el-col',{props:{span:12},class:{"col-tree":true}},domBtns));

        return h('span',[h('span', node.data.label),h('div',{class:{"line-row":true}},cols)]);
        
      },
      handleButton(btn,row){
        this.$emit('action',btn,row);
      }
    }
  };
</script>

<style>
  .el-tree-node__content {
    line-height: 40px;
    height: 40px;
    position: relative;
    border-bottom: 1px solid #e0e6ed;
    
  }
  .line-btn {
    margin-left: 0;
    position   : absolute;
    top        : 10px
  }
  .title {
    border-bottom: 1px solid #e0e6ed;
    border-right : 1px solid #e0e6ed; 
    white-space: nowrap;
    overflow: hidden;
    background-color: #EFF2F7;
    text-align: center;
    height: 40px;
    line-height: 40px;
    min-width: 0;
    text-overflow: ellipsis;
    box-sizing: border-box;
    
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