<template>
  <div class="box">
    <el-row>
      <div class="btnblock">
        <el-col :span="2" v-for="btn of mate.btns">
          <el-button v-if="btn.disabled" :plain="true" :type="btn.type" @click="handleAction(btn)" :disabled="btnDisable">{{btn.label}}</el-button>
          <el-button v-else :plain="true" :type="btn.type" @click="handleAction(btn)">{{btn.label}}</el-button>
        </el-col>
        <el-col :span="18"><Formor :mate="mate.search" v-if="mate.search" v-on:ajax="ajaxDate"></Formor></el-col>
      </div>
    </el-row>
    <el-row><el-col :span="24">
      <el-table :data="mate.rows" border  @selection-change="handleSelectionChange" @sort-change="sortChange">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column v-for="col of mate.columns" :label="col.label" :prop="col.name" :width="col.width" :sortable="col.sortable"></el-table-column>
          <el-table-column :context="_self" inline-template label="操作" width="300">
            <div>
              <el-button v-for="act of mate.actions"
                size="small"
                :type="act.type"
                @click="handleAction(act,row)">
                {{act.label}}
              </el-button>
            </div>
          </el-table-column>
      </el-table>
    </el-col></el-row>
    <el-row type="flex" justify="center" class="page">
      <el-col :span="12">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="mate.page"
            layout="total,prev, pager, next"
            :total="mate.total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {
    Formor: function index(resolve) {
      require(['./Formor.vue'], resolve);
    }
  },
	props: {
		mate:Object
  },
  data() {
    return {
      multipleSelection: [],
      btnDisable:true,
      btnAction:"run"
    }
  },
  watch: {
    multipleSelection: function (newSelection) {
    	this.btnDisable = (newSelection.length == 0);
    }
  },
  // 需要添加刷新消息
  methods : {
  	handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(val) {
      let url = this.mate.dataApi+"/page/"+val;
      this.ajaxDate(url);
    },
    handleAction(act,row={}) {
      var vm = this;
      if(act.confirm){
        this.handleConfirm(act.confirm,function(){
          vm.action(act,row);
        });
      }else{
        this.action(act,row);
      }
    },
    action(act,row){
      if(act.isApi){
        let id = (act.useId === 0)?row.id:this.multipleSelection.map((row) => row.id);
        console.log("api:"+act.url+";id:"+id);
        this.ajaxDate(act.url,{id:id});
      }else if(act.useId === -1){
        let url = act.url;
        console.log("jumpto"+url);
        router.push({ query: { url: url }});
      }else{
        let url = act.url+"/id/"+row.id;
        console.log("jumpto"+url);
        router.push({ query: { url: url,id:row.id }});
      }
    },
    handleConfirm(config,func){
    	this.$confirm(config.msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(func).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    ajaxDate(url,param={}){
      if(url == null){
        url = this.mate.dataApi;
      }
    	this.$http.post(url,param).then((response) => {
  			this.$notify.info({
  		    title: '消息',
  		    message: '操作完成'
  		  });
        let data = JSON.parse(response.body);
        this.rows = data.rows;
		    // get status
		    //response.status;
		    // get status text
		    //response.statusText;
		    // get 'Expires' header
		    //response.headers.get('Expires');
		    // set data on vm
		    //this.$set('someData', response.body);
		  }, (response) => {
		    this.$notify.error({
    		  title: '消息',
    		  message: '刷新数据失败'
    		});
		  });
    },
    sortChange : function(sort){
      console.log(sort.column.label);
      console.log(sort.prop);
      this.ajaxDate(null,{
        column : sort.column.lable,
        order  : sort.order,
        prop   : sort.prop
      })
      
    }

  }
}
</script>

<style>
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

  .btnblock {
    padding: 30px 24px;
    overflow: hidden;
    border-bottom: 1px solid #eff2f6;
  }

  .main-block .search {
      padding: 24px;
      padding-bottom: 0;
  }
</style>