<template>
	<div class="search">
		<el-form  :model="mate.values" :rules="mate.rules" ref="ruleForm" label-width="100px">
		  <template v-for="field of mate.fields">
		    <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'text'">
		      <el-input v-model="mate.values[field.name]" :placeholder="field.placeholder"></el-input>
		    </el-form-item>
		    <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'select'">
		      <el-select v-model="mate.values[field.name]" :placeholder="field.placeholder">
		        <template v-for="item of field.options">
		          <el-option :label="item.label" :value="item.value"></el-option>
		        </template>
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
		        <template v-for="item of field.options">
		          <el-checkbox :label="item.label" :name="field.name"></el-checkbox>
		        </template>
		      </el-checkbox-group>
		    </el-form-item>
		    <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'radio'">
		      <el-radio-group v-model="mate.values[field.name]">
		        <template v-for="item of field.options">
		          <el-radio :label="item.label"></el-radio>
		        </template>
		      </el-radio-group>
		    </el-form-item>
		    <el-form-item :label="field.label" :prop="field.name" v-if="field.holder == 'textarea'">
		      <el-input type="textarea" v-model="mate.values[field.name]"></el-input>
		    </el-form-item>
		  </template>
		  <el-form-item>
				<el-button type="primary" @click="handleSubmit">提交</el-button>
				<el-button @click="handleReset">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>

import Thelect from './Thelect.vue'

export default {
	props: {
		mate : Object
  },
  components: {
    Thelect
  },
  methods: {
    handleReset() {
      this.$refs.ruleForm.resetFields();
    },
    handleSubmit(ev) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let url    = this.mate.addapi;
          let values = this.mate.values;
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
		    		  message: '添加动作失败'
		    		});
				  });
		        } else {
			          this.$notify.error({
			    		  title: '消息',
			    		  message: '数据验证未通过'
		    			});
		          return false;
		        }
		      });
    }
  }
}
</script>

<style>
.form-inline .el-input {
	width:150px
}
.form-inline>* {
	margin-right:10px
}
</style>