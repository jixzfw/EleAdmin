<template>
	<el-form  :model="mate.values" :inline="mate.inline" :rules="rules" ref="ruleForm" :label-width="labelWidth">
	  <template v-for="field of mate.fields">
	    <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'text'">
	      <el-input v-model="mate.values[field.name]" :placeholder="field.placeholder"></el-input>
	    </el-form-item>
	    <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'password'">
    		<el-input type="password" v-model="mate.values[field.name]" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'select'">
	      <el-select v-model="mate.values[field.name]" :placeholder="field.placeholder">
	        <el-option :label="item.label" :value="item.value" v-for="item of field.options"></el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item  :label="field.label" :prop="field.name" v-if="field.holder == 'date'">
	      <el-date-picker type="date" v-model="mate.values[field.name]" :placeholder="field.placeholder"></el-date-picker>
	    </el-form-item>
	    <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'time'">
	      <el-time-picker type="fixed-time" v-model="mate.values[field.name]" :placeholder="field.placeholder"></el-time-picker>
	    </el-form-item>
	    <el-form-item :label="field.label" v-if="field.holder == 'switch'">
	      <el-switch :on-text="field.on" :off-text="field.off" v-model="mate.values[field.name]"></el-switch>
	    </el-form-item>
	    <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'checkbox'">
	      <el-checkbox-group v-model="mate.values[field.name]">
	        <el-checkbox :label="item.label" :name="field.name" v-for="item of field.options"></el-checkbox>
	      </el-checkbox-group>
	    </el-form-item>
	    <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'radio'">
	      <el-radio-group v-model="mate.values[field.name]">
	        <el-radio :label="item.label" v-for="item of field.options"></el-radio>
	      </el-radio-group>
	    </el-form-item>
	    <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'textarea'">
	      <el-input type="textarea" v-model="mate.values[field.name]"></el-input>
	    </el-form-item>
	  </template>
	  <el-form-item>
			<el-button type="primary" @click="handleSubmit">提交</el-button>
			<el-button @click="handleReset" v-if="!mate.inline">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>

import Thelect from './Thelect.vue'

export default {
	data(){
		return {}
	},
	props: {
		mate : Object
  },
  components: {
    Thelect
  },
  computed: {
    // a computed getter
    labelWidth: function () {
    	if(this.mate.inline){
    		return undefined;
    	}else if(typeof(this.mate.labelWidth) == "undefined"){
    		return "100px";
    	}else{
    		return this.mate.labelWidth;
    	}
    },
    rules(){
    	var rs = {};
    	var vm = this;
    	var rules = this.mate.rules;
    	for (var index in rules) {
    		var r=[];
    		var rule = rules[index];
    		for (var i in rule) {
    			var nv = rule[i];
    			if(nv.validator){
    				nv.validator = vm[nv.validator];
    			}
    			r[i] = nv;
    		}   
    	 	rs[index] = r;
    	}
    	//console.log("caculate rules!");
    	//console.log(rs);
    	//this.mate.rules = rs;
    	return rs;
    }
  },
  methods: {
    handleReset() {
      this.$refs.ruleForm.resetFields();
    },
    handleSubmit(ev) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let url    = this.mate.url;
          let values = this.mate.values;
          if(this.mate.inline){
	    		  	this.$emit('ajax',null,values);
	    		}else{
			    	this.$http.post(url,values).then((response) => {
		    			this.$notify.info({
		    		    title: '消息',
		    		    message: '添加成功'
		    		  });
	    		  	console.log(response.body);
	    		  	let url = this.mate.jumpto;
	  					router.push({ query: { url: url }});
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
        } else {
	          this.$notify.error({
	    		  title: '消息',
	    		  message: '数据验证未通过'
    			});
          return false;
        }
      });
    },
    validatePassword(rule, value, callback){
    	//console.log(value);
    	//console.log(this.ruleForm);
      // if (value === '') {
      //   callback(new Error('请再次输入密码'));
      // } else 
      if (value !== this.mate.values[rule.name]) {
        callback(new Error(rule.message||'两次输入密码不一致!'));
      } else {
        callback();
      }
    },
    validateAsync(rule,value,callback){
      this.$http.get(
        rule.url,
        value
      ).then(function(data){
      	if(data.status){
      		callback(null);
      	}else{
      		callback(new Error(data.error||rule.message||"请修改"))
      	}
        
      },function(error){
        callback(new Error(error))
      });
    }
  }
}
</script>

<style>
.el-form-item {
	width:480px
}
.el-form--inline>* {
	margin-right:10px
}
.el-form--inline .el-form-item {
	width:200px;
  display: inline-block;
  margin-right: 10px;
  vertical-align: top;
}
</style>