<template>
	<el-col :span="20" class="main">
	  <h1>{{infomation.title}}</h1>
	  <div class="main-block">
	  	<component :mate="infomation.mate" v-bind:is="infomation.currentView" v-on:refresh="refresh"></component>
	  </div>
	</el-col>
</template>

<script>

import Formor  from './Formor.vue'
import Tabler  from './Tabler.vue'

export default {
  components: {
    Formor,Tabler
  },
  data () {
    return {
      infomation : {
        title: "管理中心",

        form  : {},

        table : {}
      }
    }
  },
  created: function () {
    this.getInfomation();
  },
  watch :{
  	'$route':function(){
  		console.log("query");
  		this.getInfomation();
    }
  },
  methods:{
  	getInfomation:function(){
	  	let url = this.$route.query.url;
	  	this.$http.get(url).then((response) => {
	    		let data = JSON.parse(response.body);
	    		this.infomation = data;
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
	.main {
		margin-left:220px;
		margin-top: 20px;
	}
	.main-block {
	    border: 1px solid #eaeefb;
	    border-radius: 4px;
	    transition: .2s;
	    margin-bottom: 24px;
	}
	.main-block .search {
	    padding: 24px;
	    padding-bottom: 0;
	}
</style>