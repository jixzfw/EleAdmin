<template>
  <el-cascader
    :options="options"
    v-model="selectedOptions"
    @change="handleChange">
  </el-cascader>
</template>
<script>
  export default {
    props: {
      value: [String, Number],
      options: Array
    },
    data () {
      return {
        selectedOptions: []
      }
    },
    created: function () {
      this.onValue(this.value)
    },
    watch: {
      // value: function (newValue) {
      //   console.log('newValue = ' + newValue)
      //   this.onValue(newValue)
      // }
    },
    methods: {
      handleChange (value) {
        console.log('on change value =')
        console.log(value)
        console.log(this.selectedOptions)
        this.$emit('input', value[value.length - 1])
      },
      findIndex (arr, value, o, level) {
        arr[level] = o.value
        if ((o.value + '') === (value + '')) {
          return true
        }
        if (o.children) {
          for (var i = 0; i < o.children.length; i++) {
            if (this.findIndex(arr, value, o.children[i], level + 1)) {
              return true
            } else {
              continue
            }
          }
        }
        return false
      },
      onValue (newValue) {
        if (newValue && newValue !== '' && newValue !== null && newValue !== 0) {
          var v = []
          for (var i = 0; i < this.options.length; i++) {
            v = []
            if (this.findIndex(v, newValue, this.options[i], 0)) {
              this.selectedOptions = v
              console.log('on create set v =')
              console.log(v)
              return
            }
          }
        }
      }
    }
  }
</script>

<style>
  .demo-block {
    border:1px solid #eaeefb;
    border-radius:4px;
    transition:.2s
  }
  .demo-block.hover {
    box-shadow:0 0 8px 0 rgba(232,237,250,.6),0 2px 4px 0 rgba(232,237,250,.5)
  }
  .demo-cascader .block {
    padding: 30px 0;
    text-align: center;
    border-right: 1px solid #eff2f6;
    float: left;
    width: 50%;
    box-sizing: border-box;
  }
  .demo-cascader {
    overflow: hidden;
  }
</style>
