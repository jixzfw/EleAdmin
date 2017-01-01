<template>
	<div class="box">
		<el-row>
			<div class="btnblock">
				<el-col :span="2" v-for="btn of mate.btns">
					<el-button v-if="btn.disabled" :plain="true" :type="btn.type" @click="handleAction(btn)" :disabled="btnDisable">{{btn.label}}</el-button>
					<el-button v-else :plain="true" :type="btn.type" @click="handleAction(btn)">{{btn.label}}</el-button>
				</el-col>
				<el-col :span="18"><Formor :mate="mate.search" v-if="mate.search" v-on:search="search"></Formor></el-col>
			</div>
		</el-row>
		<el-row><el-col :span="24">
			<el-table :data="mate.rows" border  @selection-change="handleSelectionChange" @sort-change="sortChange" style="width: 100%">
					<el-table-column type="selection" width="50"></el-table-column>
					<el-table-column v-for="col of mate.columns" :label="col.label" :prop="col.name" :width="col.width" :sortable="col.sortable"></el-table-column>
					<el-table-column label="操作" width="300">
						<template scope="scope">
        			<el-button v-for="act of mate.actions"
        				size="small"
        				:type="act.type"
        				@click="handleAction(act,scope.row)">
        				{{act.label}}
        			</el-button>
      			</template>
					</el-table-column>
			</el-table>
		</el-col></el-row>
		<el-row type="flex" justify="center" class="page">
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
			btnAction:"run",
			searchValues : {},
			page         : 0,
			sortValues   : {}
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
			this.page = val;
			this.getDate();
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
				this.getDate();
			}else if(act.useId === -1){
				let url = act.url;
				console.log("jumpto:"+url);
				router.push({ query: { url: url }});
			}else{
				let url = act.url+"/id/"+row.id;
				console.log("jumpto:"+url);
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
		ajaxDate(url=null,param={}){
			if(url === null){
				url = this.mate.dataApi;
			}

			var vm = this;
			this.$http.post(url,param).then((response) => {
				let data = JSON.parse(response.body);

				if(data.status && Number(data.status) < 0){
					this.$notify.warning({
						title: '注意',
						message: status.message||'操作失败'
					});
				}else{
					this.$notify.info({
						title: '消息',
						message: status.message||'操作完成'
					});
				}
			}, (response) => {
				this.$notify.error({
					title: '消息',
					message: '刷新数据失败'
				});
			});

		},
		getDate(){
			let url = this.mate.dataApi;
			
			let param = {
				search : this.searchValues,
				page   : this.page,
				sort   : this.sortValues
			};

			var vm = this;
			this.$http.post(url,param).then((response) => {
				let data = JSON.parse(response.body);

				if(data.status && Number(data.status) > 0){
					vm.mate.rows  = data.rows;
					vm.mate.total = data.total;
				}
			}, (response) => {
				//
			});

		},
		sortChange : function(sort){
			//console.log(sort.column.id);
			this.sortValues = {
				//column : sort.column.lable,
				order  : sort.order,
				column : sort.prop
			};
			this.getDate();
		},
		search(data){
			this.searchValues = data;
			this.page = 0;
			this.getDate();
			//this.searchValues = {};
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