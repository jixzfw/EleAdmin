<template>
	<component :mate="mate" v-bind:is="mate.view" @getData="getData" @action="handleAction"></component>
</template>

<script>
export default {
	components: {
		KTable : function index(resolve) {
			require(['./KTable.vue'], resolve);
		},
		KTreer : function index(resolve) {
			require(['./KTreer.vue'], resolve);
		}
	},
	props: {
		mate:Object,

	},
	methods : {
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
			if(act.switch){
				act.url = act["urls"][row[act.switchKey]];
			}
			if(act.isApi){
				let id = row.id;
				console.log("api:"+act.url+";id:"+id);
				this.ajaxData(act.url,{id:id});
				this.getData();
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
		ajaxData(url,param={}){
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
		getData(url,param){
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
		}
	}
}
</script>

<style>
</style>