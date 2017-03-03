export default {
  methods: {
    handleAction (act, row = {}) {
      if (act.confirm) {
        this.handleConfirm(act.confirm, function () {
          this.action(act, row)
        })
      } else {
        this.action(act, row)
      }
    },
    action (act, row, func = null) {
      if (act.switch) {
        act.url = act['urls'][Number(row[act.switchKey])]
      }

      let vm = this
      // 用于form提交
      if (act.ajax) {
        this.ajaxData(act.url, row, function (data) {
          let next = data.next || act.next || false
          if (next) { // 操作完成后跳转
            vm.$root.monitor({url: next})
          }
        }, true)
        return
      }

      // 用于在线按钮
      if (act.isApi) {
        this.ajaxData(act.url, {id: row.id}, func)
        return
      }

      let url = act.url
      // 带id跳转
      if (act.useId !== -1) {
        let path = act.key || 'id'
        url = url + '/' + path + '/' + row.id
      }
      this.$root.monitor({url: url})
    },
    handleConfirm (config, func) {
      this.$confirm(config.msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(func).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 仅仅是ajax动作
    ajaxData (url, param = {}, func = null, post = false) {
      console.log('Ajax:' + url)
      let option = {
        method: post ? 'POST' : 'GET',
        url: url
      }
      if (post) {
        option.body = param
      } else {
        option.params = param
      }
      // var vm = this
      this.$http(option).then((response) => {
        try {
          var data = response.body
          // var data = JSON.parse(response.body)
          if (data.status && Number(data.status) < 0) {
            this.$message({
              // title: '注意',
              type: 'warning',
              message: status.message || '操作失败'
            })
          } else {
            this.$message({
              //  title: '消息',
              type: 'success',
              message: status.message || '操作完成'
            })
            // 获取后处理信息
            if (func !== null) {
              func(data)
            }
          }
        } catch (err) {
          console.log(err)
          console.log('数据解析失败')
        }
      }, (response) => {
        this.$message({
          // title: '注意',
          type: 'warning',
          message: '获取失败'
        })
      })
    }
  }
}

