<template lang="html">
    <div ref="editor" id="editor"></div>
</template>

<script>
/* eslint-disable */
 import UE from '../../static/ueditor/ueditor.js'
/* eslint-disable */
// import '../../static/ueditor/ueditor.all.js'
/* eslint-disable */
// import '../../static/ueditor/lang/zh-cn/zh-cn.js'

//import UE from 'ueditor'

export default {
  props: {
    value: {
      type: String,
      default: null
    },
    config: {
      type: Object,
      default: function () {return {}}
    }
  },
  watch: {
    value: function value(val, oldVal) {
      // this.editor = UE.getEditor("editor", this.config);
      if (this.editor && val !== null) {
        this.editor.setContent(val)
      }
    }
  },
  mounted() {
    this.$nextTick(function f1() {
      // 保证 this.$el 已经插入文档
      this.editor = UE.getEditor("editor", this.config)
      window.VueEditor = this
      window.VueEditor.editor.ready(function f2 () {
        window.VueEditor.editor.setContent(window.VueEditor.value);
        window.VueEditor.editor.addListener("contentChange", function () {
          // const wordCount = this.editor.getContentLength(true);
          const content = window.VueEditor.editor.getContent()
          // const plainTxt = this.editor.getPlainTxt();
          // this.$emit('input', { wordCount: wordCount, content: content, plainTxt: plainTxt });
          window.VueEditor.$emit('input', content)
        })
        // this.$emit('ready', this.editor)
      })
    })
  },
  beforeDestroy(){
  	// delete window.VueEditor
  }
}
</script>

<style lang="css" scoped>
  #editor{
      height: 458px;
      margin: 0 22px 22px 22px;
  }
  /*.wangEditor-container{
      border-radius: 2px;
      overflow: hidden;
      border: 1px solid #CCC;
      margin: 0 22px 22px 22px;
  }
  .wangEditor-box{
      margin: 0 22px 22px 22px;
  }*/
</style>
