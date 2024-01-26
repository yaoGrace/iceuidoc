/**
 *********************************************
 * AdminXL - 主要文件
 *********************************************
 * 官方：iceui.cn
 * 创建：2021-10-04
 * 更新：2023-06-08
 *********************************************
 */

//获取配置信息
import { config } from '../config.js';
if(ice.data('adminTab') !== null){
    config.tab = ice.data('adminTab');
}

//定义操作类
class admin {
    //构造函数
    constructor(callback) {
        var that = this;
        this.config = config;
        this.callback = callback;
        this.json = {};
        this.moveLine = ice('.adminXL-menu-move');
        this.menuList = ice('.adminXL-sidebar a');
        //多标签
        if (config.tab) {
            ice('.adminXL-header').append(`<div class="adminXL-tab"><div class="adminXL-tab-left"><i class="icon ice-arrow-line-l"></i></div><div class="adminXL-tab-box"></div><div class="adminXL-tab-right"><i class="icon ice-arrow-line-r"></i></div></div>`);
            ice('.adminXL-content').addCss('adminXL-tab-iframe');
            this.menuList.each(function () {
                this.pjax = true;
            })
            ice('.adminXL-menu a').each(function () {
                this.pjax = true;
            })
            this.tab = {
                //标签组对象
                tabEl: ice('.adminXL-tab-box'),

                //左侧按钮
                leftBtn: ice('.adminXL-tab-left'),

                //右侧按钮
                rightBtn: ice('.adminXL-tab-right'),

                //标签内容组
                contentEl: ice('.adminXL-content'),

                //标签结构体
                // id: 标签的唯一标识，用于结构体和路由操作
                // struct[id{
                // 	active: 该标签是否处于激活状态
                // 	url: 标签内容的页面链接
                // 	title: 标签标题
                // 	tabEl: 标签的节点对象
                // 	contentEl: 标签内容对象
                // 	w: 标签内容中的window对象
                // 	d: 标签内容中的documen对象
                // }]
                struct: {},

                //记录
                log: {},

                //当前激活的标签信息
                active: {url:config.index},

                //创建或打开指定标签
                // obj{ 如果传参为字符串，为url，
                // 	url: 标签内容的页面链接
                // 	title: 标签标题
                // 	id: 标签的唯一标识，用于结构体和路由操作
                // }
                // title 标签标题
                // 提示：当id未定义时，id将url作为唯一标识
                open(obj, title) {
                    var tabThis = this;
                    if (typeof obj == 'object') {
                        obj.id = obj.id ? obj.id : obj.url;
                    } else {
                        obj = { url: obj };
                        obj.title = title;
                        obj.id = obj.url;
                    }
                    obj.title = obj.title || '加载中';
                    obj.close = obj.close !== undefined ? obj.close : true;
                    if (this.struct[obj.id]) {
                        if (ice(this.struct[obj.id].tabEl).hasCss('active')) return;
                        for (var k in this.struct) {
                            this.struct[k].active = false;
                        }
                        this.struct[obj.id].active = true;
                        ice('.active', this.tabEl).delCss('active');
                        ice('.active', this.contentEl).delCss('active');
                        ice(this.struct[obj.id].tabEl).addCss('active');
                        ice(this.struct[obj.id].contentEl).addCss('active');
                        //如果页面中存在tabActive方法则执行
                        this.struct[obj.id].w.tabActive && this.struct[obj.id].w.tabActive(this.struct[obj.id], this.struct);
                        this.success && this.success(this.struct[obj.id]);
                        that.callback && that.callback(obj.url, this.struct[obj.id]);

                        //移动选项卡菜单
                        var l = this.struct[obj.id].tabEl.offsetLeft - this.tabEl[0].scrollLeft
                        if (l > this.tabEl[0].offsetWidth) {
                            this.tabEl[0].scrollLeft = l - this.tabEl[0].offsetWidth + this.struct[obj.id].tabEl.offsetWidth;
                        } else if (l <= 0) {
                            this.tabEl[0].scrollLeft = this.struct[obj.id].tabEl.offsetLeft - this.tabEl[0].offsetWidth / 2
                        }

                    } else {
                        this.struct[obj.id] = this.struct[obj.id] ? this.struct[obj.id] : obj;
                        // 标签对象
                        var tabObj = ice.c('div');
                        tabObj.className = 'adminXL-tab-item';
                        tabObj.onclick = function () {
                            tabThis.open(obj.id);
                        }
                        // 右键菜单
                        tabObj.onmouseover = function () {
                            tabObj.oncontextmenu = function (e) {
                                tabThis.sel = tabThis.struct[obj.id];
                                ice('.adminXL-tab-menu').show();
                                ice('.adminXL-tab-menu-box').css({ left: window.event.clientX + 'px', top: window.event.clientY + 'px' });
                                e.preventDefault();
                            }
                        }
                        // 标签名称
                        var tabTitle = ice.c('span');
                        tabTitle.className = 'adminXL-tab-title';
                        tabTitle.innerHTML = obj.title;
                        tabObj.append(tabTitle);
                        this.tabEl.append(tabObj);

                        // 标签关闭按钮
                        if (obj.close != false) {
                            var tabClose = ice.c('span');
                            tabClose.className = 'adminXL-tab-close';
                            tabClose.innerHTML = '✕';
                            tabClose.onclick = function () {
                                ice.sp();
                                ice(tabObj).del();
                                ice(tabThis.struct[obj.id].contentEl).del();
                                if (tabThis.struct[obj.id].active) {
                                    var key = 0, arr = [], c;
                                    for (var k in tabThis.struct) {
                                        arr.push(tabThis.struct[k].id);
                                        if (tabThis.struct[k].id === obj.id) {
                                            c = key;
                                        }
                                        key++;
                                    }
                                    if (c) {
                                        tabThis.open(arr[c + 1] ? arr[c + 1] : arr[c - 1]);
                                    } else if (arr.length > 1) {
                                        tabThis.open(arr[c + 1])
                                    }
                                }
                                delete tabThis.struct[obj.id];
                                tabThis.logInit();
                            }
                            tabObj.append(tabClose);
                        }
                        this.struct[obj.id].tabEl = tabObj;

                        //创建iframe
                        var iframe = ice.c('iframe');
                        iframe.className = 'adminXL-iframe';
                        iframe.setAttribute('frameborder', 0);
                        iframe.setAttribute('allowfullscreen', true);
                        iframe.src = config.host+obj.url;
                        // iframe.src = config.host+'tab.html#'+obj.url;
                        // iframe.src = 'about:blank#'+obj.url;
                        this.struct[obj.id].contentEl = iframe;
                        this.contentEl.append(iframe);
                        iframe.contentWindow.adminTab = this;
                        //获取iframe Window 对象
                        this.struct[obj.id].w = iframe.contentWindow;
                        //获取iframe documen 对象
                        this.struct[obj.id].d = iframe.contentDocument;
                        this.struct[obj.id].tabTitle = tabTitle;
                        iframe.onload = function () {
                            iframe.contentWindow.adminTab = tabThis;
                            if (obj.title == '加载中') {
                                var title = ice('.adminXL-title span', iframe.contentDocument);
                                if (title.length) {
                                    obj.title = title.html();
                                } else {
                                    obj.title = ice('title', iframe.contentDocument).html();
                                }
                                tabTitle.innerHTML = obj.title
                            }
                            tabThis.linkInit(iframe.contentDocument);
                            tabThis.success && tabThis.success(tabThis.struct[obj.id]);
                            that.callback && that.callback(obj.url, tabThis.struct[obj.id]);
                        }
                        this.open(obj.id);
                    }
                    this.active = obj;
                    this.active.tabEl = this.struct[obj.id].tabEl;
                    this.active.contentEl = this.struct[obj.id].contentEl;
                    this.active.tabTitle = this.struct[obj.id].tabTitle;
                    this.active.struct = this.struct[obj.id];
                    that.menuActive();
                    this.logInit();
                },
                //重新加载当前标签
                render(id) {
                    var iframe = id ? this.struct[id].contentEl : this.struct[this.active.id].contentEl;
                    var i = ice(iframe).clone()[0];
                    iframe.parentNode.replaceChild(i,iframe);
                    i.contentWindow.adminTab = this;
                    this.active.contentEl = i;
                    this.struct[this.active.id].w = i.contentWindow;
                    this.struct[this.active.id].d = i.contentDocument;
                    this.struct[this.active.id].contentEl = i;
                },
                //设置当前标签标题
                setTitle(name) {
                    this.active.tabTitle.innerHTML = name;
                },
                //初始化历史记录
                logInit() {
                    this.log = {};
                    for (var k in this.struct) {
                        this.log[k] = {
                            id: k,
                            url: this.struct[k].url,
                            title: this.struct[k].title,
                            close: this.struct[k].close,
                            active: this.struct[k].active
                        }
                    }
                    ice.data('adminTabLog', this.log);
                },
                //关闭当前或指定标签
                close(id) {
                    var tabEl, contentEl;
                    if (id !== undefined) {
                        if (!this.struct[id]) return;
                        if (!this.struct[id].close) return;
                        if (this.active.id === id) return this.close();
                        tabEl = this.struct[id].tabEl;
                        contentEl = this.struct[id].contentEl;
                    } else {
                        tabEl = this.active.tabEl;
                        contentEl = this.active.contentEl;
                        id = this.active.id;
                        this.openLeft();
                    }
                    ice(tabEl).del();
                    ice(contentEl).del();
                    delete this.struct[id];
                    this.logInit();
                },
                //打开当前的左侧标签
                openLeft() {
                    var arr1 = [], arr2 = 0;
                    for (var k in this.struct) {
                        arr2 ? arr2.push(k) : arr1.push(k);
                        if (this.struct[k].active) arr2 = [];
                    }
                    arr1.pop();
                    if (arr1.length) {
                        this.open(arr1.pop());
                    } else if (arr2.length) {
                        this.open(arr2[0]);
                    }
                },
                //打开当前的右侧标签
                openRight() {
                    var active, isOk;
                    for (var k in this.struct) {
                        active = k;
                        if (isOk) break;
                        if (this.struct[k].active) isOk = 1;
                    }
                    if (active) this.open(active);
                },
                // 选项卡左移动
                leftMove() {
                    var that = this;
                    !function run(s) {
                        s--;
                        if (!s) return;
                        setTimeout(() => {
                            that.tabEl[0].scrollLeft += 20;
                            run(s)
                        }, 10)
                    }(15);
                },
                // 选项卡右移动
                rightMove() {
                    var that = this;
                    !function run(s) {
                        s--;
                        if (!s) return;
                        setTimeout(() => {
                            that.tabEl[0].scrollLeft -= 20;
                            run(s)
                        }, 10)
                    }(15);
                },
                linkInit(el){
                    var tabThis = this;
                    ice('a',el).on('click', function () {
                        var a = ice(this);
                        var url = a.attr('href');
                        if (a.attr('target') == '_blank' || a.attr('data-tab') == 'false' || a.attr('data-pjax') == 'false' || url == '#' || url.trim().toLowerCase().slice(0, 11) == 'javascript:') return;
                        console.log(3)
                        ice.pd();
                        tabThis.open(url, a.attr('data-title'));
                    })
                },
                // 初始化
                init() {
                    var tabThis = this;
                    this.linkInit(ice('.adminXL-menu'));
                    that.menuList.on('click', function () {
                        var url = ice(this).attr('href');
                        if (ice(this).attr('target') == '_blank' || url == '#' || url.trim().toLowerCase().slice(0, 11) == 'javascript:') return;
                        ice.pd();
                        ice('.adminXL-sidebar-menu .active').delCss('active');
                        that.moveLine.css('top', ice(this.parentNode).page().y + 'px');
                        tabThis.open(ice(this).attr('href'), ice('span', this).html())
                    })
                    ice('.adminXL-tab-left').click(function () {
                        tabThis.rightMove()
                    })
                    ice('.adminXL-tab-right').click(function () {
                        tabThis.leftMove()
                    })
                    // 创建右键菜单
                    var menu = ice.c('div');
                    menu.className = 'adminXL-tab-menu';
                    menu.innerHTML = `
					<div class="adminXL-tab-menu-box">
						<div class="adminXL-tab-menu-item">关闭</div>
						<div class="adminXL-tab-menu-item">关闭左侧标签</div>
						<div class="adminXL-tab-menu-item">关闭右侧标签</div>
						<div class="adminXL-tab-menu-item">关闭其它标签</div>
						<div class="adminXL-tab-menu-item">重新加载</div>
					</div>
					`;
                    ice('body').append(menu);
                    //关闭
                    ice('.adminXL-tab-menu-item').i(0).click(function () {
                        tabThis.close(tabThis.sel.id);
                    })
                    //关闭左侧
                    ice('.adminXL-tab-menu-item').i(1).click(function () {
                        var isActive;
                        for (var k in tabThis.struct) {
                            if (tabThis.struct[k].id === tabThis.sel.id) {
                                if (isActive) {
                                    tabThis.open(tabThis.sel.id);
                                }
                                break;
                            }
                            if (tabThis.struct[k].active) isActive = true;
                            tabThis.close(tabThis.struct[k].id);
                        }
                    })
                    //关闭右侧
                    ice('.adminXL-tab-menu-item').i(2).click(function () {
                        var isSel, isActive;
                        for (var k in tabThis.struct) {
                            if (tabThis.struct[k].id === tabThis.sel.id) {
                                isSel = true;
                            } else {
                                if (isSel) {
                                    if (tabThis.struct[k].active) isActive = true;
                                    tabThis.close(tabThis.struct[k].id);
                                }
                            }
                        }
                        if (isActive) {
                            tabThis.open(tabThis.sel.id);
                        }
                    })
                    //关闭其它
                    ice('.adminXL-tab-menu-item').i(3).click(function () {
                        for (var k in tabThis.struct) {
                            if (tabThis.struct[k].id !== tabThis.sel.id) {
                                tabThis.close(tabThis.struct[k].id);
                            }
                        }
                        tabThis.open(tabThis.sel.id);
                    })
                    //重新加载
                    ice('.adminXL-tab-menu-item').i(4).click(function () {
                        tabThis.render(tabThis.sel.id);
                    })
                    //点击其它地方关闭按钮
                    ice('body').on('click', function () {
                        ice(menu).hide();
                    })
                }
            };
            var tabLog = ice.data('adminTabLog');
            if (tabLog && Object.keys(tabLog).length) {
                var active;
                for (var k in tabLog) {
                    this.tab.open(ice.cloneObj(tabLog[k]));
                    if (tabLog[k].active) {
                        active = ice.cloneObj(tabLog[k]);
                    }
                }
                setTimeout(()=>{this.tab.open(active)},50);
            }
        }

        this.sidebar = {
            open() {
                ice('.adminXL-toggle').delCss('open')
                ice('.adminXL-page').delCss('adminXL-sidebar-close');
                ice('.adminXL-sidebar').delCss('open');
            },
            close() {
                ice('.adminXL-toggle').addCss('open');
                ice('.adminXL-page').addCss('adminXL-sidebar-close');
                ice('.adminXL-sidebar').addCss('open');
            }
        };
        //侧栏隐藏展开-收缩
        ice('.adminXL-toggle').click(function () {
            ice(this).toggleCss('open', 'close');
            ice('.adminXL-page').toggleCss('adminXL-sidebar-close');
            ice('.adminXL-sidebar').toggleCss('open', 'close');
        })

        //侧栏菜单隐藏展开-收缩
        ice('.adminXL-toggle-right').click(function () {
            ice('.adminXL-menu').toggleCss('open', 'close');
            ice.toggleCss(this, 'open');
        })
        this.menuInit();
        this.pjax({
            el: '.adminXL-content',
            js: config.js,
            empty: config.error,
            success: function (url, res) {
                that.menuActive();
                //关闭下拉菜单
                ice('.dropdown').delCss('open');
                ui.init();
                that.callback && that.callback(url, res);
            }
        });
        if (config.tab) {
            if (!Object.keys(this.tab.log).length) {
                this.tab.open({
                    id: config.index,
                    url: config.index,
                    title: '<i class="icon ice-home"></i>',
                    close: false,
                })
            }
            this.tab.init();
        } else {
            var path = ice.getUrl('__path');
            path ? this.open(path) : this.open(config.index);
        }
        return this;
    }

    menuActive() {
        var that = this;
        //高亮导航
        this.menuList.each(function () {
            var active,href = ice(this).attr('href'),url = config.tab ? that.tab.active.url : (window.location.pathname + window.location.search);
            if(href === url){
                active = 1;
            }else if(url.indexOf(href) > -1){
                active = 2;
            }
            if (active) {
                ice('.adminXL-sidebar-menu .active').delCss('active');
                ice(this).addCss('active');
                var ul = this.parentNode.parentNode;
                if (ice(ul).hasCss('adminXL-menu-dropdown')) {
                    ice(ul).delCss('tree-close').addCss('tree-open').show().parent().delCss('tree-close').addCss('tree-open')
                }
                that.moveLine.css('top', ice(this.parentNode).page().y + 'px');
                if(active === 1) return false;
            }
        });
    }

    //初始化菜单
    menuInit() {
        var that = this;
        this.menuList.each(function () {
            this.pjax = true;
        })
        //监听侧栏菜单
        this.menuList.on('click', function () {
            //移动端收缩菜单
            if (ice.web().w <= 768) {
                ice('.adminXL-toggle').toggleCss('open', 'close');
                ice('.adminXL-page').toggleCss('adminXL-sidebar-close');
                ice('.adminXL-sidebar').toggleCss('open', 'close');
            }
            if(!config.tab){
                var url = ice(this).attr('href');
                var isPjax = ice(this).attr('data-pjax');
                if (ice(this).attr('target') == '_blank' || isPjax == 'false' || url == '#' || url.trim().toLowerCase().slice(0, 11) == 'javascript:') {
                    return;
                }
                ice.pd();
                that.open(ice(this).attr('href'));
            }
        });
        //侧栏菜单展开-收缩
        ice.tree({
            el: '#adminXL-tree',
        });
        //菜单树高亮
        this.menuActive();
        this.menuList.on('mouseover', function () {
            that.moveLine.css('top', ice(this).page().y - ice.scroll('y') + 'px');
        })
        this.menuList.on('mouseout', function () {
            that.moveLine.css('top', ice('.adminXL-sidebar-menu .active').page().y + 'px');
        })
    }
    //pjax无刷新
    pjax(json) {
        this.json = json ? json : this.json;
        ice.pjax(this.json);
    }

    //重新加载
    render() {
        this.pjax();
    }
    //打开指定url
    open(url) {
        url = decodeURIComponent(url);
        this.json.url = config.host + url;
        this.pjax();
    }
    //打开指定url，打开新页面
    href(url) {
        window.location.href = url;
    }
    //菜单格式化
    menu(json) {
        if (!json || !json.length) return;
        ice('#adminXL-tree').html('');
        var that = this;
        var html = '';
        for (var item of json) {
            if (item.child && item.child.length) {
                var li = '';
                for (var child of item.child) {
                    li += `<li><a href="${child.url}"><span class="title">${child.name}</span></a></li>`;
                }
                html += `<li>
					<a href="javascript:;">
						<i class="icon ${item.icon}"></i>
						<span class="title">${item.name}</span>
						${item.dot ? '<span class="tag tag-dot bg-' + item.dot + '"></span>' : ''}
						<span class="arrow"><i class="icon ice-arrow-line-r"></i></span>
					</a>
					<ul class="adminXL-menu-dropdown">
						${li}
					</ul>
				</li>`;
            } else {
                html += `<li>
					<a href="${item.url}">
						<i class="icon ${item.icon}"></i>
						<span class="title">${item.name}</span>
						${item.dot ? '<span class="tag tag-dot bg-' + item.dot + '"></span>' : ''}
					</a>
				</li>`;
            }
        }
        ice('#adminXL-tree').html(html);
        ice.tree({
            el: '#adminXL-tree',
            time: 2,
        });
        this.menuInit();
        ice('#adminXL-tree a').on('click', function () {
            var url = ice(this).attr('href');
            var isPjax = ice(this).attr('data-pjax');
            if (ice(this).attr('target') == '_blank' || isPjax == 'false' || url == '#' || url.trim().toLowerCase().slice(0, 11) == 'javascript:') {
                return;
            }
            ice.pd();
            that.json.url = url;
            that.pjax();
            return false;
        })
    }
}

//实例化类
window.adminXL = new admin(window.adminXLCallback ? window.adminXLCallback : false);