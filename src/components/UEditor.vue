<template lang="html">
    <div ref="editor" id="editor"></div>
</template>

<script>
window.UEDITOR_HOME_URL = "/statics/ueditor/";
/* eslint-disable */
import '../statics/ueditor/ueditor.config.js';
import '../statics/ueditor/ueditor.all.js';
import '../statics/ueditor/lang/zh-cn/zh-cn.js';

//import UE from 'ueditor'

export default {
  props: {
    value: {
      type: String,
      default: null,
    },
    config: {
      type: Object,
      default: function(){ return {};},
    }
  },
  watch: {
    value: function value(val, oldVal) {
      this.editor = UE.getEditor("editor", this.config);
      if (val !== null) {
        this.editor.setContent(val);
      }
    },
  },
  mounted() {
    this.$nextTick(function f1() {
      // 保证 this.$el 已经插入文档
      this.editor = UE.getEditor("editor", this.config);

      this.editor.ready(function f2() {
        this.editor.setContent(this.value);

        this.editor.addListener("contentChange", function () {
          const wordCount = this.editor.getContentLength(true);
          const content = this.editor.getContent();
          const plainTxt = this.editor.getPlainTxt();
          //this.$emit('input', { wordCount: wordCount, content: content, plainTxt: plainTxt });
          this.$emit('input', content);
        }.bind(this));

        this.$emit('ready', this.editor);
      }.bind(this));
    });
  },
  beforeDestroy(){
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
