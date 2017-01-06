<template>
	 <component :mate="infomation.mate" v-bind:is="infomation.currentView" v-on:refresh="refresh"></component>
</template>

<script>

export default {
  components: {
    Formor: function index(resolve) {
      require(['./Formor.vue'], resolve);
    },
    Tabler: function index(resolve) {
      require(['./Tabler.vue'], resolve);
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
          data.mate.view = data.currentView;
          if(data.currentView == "Treer"){
            data.currentView = "Tabler";
            data.mate.view = "KTreer";
          }else {
            if(data.currentView == "Tabler"){
              data.mate.view = "KTable";
            }
          }
          
	    		this.infomation = data;
          
          this.$emit('update',data.title);
	      }, (response) => {
	    	    // error callback
	    });
  	},
  	refresh:function(){
  		this.getInfomation();
  	}
  }
}
</script>

<style>
	
</style>