<template>
  <Boxer :mate="mate" :btnDisable="btnDisable" @action="handleButton">
    <div slot="main">
      <el-row>
        <el-col :span="24">
          <div class="rltv">
            <div class="title tree-head-first">标题</div>
            <el-row class="last">
              <el-col v-for="col of mate.columns" :span="col.span" class="title div-center">{{col.label}}</el-col>
              <el-col :span="actionSpan" class="title div-center">操作</el-col>
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
import KBtn from './KBtn.vue'
export default {
  components: {
    KBtn,
    Boxer: function index (resolve) {
      require(['./Boxer.vue'], resolve)
    }
  },
  props: {
    mate: Object
  },
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      btnDisable: true,
      actionSpan: 8
    }
  },
  methods: {
    renderContent: function (h, node) {
      var vm = this
      var domBtns = []
      for (var btn of this.mate.actions) {
        domBtns.push(h(KBtn, {
          props: {
            act: btn,
            row: node.data,
            size: 'small'
          },
          on: {
            action: vm.handleButton
          }
        }))
      }
      var sum = 0
      var colSpan
      var cols = this.mate.columns.map((col) => {
        var value = '--'
        if (node.data[col.name] && node.data[col.name] !== '') {
          value = node.data[col.name]
        }
        colSpan = Number(col.span)
        if (colSpan <= 0) colSpan = 3
        sum = sum + colSpan
        return h('el-col', {props: {span: colSpan}, class: {'col-tree': true}}, value)
      })
      sum = 24 - sum

      cols.push(h('el-col', {props: {span: sum}, class: {'col-tree': true}}, domBtns))
      vm.actionSpan = sum

      return h('span', [h('span', node.data.label), h('div', {class: {'line-row': true}}, cols)])
    },
    getData () {
      this.$root.ajaxData(this.mate.dataApi)
    },
    handleButton (btn, row) {
      var vm = this
      this.$root.action(btn, row, function () {
        vm.getData()
      })
    }
  }
}
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
    position:relative;
    border: 1px solid #dfe6ec;
    border-bottom: 0;
  }
  .col-tree{
    text-align: center;
  }

  .div-center{
    text-align: center;
  }
</style>
