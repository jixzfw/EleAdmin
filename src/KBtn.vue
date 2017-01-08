<template>
	<el-button :size="size" :disabled="btnDisable"
		:type="getSwitchValue('type')"
		@click="handleAction()" 
		:plain="plain">
		{{getSwitchValue('label')}}
	</el-button>
</template>


<script>
export default {
	props : {
		act : Object,
		row : {
			type:Object,
			default:function(){return {};}
		},
		hasSelected : {
      type:Boolean,
      default: false
    },
    plain : {
    	type:Boolean,
      default: false
    },
    size :{
    	type:String,
    	default:undefined
    }
	},
	computed : {
		btnDisable : function(){
				return (this.act.isSelector && !this.hasSelected) || (this.act.canDisable && this.row[this.act.disableKey]);
		}
	},
	// 需要添加刷新消息
	methods : {
		handleAction() {
			//console.log(this.act);
			//console.log(this.row);
			this.$emit('action',this.act,this.row);
		},
		getSwitchValue(key){
			if(this.act.switch){
				return this.act[key][this.row[this.act.switchKey]];
			}
			return this.act[key];
		}
	}
}
</script>

<style>
</style>