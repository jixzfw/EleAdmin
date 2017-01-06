<template>
	<div class="box">
		<el-row>
			<el-col :span="24">
				<btns :btns="mate.btns" :btnDisable="btnDisable" @btnClick="handleButton">
					<span slot="search"><slot name="search"></slot></span>
				</btns>
			</el-col>
		</el-row>
		<slot name="main"></slot>
	</div>
</template>

<script>
export default {
	components: {
		Btns : function index(resolve) {
			require(['./Btns.vue'], resolve);
		}
	},
	props: {
		mate:Object,
		btnDisable:Boolean
	},
	methods : {
		handleButton(btn){
			console.log(btn);
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