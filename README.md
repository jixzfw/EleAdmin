#EleAdmin

使用饿了么前端搭建的可配置化后台

##先看看效果
![表格效果](http://git.oschina.net/uploads/images/2016/1221/150524_fa731265_45533.jpeg "表格示例")
![表单效果](http://git.oschina.net/uploads/images/2016/1221/150557_9ba5805b_45533.jpeg "表单示例")

## 使用方法
本后台高度配置化，后台显示的内容都是通过Ajax获取json数据动态生成的。当前包括菜单、表格页面、表单页面
###菜单结构
```javascript
 //页面首次加载时会从后台读取菜单数据，后台地址在index.html中定义
 // 入口地址
 window.bench     = "/hello.txt";
```
数据结构如下
```json
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
```json

{
  "mate" : {//渲染定义
    "columns" : [//列定义
      {
        "label":"姓名", 
        "name" :"name",
        "width":"120"
      }//,{}...
    ],
    "rows"  : [//数据定义
      {
        "id":1,
        "date": "2016-05-03",
        "name": "王小虎",
        "address": "上海市普陀区金沙江路 1518 弄"
      }//, {}
    ],
    "btns" :[//表格顶部按钮定义
        {
            "action"   :"add",
            "url"      : "/form.txt",
            "label"    : "增加元素",
            "type"     : "success",
            "isApi"    : false,    //重新读取数据还是重新渲染
            "useId"    : -1,  // -1 不用， 0 当前行，1 选中行
            "disabled" : false  //复选框0选中时是否禁用
        }//,{}
    ],
    "actions" :[//行按钮
        {
            "action":"edit",
            "url"   : "/form.txt",
            "label" : "修改",
            "type"  : "success",
            "isApi" : false,
            "useId" : 0 
        }//,{}
    ],
    "page"  : 1, //当前页
    "total" : 40  // 数据总条数
  },
  "title": "表格中心",
  "currentView" : "Tabler" //渲染格式
}
```
###表单结构
```json

{
  "mate" : {
    "values": {//默认值
        "name": ""//,...
    
    },
    "fields" : [//域定义
            {
                "holder"      :"select",//参见Element组件
                "name"        :"name",
                "label"       :"活动区域",
                "placeholder" :"请选择活动区域",
                "options"     :[ //如果有的话
                    {
                        "label"   :"区域一",
                        "value"   :"shanghai"
                    },{
                        "label"   :"区域二",
                        "value"   :"beijing"
                    }
                ]
            }//,{}
        ],
        "rules": {//验证规则
          "name": [
            { "required": true, "message": "请输入活动名称", "trigger": "blur" },
            { "min": 3, "max": 5, "message": "长度在 3 到 5 个字符", "trigger": "blur" }
          ]//, ...
        }
  },
  "title" : "表单中心",
  "currentView" : "Formor" //渲染格式
}

```

##使用方法

git clone git@git.oschina.net:bfgdqch/EleAdmin.git

cd EleAdmin

npm install

npm run dev

浏览器中看效果 http://localhost:8080