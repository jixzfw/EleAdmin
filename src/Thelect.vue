<template>
<div>
  <el-row><el-col :span="6">{{value}}</el-col></el-row>
  <el-row>
  	<el-col :span="6">
  		<el-select v-model="subs1">
  		  <el-option
  		    v-for="item in options"
  		    :label="item.label"
  		    :value="item.value">
  		  </el-option>
  		</el-select>
  	</el-col>
  	<el-col :span="6">
  		<el-select v-model="subs2">
  		  <el-option
  		    v-for="item in subs1"
  		    :label="item.label"
  		    :value="item.value">
  		  </el-option>
  		</el-select>
  	</el-col>
  	<el-col :span="6">
  		<el-select v-model="value">
  		  <el-option
  		    v-for="item in subs2"
  		    :label="item.label"
  		    :value="item.value">
  		  </el-option>
  		</el-select>
  	</el-col>
  </el-row>
</div>
</template>

<script>
  export default {
  	props: {
		  options:Array
  	},
    data() {
      return {
		    subs1 : [],
		    subs2 : [],
        value : ''
      }
    }
  }
</script>