<template>
  <div class="box">
    <el-row>
      <div class="block">
        <el-col :span="2" v-for="btn of mate.btns">
          <el-button v-if="btn.disabled" :plain="true" :type="btn.type" @click="handleAction(btn)" :disabled="btnDisable">{{btn.label}}</el-button>
          <el-button v-else :plain="true" :type="btn.type" @click="handleAction(btn)">{{btn.label}}</el-button>
        </el-col>
      </div>
    </el-row>
    <el-row><el-col :span="24">
      <el-table :data="mate.rows" border  @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column v-for="col of mate.columns" :label="col.label" :prop="col.name" :width="col.width"></el-table-column>
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
      router.push({ query: { url: url }});
    },
    handleAction(act,row={}) {
      if(act.isApi){
        let id = (act.useId === 0)?row.id:this.multipleSelection.map((row) => row.id);
        console.log("api:"+act.url+";id:"+id);
        //this.postOption(id,this.mate.delApi);
      }else if(act.useId === -1){
        let url = act.url;
        console.log("jumpto"+url);
        //router.push({ query: { url: url }});
      }else{
        let url = act.url+"/id/"+row.id;
        console.log("jumpto"+url);
        //router.push({ query: { url: url }});
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
    
   //  optionDelete(id){
   //  	this.handleConfirm({
   //    	msg:'此操作将永久删除该条数据, 是否继续?'
   //    },() => {
   //    	//发送删除信号
			// 	this.postOption(id,this.mate.delApi);
   //    });
   //  },
   //  optionDisable(id){
			// this.postOption(id,this.mate.disableApi);
   //  },
    postOption(id,url){
    	this.$http.post(url, {id: id}).then((response) => {
    			this.$notify.info({
    		    title: '消息',
    		    message: '操作完成'
    		  });
    		  this.$emit('refresh');
    		  console.log(response.body);
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
    		  message: '操作失败'
    		});
		  });
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

  .block {
    padding: 30px 24px;
    overflow: hidden;
    border-bottom: 1px solid #eff2f6;
  }
</style>