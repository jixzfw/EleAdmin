<template>
  <div class="btnblock">
    <el-button  v-for="btn of btns" :plain="true" :type="btn.type" @click="handleAction(btn)" :disabled="btn.disabled && btnDisable">{{btn.label}}</el-button>
    <slot name="search"></slot>
  </div>
</template>

<script>
export default {
  props: {
    btns:Array,
    btnDisable:{
      type:Boolean,
      default: true
    }
  },
  // 需要添加刷新消息
  methods : {
    handleAction(btn) {
      this.$emit('btnClick',btn);
    }
  }
}
</script>

<style>
  .btnblock {
    padding: 30px 24px;
    overflow: hidden;
    border-bottom: 1px solid #eff2f6;
  }
</style>