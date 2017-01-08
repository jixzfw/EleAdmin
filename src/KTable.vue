<template>
	<Boxer :mate="mate" :hasSelected="hasSelected" @action="handleButton">
		<span slot="search" style="float:right"><Formor :mate="mate.search" v-if="mate.search" v-on:search="search"></Formor></span>
		<div slot="main">
			<el-row>
				<el-col :span="24">
					<el-table :data="mate.rows" border  @selection-change="handleSelectionChange" @sort-change="sortChange"  style="width: 100%">
							<el-table-column type="selection" width="50"></el-table-column>
							<el-table-column v-for="col of mate.columns" :label="col.label" :prop="col.name" :width="col.width" :sortable="col.sortable"></el-table-column>
							<el-table-column label="操作" width="300">
								<template scope="scope">
		        			<k-btn v-for="act of mate.actions" size="small" :act="act" :row="scope.row" @action="handleAction"></k-btn>
		      			</template>
							</el-table-column>
					</el-table>
				</el-col>
			</el-row>
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
	</Boxer>
</template>



<script>

import KBtn from './KBtn.vue';

export default {
	components: {
		KBtn,
    Boxer: function index(resolve) {
      require(['./Boxer.vue'], resolve);
    },
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
			hasSelected  : false,
			searchValues : {},
			page         : 0,
			sortValues   : {},
			action       : null
		}
	},
	watch: {
		multipleSelection: function (newSelection) {
			this.hasSelected = (newSelection.length != 0);
			//this.$emit('btnDisable',this.btnDisable);
		}
	},
	// 需要添加刷新消息
	methods : {
		handleButton(btn){
			let id = (btn.isApi)?{id:this.multipleSelection.map((row) => row.id)}:{};
			this.$emit('action',btn,id);
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getData();
		},
		handleAction(act,row) {
			this.$emit('action',act,row);
		},
		getData(){
			let url = this.mate.dataApi;
			
			let param = {
				search : this.searchValues,
				page   : this.page,
				sort   : this.sortValues
			};

			this.$emit('getData',url,param);
		},
		sortChange : function(sort){
			this.sortValues = {
				order  : sort.order,
				column : sort.prop
			};
			this.getData();
		},
		search(data){
			this.searchValues = data;
			this.page = 0;
			this.getData();
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
	.el-form--inline .el-form-item {
		margin-bottom: 0
	}
</style>