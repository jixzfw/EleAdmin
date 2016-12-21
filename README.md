#EleAdmin

使用饿了吗前端搭建的可配置化后台

##先看看效果
![表格效果](http://git.oschina.net/uploads/images/2016/1221/150524_fa731265_45533.jpeg "表格示例")
![表单效果](http://git.oschina.net/uploads/images/2016/1221/150557_9ba5805b_45533.jpeg "表单示例")

## 使用方法
本后台高度配置化，后台显示的内容都是通过Ajax获取json数据动态生成的。当前包括菜单、表格页面、表单页面
###菜单结构
```
//页面首次加载时会从后台读取菜单数据，后台地址在index.html中定义
<script>
 // 入口地址
 window.bench     = "/hello.txt";
</script>
//数据结构如下
{
  "title":"JPHP-ELEMENT管理后台", //后台标题
  "menus": [ // 菜单列表
        {
            "index" : "1", //菜单索引
            "title" : "文章中心",//菜单标题
            "submenus" : [ //子菜单，可以没有
                {
                    "index" : "1", 
                    "title" : "栏目AA",
                    "url":"/table.txt" //菜单路由地址，参见Vue-router
                },{
                    "index" : "2",  "title" : "栏目BB","url":"/form.txt"
                },{
                    "index" : "3",  "title" : "栏目CC","url":"/table.txt"
                }
            ]
        } //，{}...
    ],
    "current": 1 //默认选中的菜单
}
```
### 表格结构
点击菜单后，系统会根据路由信息读取数据，从而决定如何渲染页面
```

{
  "mate" : {
    "columns" : [
      {
        "label":"姓名",
        "name" :"name",
        "width":"120"
      },{
        "label":"生日",
        "name" :"date",
        "width":"120"
      },{
        "label":"家庭住址",
        "name" :"address"
      }
    ],
    "rows"  : [
      {
          "id":1,
        "date": "2016-05-03",
        "name": "王小虎",
        "address": "上海市普陀区金沙江路 1518 弄"
      }, {
        "id":2,
        "date": "2016-05-02",
        "name": "王小虎",
        "address": "上海市普陀区金沙江路 1518 弄"
      }, {
        "id":3,
        "date": "2016-05-04",
        "name": "王小虎",
        "address": "上海市普陀区金沙江路 1518 弄"
      }, {
        "id":4,
        "date": "2016-05-01",
        "name": "王小虎",
        "address": "上海市普陀区金沙江路 1518 弄"
      }, {
        "id":5,
        "date": "2016-05-08",
        "name": "王小虎",
        "address": "上海市普陀区金沙江路 1518 弄"
      }, {
        "id":6,
        "date": "2016-05-06",
        "name": "王小虎",
        "address": "上海市普陀区金沙江路 1518 弄"
      }, {
        "id":7,
        "date": "2016-05-07",
        "name": "王小虎",
        "address": "上海市普陀区金沙江路 1518 弄"
      }
    ],
    "btns" :[
        {
            "action":"add",
            "url"      : "/form.txt",
            "label"    : "增加元素",
            "type"     : "success",
            "isApi"    : false,
            "useId"    : -1,
            "disabled" : false
        },
        {
            "action"   :"disableSelected",
            "label"    : "禁用元素",
            "url"      : "/form.txt",
            "type"     : "warning",
            "isApi"    : true,
            "useId"    : 1,
            "disabled" : true
        },
        {
            "action"   :"deleteSelected",
            "label"    : "删除元素",
            "url"      : "/form.txt",
            "type"     : "danger",
            "isApi"    : true,
            "useId"    : 1,
            "disabled" : true
        }
    ],
    "actions" :[
        {
            "action":"edit",
            "url"   : "/form.txt",
            "label" : "修改",
            "type"  : "success",
            "isApi" : false,
            "useId" : 0
        },
        {
            "action":"disable",
            "label" : "禁用",
            "url"   : "/form.txt",
            "type"  : "warning",
            "isApi" : true,
            "useId" : 0
        },
        {
            "action":"delete",
            "label" : "删除",
            "url"   : "/form.txt",
            "type"  : "danger",
            "isApi" : true,
            "useId" : true,
            "useId" : 0
        },
        {
            "action":"action",
            "label" : "绑定",
            "url"   : "/form.txt",
            "type"  : "primary",
            "isApi" : false,
            "useId" : 0
        }
    ],
    "disable":false,
        "delete" :true,
        "edit"   :true,
    "addjson":"/form.txt",
    "page"  : 1,
    "total" : 40
  },
  "title": "表格中心",
  "currentView" : "Tabler"
}
```