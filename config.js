/**
 * adminXL - 全局配置
 */
export var config = {

    //adminXL项目所在目录，目录结尾必须要有斜杠
    //如果部署在根目录中，则应为 host:'/'
    //如果部署在admin目录中，则应为 host:'/admin/'
    host:'/',

    //默认首页
    index:'/page/home.html',

    //默认错误页
    error:'/page/error.html',

    //是否为多标签，false为单页面
    tab:true,

    //页面请求的方式，有效值：get、post
    ajax:'get',

    //加载完毕后是否执行页面中内嵌的script
    js:true,

    //项目是否部署在纯静态环境中，如果没有动态语言支持，纯前后端分离请填写：true
    static:true,

    //导航侧栏
    sidebar: {
        //初始化时，默认不展开全部菜单，注意：开启展开时，closeAll参数必须为false
        spread: false,
        //点击二级菜单时，展开当前选中菜单，关闭其它已展开的菜单
        closeAll: true,
        //点击二级菜单时，展开与收缩的动画速度，单位毫秒，值越小速度越快
        time: 2
    },

    //用户可以在这里自定义添加其它配置项

};