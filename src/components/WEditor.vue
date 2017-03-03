<template lang="html">
    <div class="wangEditor-box"><div id="editor"></div></div>
</template>

<script>
// import './WangEditor/css/WangEditor.min.css'
// import './WangEditor/js/lib/jquery-2.2.1.js';
import WangEditor from 'wangeditor'

export default {
  props: {
    value: {
      type: String,
      default: null
    },
    config: {
      type: Object,
      default: function () { return {} }
    }
  },
  data () {
    return {
      content: ''
    }
  },
  mounted () {
    this.createEditor()
  },
  methods: {
    createEditor () {
      const self = this
      const editor = new WangEditor('editor')
      editor.config.menus = ['source', '|', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright',
        '|', 'link', 'unlink', 'table', 'img', 'video', 'insertcode', '|', 'undo', 'redo', 'fullscreen'
      ]
      editor.config.uploadImgUrl = this.config.uploadUrl || '/'
      editor.onchange = function () {
        self.content = this.$txt.html()
        self.$emit('input', self.content)
      }
      editor.create()
    }
  }
}
</script>

<style lang="css" scoped>

    #editor{
        height: 500px;
    }
    .wangEditor-box{
        border-radius: 2px;
        overflow: hidden;
        border: 1px solid #CCC;
        margin: 22px 22px 22px;
}
</style>
