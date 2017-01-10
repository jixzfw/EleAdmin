<template>
	<component :mate="infomation.mate" 
        v-bind:is="infomation.currentView" 
          @refresh="getInfomation"
          @getData="getData" 
          @action="handleAction">
  </component>
</template>

<script>
export default {
  components: {
    Formor: function index(resolve) {
      require(['./Formor.vue'], resolve);
    },
    KTable: function index(resolve) {
      require(['./KTable.vue'], resolve);
    },
    KTreer: function index(resolve) {
      require(['./KTreer.vue'], resolve);
    }
  },
  data () {
    return {
      infomation : {
        title: "管理中心"
      }
    };
  },
  created: function () {
    this.getInfomation();
  },
  watch :{
  	'$route':function(){
  		this.getInfomation();
    }
  },
  methods:{
  	getInfomation:function(){
	  	let url = this.$route.query.url;
	  	this.$http.get(url).then((response) => {
	    		let data = JSON.parse(response.body);
	    		this.infomation = data;
          this.$emit('update',data.title);
	      }, (response) => {
	    });
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
      if(act.switch){
        act.url = act["urls"][row[act.switchKey]];
      }
      if(act.isApi){
        let id = row.id;
        console.log("api:"+act.url+";id:"+id);
        this.ajaxData(act.url,{id:id});
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
    //仅仅是ajax动作
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
    //仅仅是刷新数据
    getData(url,param={}){
      var vm = this;
      this.$http.post(url,param).then((response) => {
        let data = JSON.parse(response.body);
        if(data.status && Number(data.status) > 0){
          vm.infomation.mate.rows  = data.rows;
          vm.infomation.mate.total = data.total;
        }
      }, (response) => {
        //
      });
    }
  }
}
</script>

<style></style>