<template>
  <Boxer :mate="mate" :hasSelected="hasSelected" @action="handleButton" ref="Boxer">
    <span slot="search" class="search"><Formor :mate="mate.search" v-if="mate.search" v-on:search="search"></Formor></span>
    <div slot="main">
      <el-row>
        <el-col :span="24">
          <el-table ref="table" :data="mate.rows" border  @selection-change="handleSelectionChange" @sort-change="sortChange"  style="width: 100%" >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column v-for="col of mate.columns" :label="col.label" :prop="col.name" :width="col.width" :sortable="col.sortable"></el-table-column>
              </el-table-column>
              <el-table-column label="操作" :width="actionWidth" v-if="mate.actions">
                <template scope="scope">
                  <k-btn v-for="act of mate.actions" size="small" :act="act" :row="scope.row" @action="handleAction"></k-btn>
                </template>
              </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" class="page"  v-if="mate.size > 0">
      <el-col :span="12">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="mate.page"
            layout="total,prev, pager, next"
            :total="mate.total"
            :page-size ="mate.size">
        </el-pagination>
      </el-col>
      </el-row>
    </div>
  </Boxer>
</template>



<script>

import KBtn from './KBtn.vue'
import Boxer from './Boxer.vue'

export default {
  components: {
    KBtn,
    Boxer,
    Formor: function index (resolve) {
      require(['./Formor.vue'], resolve)
    }
  },
  props: {
    mate: Object
  },
  data () {
    return {
      multipleSelection: [],
      hasSelected: false,
      searchValues: {},
      page: 0,
      sortValues: {},
      action: null
    }
  },
  watch: {
    multipleSelection: function (newSelection) {
      this.hasSelected = (newSelection.length !== 0)
      // this.$emit('btnDisable',this.btnDisable);
    },
    mate: function (newMate) {
      this.$nextTick(function () {
        this.rowSelect()
      })
    }
  },
  computed: {
    actionWidth: function () {
      return this.mate.actions.length * 60 + 30
    }
  },
  mounted () {
    // console.log("mounted");
    this.rowSelect()
  },
  beforeUpdate () {
  },
  // 需要添加刷新消息
  methods: {
    handleButton (btn) {
      let row = (btn.isApi || btn.ajax) ? {id: this.multipleSelection.map((r) => r.id)} : {}
      this.$root.handleAction(btn, row)
    },
    rowSelect () {
      this.mate.rows.forEach(row => {
        /* eslint-disable */
        let select = (row.id && this.mate.selected && this.mate.selected.findIndex(id => id == row.id) !== -1)
        /* eslint-enable */
        this.$refs.table.toggleRowSelection(row, (select === true))
      })
      // this.mate.selected = [];
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCurrentChange (val) {
      console.log('翻页动作')
      this.page = val
      this.getData()
    },
    handleAction (act, row) {
      var vm = this
      this.$root.action(act, row, function () {
        vm.getData()
      })
    },
    getData () {
      // console.log(this.mate.dataApi);
      let url = this.mate.dataApi
      let param = {
        search: this.searchValues,
        page: this.page,
        sort: this.sortValues
      }
      var vm = this
      this.$root.ajaxData(url, param, function (data) {
        vm.updateData(data)
      })
    },
    updateData (data) {
      if (data.rows) {
        this.mate.rows = data.rows
      }
      if (data.total) {
        this.mate.total = data.total
      }
      if (data.selected) {
        this.mate.selected = data.selected
      }
      this.$nextTick(function () {
        this.rowSelect()
      })
    },
    sortChange: function (sort) {
      if (!sort || !sort.column || !sort.column.sortable) {
        return
      }
      this.sortValues = {
        order: sort.order,
        column: sort.prop
      }
      console.log('排序动作')
      this.getData()
    },
    search (data) {
      this.searchValues = data
      this.page = 0
      console.log('查询动作')
      this.getData()
    },
    formatter (field) {
      return function (row, col) {
        if (field.switch) {
          return field.switch[row[col.property]]
        }
        return row[col.property]
      }
    },
    getEtagStyle (v) {
      if (v) {
        return 'success'
      }
      return 'gray'
    }
  }
}
</script>

<style>
  .page {
    margin-top: 20px;
  }

  .main-block .search {
      display: inline-block;
      margin-left: 30px;
      margin-top: -13px;
  }
  .el-form--inline .el-form-item {
    margin-bottom: 0
  }
</style>
