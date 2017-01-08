<template>
	<div class="box">
		<el-row>
			<el-col :span="24">
				<div class="btnblock">
    			<k-btn v-for="btn of mate.btns" :act="btn" :hasSelected="hasSelected" :plain="true" @action="handleButton"></k-btn>
    			<slot name="search"></slot>
  			</div>
			</el-col>
		</el-row>
		<slot name="main"></slot>
	</div>
</template>

<script>
export default {
	components: {
		KBtn : function index(resolve) {
			require(['./KBtn.vue'], resolve);
		}
	},
	props: {
		mate:Object,
		hasSelected:Boolean
	},
	methods : {
		handleButton(btn){
			this.$emit('action',btn);
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
</style>