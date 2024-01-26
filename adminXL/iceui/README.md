# ICEUI前端框架-唯美简约

#### 官方
+ iceui 官方网站 [https://iceui.cn](https://iceui.cn)
+ iceui 示例文档 [https://iceui.cn/doc](https://iceui.cn/doc)

#### 介绍
ICEUI是一款高效的前端框架，基于原生HTML/CSS/JS开发，她的灵魂来自于自身顶级艺术的设计风格，以其独特的艺术表现及丰富的内涵特征，向人们诠释了一个全新的前端框架理念，纯原生开发，无任何依赖，冰清玉洁，高贵典雅！
在设计中，具有独特的艺术简约越来越受人们的青眯，已成为设计界的流行元素，而ICEUI的诞生取自于极致的艺术。

#### 组成
iceui主要由三大部分组成：
+ ice.js（iceui的核心），它是一个快速、简洁的JavaScript框架，与大名鼎鼎的jQuery类似，封装了JavaScript常用的功能代码，提供一种简便的JavaScript设计模式，优化HTML文档操作、事件处理、动画交互和Ajax交互，但是，ice更加简洁，选择器的速度比jQuery更快，这是ice的优点。
+ ui.js（用来驱动界面），是基于ice框架开发出来的前端框架，它主要驱动页面的动画交互以及各种样式布局，包括自适应等。
+ 基础插件（web常用插件），全部原生开发，无任何依赖，例如模板引擎、日历、树形控件、弹出层，以及由我独自开发的代码高亮（支持PHP/HTML/JS/JAVA/C/PYTHON……常见编程语言），富文本编辑器等等。

#### 优点
+ 纯原生开发，无任何依赖，冰清玉洁
+ 响应式布局，适应任何分辨率的设备
+ 丰富的js组件，使用中更加轻巧便捷
+ 顶级的艺术设计，任何人都可以做出惊人的前端界面
+ 具有独特的链式语法和短小清晰的多功能接口。
+ 具有高效灵活的css选择器，并且可对CSS选择器进行扩展。
+ 拥有便捷的插件扩展机制和丰富的插件。

#### 最新更新

# iceui v2.0.4
+ **2022-10-05**
+ [优化] 多图片与多文件上传控件，增加数量控制
+ [优化] 弹窗控件传参方式
+ [修复] iv模板引擎的for循环中的一个小bug
+ **2022-06-15**
+ [修复] iv模板引擎的i-model输入框在ios环境中输入中文错误问题
+ **2022-06-08**
+ [新增] iv模板引擎增加ajax
+ **2022-06-06**
+ [新增] input组件上的data-reg正则限制
+ [优化] iv模板引擎的i-type属性
+ [修复] ui.js中val方法获取select多选下拉菜单的值
+ [优化] ui中的一些样式
+ **2022-05-10**
+ [优化] 导航条高亮支持子页面
+ **2022-05-09**
+ [修复] 导航条滑动多次快速点击导致闪烁的bug
+ **2022-04-27**
+ [新增] ice.p数学运算
+ [优化] 所有js控件，增强规范
+ [优化] ui.js一些代码，并添加严格模式
+ [优化] ui.css一些样式
+ [废弃] ice.js中的scrollWheel方法，这个很鸡肋
+ **2022-04-25**
+ [优化] ice.tree目录树插件，增加closeALL参数
+ [优化] ui.css一些样式
+ **2022-04-22**
+ [优化] data-scroll 滚动到指定位置属性，增加data-offset偏移量设置
+ **2022-04-21**
+ [增加] ice.paging分页控件
+ [修复] ice.view在IOS Safari浏览器中不兼容正则先行断言问题导致的出错
+ **2022-04-13**
+ [修复] ice.view中处理复选框造成选中项失效的bug
+ [优化] ice.js的form方法
+ **2022-04-09**
+ [优化] ice.view的多维数组赋值
+ [修复] ice.view的for添加列队造成的某些bug
+ [优化] select下拉菜单，增强分组格式化
+ [优化] ani动画过渡效果
+ [优化] css一些样式
+ **2022-03-07**
+ [修复] ice.view的for循环在某些情况下造成数据错乱
+ [修复] ice.view的数据length无反应问题
+ [优化] ice.js的slideDown和slideUp
+ [优化] ice.js的ajax方法
+ [删除] ice.js的imgHVC方法（该方法用于图片居中，css就能实现，这里不再提供）
+ [删除] ice.js的trim方法
+ [删除] ice.js的delTag方法
+ [修改] ice.js的getRandom为randInt
+ [增加] ice.js的input方法（oninput）
+ [优化] ice.code代码高亮插件，增加class：code-lang 格式化方式
+ [优化] ice.editor富文本编辑器，优化样式

# iceui v2.0.3
+ **2022-02-08**
+ [增加] ice.table增加设置接口的header配置
+ [优化] ice.view可以无需提前预设变量
+ [修复] tab选项卡无法重新渲染问题
+ **2022-01-11**
+ [修复] ice.table悬浮列样式错位
+ [修复] select选择框多选在垃圾扣扣浏览器样式溢出问题
+ **2021-12-31**
+ [优化] tab选项卡菜单溢出显示滚动条
+ [优化] ice.table无数据时代码
+ **2021-12-28**
+ [修复] ice.table悬浮列在分页中样式错位
+ [修复] ice.table分页在form查询时分页信息没有重置，感谢网友「ROC」的反馈
+ [新增] ice.data和ice.localData方法，用于设置本地数据存储
+ **2021-12-27**
+ [修复] select修复onchange两次触发
+ [新增] ui.setSelect(el,json)方法，用于格式化select的选项列表
+ **2021-12-25**
+ [修复] ice.area地区选择器点击其它位置触发回调的bug，以及回调数据错误的bug
+ **2021-12-24**
+ [新增] 增加ice.success、ice.fail、ice.error、ice.warn提示框
+ **2021-12-22**
+ [新增] select增加模糊搜索功能
+ [新增] select增加调用接口数据功能
+ **2021-12-21**
+ [修复] ice.table悬浮列在隐藏页面渲染后导致的表格错位问题
+ **2021-12-16**
+ [增加] ice.date属性值：data-format(格式化时间格式)和data-view(视图类型：年月日和时间)
+ [增加] ice.table属性值：fixed(固定悬浮列)，在列数很多的情况下使其固定而不随滚动条滚动
+ **2021-12-11**
+ [增加] ice.table的thead增加data-el和el设置，用于设置表格内的内容溢出显示三个点
+ [增加] ice.popup增加footer传值属性，用于设置弹窗footer左下角的内容
+ [优化] ice.popup传值，content和footer传值可以为function或string类型
+ [优化] ui样式，增加item-left和item-right样式
+ **2021-12-10**
+ [修复] ice.date图标在ui的InputGroup组合输入框中不显示日历图标问题，感谢网友「ROC」的反馈
+ **2021-12-09**
+ [增加] ui中select下拉菜单增加清空项按钮，单选可以清空当前选项
+ **2021-12-07**
+ [增加] ice.trigger()触发自定义指定的事件
+ [优化] ice.val()方法，增加对select多选的赋值和取值，感谢网友「主角晨寅」的反馈
+ [优化] ice.view模板引擎代码，优化select多选控件
+ **2021-12-06**
+ [增加] ice.table数据表格增加单选(radio)功能
+ [增加] 模板引擎iceView的增加i-type类型指令，限制类型输入与输出，字符类型、整型、浮点型，以及字符长度和浮点长度
+ [增加] ui中select下拉菜单增加多选功能
+ [增加] 模板引擎iceView的下拉菜单修改，增加对下拉菜单的多选功能，无缝对接ui的select
+ [优化] ui代码整体优化
+ **2021-11-19**
+ [修复] ice.table数据表格的复选数据重复bug
+ [修复] ice.view数据绑定的一个小bug
+ [优化] ui代码
+ **2021-11-13**
+ [优化] ice.view模板引擎代码
+ [优化] ice.run代码
+ [优化] ice.area地区选择器，防止重复格式化，并增加清空按钮
+ **2021-11-09**
+ [修复] ice.date选择日期时出现的小BUG
+ [优化] ice.date时间选择控件，点击背景可关闭时间选择器
+ [优化] ice.view模板引擎，增强下拉选择菜单，增强变量名称解析
+ [优化] ice.popup弹窗代码，增加disable参数，可自由设置取消和确定按钮的点击关闭弹窗事件
+ [优化] ice.area地区选择器，防止div设置overflow隐藏时隐藏选择器
+ **2021-11-06**
+ [增加] ice.table的thead类型，增加单选功能
+ [优化] ice.table的template，可传function方法
+ [查看其它更新](https://iceui.cn/update) 