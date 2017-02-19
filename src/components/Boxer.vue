<template>
  <div class="box">
    <el-row>
      <el-col :span="24">
        <div class="btnblock">
          <div class="left"><k-btn v-for="btn of mate.btns" :act="btn" :hasSelected="hasSelected" :plain="true" @action="handleButton"></k-btn></div>
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
    KBtn: function index (resolve) {
      require(['./KBtn.vue'], resolve)
    }
  },
  props: {
    mate: Object,
    hasSelected: Boolean
  },
  methods: {
    handleButton (btn) {
      this.$emit('action', btn)
    }
  }
}
</script>

<style>
  .main-block .box {
      
      
      clear: both;
      overflow: hidden;
      transition: height .2s;
  }

  .btnblock {
    padding: 13px 24px 10px 0px;
    overflow: hidden;
    border-bottom: 1px solid #eff2f6;
    height: 49px;
  }

  .left{
    float: left;
  }
</style>
