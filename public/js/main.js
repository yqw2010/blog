var weiboName = "@Barret李靖";
var duoshuoName = "";

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var pluses = /\+/g;
    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }
    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }
    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }
    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }
    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }
    var config = $.cookie = function (key, value, options) {
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }
            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }
        var result = key ? undefined : {};
        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');
            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }
            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }
        return result;
    };
    config.defaults = {};
    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }
        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };
}));

var log = function(msg){
    console && console.log && console.log(msg);
};
// 模板引擎
var tplEngine = function(tpl, data) {
    var reg = /<%([^%>]+)?%>/g,
        regOut = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
        code = 'var r=[];\n',
        cursor = 0;

    var add = function(line, js) {
        js? (code += line.match(regOut) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while(match = reg.exec(tpl)) {
        add(tpl.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(tpl.substr(cursor, tpl.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
};
// 移动设备侦测
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    }
    ,BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    }
    ,iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }
    ,Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    }
    ,Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    }
    ,any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var operation = {
    init: function(){
        this.fontChange();
        this.toTop();
        this.share();
        this.footerNav();
        this.bind();
        this.tips();
        this.insertWeibo();
    },
    welcome: function(){
        var self = this, visitor;

        function getNamefailed(){
            var histories = {}, userinfo = {};
            try{ histories = JSON.parse($.cookie("visitor_history")); }catch(e){}
            for(var key in histories){
                userinfo = {
                    name: key,
                    avatar: histories[key]
                }
            }
            if(userinfo.name && userinfo.avatar){
                var htmlStr = makeHtml(userinfo.name, userinfo.avatar);
                self.alertMsg(htmlStr);
            }
        }

        function makeHtml(name, avatar){
            return "<img class='alert-avatar' src='" + avatar + "'>" + name + ", 欢迎回来~";
        }

        if(visitor = $.cookie("visitor")) {
            visitor = visitor.split("|");
            if(visitor && visitor[0] && visitor[1]){
                // var htmlStr = makeHtml(visitor[0], visitor[1]);
                // self.alertMsg(htmlStr);
                return;
            }
        }

        $.removeCookie("visitor");
        $.ajax({
          url: "http://" + duoshuoName +".duoshuo.com/api/threads/listPosts.jsonp?thread_key=/&require=visitor",
          dataType: "jsonp",
          timeout: 5000,
          success: function(data){
            if(!(data && data.visitor && data.visitor.name && data.visitor.avatar_url)) {
                getNamefailed();
                return;
            }
            var name = data.visitor.name;
            var avatar = data.visitor.avatar_url;
            if(/大额大额/.test(name)){
                name = "亲爱的";
            }
            var htmlStr = makeHtml(name, avatar);
            self.alertMsg(htmlStr);

            // 目前登录人缓存半天
            $.cookie("visitor", name + "|" + avatar, {
                expires: 0.25,
                path: "/"
            });

            // 缓存历史登录者
            var histories = $.cookie("visitor_history");
            try{
                histories = JSON.parse(histories);
            }catch(e){
                histories = {};
            }
            histories[name] = avatar;
            try{
                $.cookie("visitor_history", JSON.stringify(histories), {
                    expires: 100,
                    path: "/"
                });
            }catch(e){}
          },
          error: function(){
            getNamefailed();
          }
        });
    },
    insertWeibo: function(){
        var htmlStr = '<iframe width="330" height="350" class="share_self"  frameborder="0" scrolling="no" src="http://widget.weibo.com/weiboshow/index.php?language=&width=330&height=350&fansRow=1&ptype=1&speed=0&skin=1&isTitle=0&noborder=0&isWeibo=1&isFans=0&uid=1812166904&verifier=73dc4ca5&dpc=1"></iframe>';
        if(/\/entry\//.test(window.location.href) && !isMobile.any()
            && ($(window).width() > 992) && !$(".share_self").size()){
            $(window).on("load", function(){
                $(".rightbar-frame").css("background", "none").append(htmlStr);
            });
        }
        if(isMobile.any()) {
            $(".rightbar-frame").remove()
        }
    },
    alertMsg: function(msg){
        if(!msg) return;
        var $msg = $(".alertInfo").size() ? $(".alertInfo") : $("<div class='alertInfo'></div>").appendTo($("body"));
        $msg = $($msg);
        $msg.html(msg).css("right", "-9999").animate({
            right: 20
        }, 800);
        clearTimeout(window._alert_timer);
        window._alert_timer = setTimeout(function(){
            $msg.animate({right: -9999}, 800);
        }, 3000);
    },
    tips: function(){
        var htmlStr = [
            '<div class="arrow-tips">',
            '  <h5>小建议: </h5>',
            '  <span class="close">x</span>',
            '  <ul>',
            '    <li><code>shift+alt+↑</code>: 回到顶部</li>',
            '    <li><code>shift+alt+↓</code>: 去评论</li>',
            '    <li><code>shift+alt+←</code>: 上一篇</li>',
            '    <li><code>shift+alt+→</code>: 下一篇</li>',
            '  </ul>',
            '</div>'
        ].join("\n");
        if(isMobile.any() || $.cookie("tips_readed") || $(".post-title").size() == 0) return;
        $("body").append(htmlStr);
        $(document).on("click", ".arrow-tips .close", function(){
            $.cookie("tips_readed", true, {
                expires: 8,
                path: "/"
            });
            $(".arrow-tips").remove();
        });
    },
    bind: function(){
        var self = this;
        if($(".entry-page-search").size()) {
            $(".entry-page-search input").on("keyup change keydown", function(evt){
                var val = $.trim($(this).val());
                if(val && evt.which == 13) {
                    window.open('https://www.google.com.hk/search?q=site:www.barretlee.com ' + val);
                }
            });
            $(".entry-page-search i").on("click", function(){
                $(".entry-page-search input").trigger("keydown");
            });
        }
        $(window).on("resize", function(){
            self.insertWeibo();
        });
        $(window).on("keydown", function(evt){
            if(evt.shiftKey && evt.altKey ) {
                if(evt.keyCode == 39) { // right
                    var href = $(".page-relative-fixed .next").attr("href");
                    if(href){
                        (window.location.href = href);
                    } else {
                        self.alertMsg("已经是最后一篇文章了~");
                    }
                }
                if(evt.keyCode == 37) { // left
                    var href = $(".page-relative-fixed .prev").attr("href");
                    if(href){
                        (window.location.href = href);
                    } else {
                        self.alertMsg("已经是第一篇文章了~");
                    }
                }
                if(evt.keyCode == 38) { // top
                    window.scrollTo(0, 0);
                }
                if(evt.keyCode == 40) { // down
                    if(/#footer-nav-on/.test(window.location.href)) {
                        window.location.href = window.location.href;
                    } else {
                        window.location.href += "#footer-nav-on";
                    }
                }
                $.cookie("tips_readed", true, {
                    expires: 8,
                    path: "/"
                });
            }
        });
    },
    isIE: function(num){
        var name = navigator.appVersion.toUpperCase();
        return num ? name.match(/MSIE (\d)/) && name.match(/MSIE (\d)/)[1] == num
              : /MSIE (\d)/.test(name);
    },
    // 添加运行代码的 button
    addRunCodeBtn: function(){
        $(".addrunbtn").each(function() {
            var $this = $(this);
            $this.append("<span class='runCode'>运行代码</span>");
        });
        //runCode
        $(".highlight").on("click", ".runCode", function(evt) {
            evt.stopPropagation();

            var code = $(this).parents(".highlight").find("code").text();

            code = $(this).parents(".highlight").hasClass('jscode') ? ("该 blob 流源自: <a href='" + window.location.href +
                    "'>小胡子哥的个人网站</a><br /><span style='color:red;font-size:12px;line-height:50px;'>"+
                    "有些数据可能在 console 中显示~</span><script>" + code + "</script>") : code;

            if (!operation.isIE()) {
                window.open(URL.createObjectURL(new Blob([code], {
                    type: "text/html; charset=UTF-8"
                })));
            } else {
                var d = window.open("about:blank").document;
                d.write(code);
                d.close();
            }
        });
    },
    // 底部tab切换
    footerNav: function(){
        $(".footer-nav a").on("click", function(evt){

            evt.preventDefault();

            var index =  $(this).index();
            $(".footer-nav a").removeAttr("id");
            $(this).attr("id", "footer-nav-on");

            $(".nav-detail>div").hide().eq(index).fadeIn();
        });
    },
    // 分享
    share: function(title){
        var local = location.href,
            title = title || "文章《" + weiboName + " " +  $(".post-title").text() + "》";

        if(!title) title += "好站分享 " + weiboName + " ";

        title += $("meta[property='og:description']").attr("content").slice(0, 95) + "...";

        $("#share-weibo").off().on("click", function(){
            var url = "http://service.weibo.com/share/share.php?appkey=1812166904&title=" +
            title + "&url=" + local + "&searchPic=false&style=simple"; // &pic=a.jpg;

            operation._shareWin(url);
        });
        $("#share-tencent").off().on("click", function(){
            var url = "http://share.v.t.qq.com/index.php?c=share&a=index&url="+
            local + "&title=" + title;
            operation._shareWin(url);
        });
        // $("#share-qzone").off().on("click", function(){
        //     var url = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+
        //     local + "&title=" + title;
        //     operation._shareWin(url);
        // });
        $("#share-twitter").off().on("click", function(){
            var url = "http://twitter.com/share?url="+local+"&text="+title+"&related=barret_china"
            operation._shareWin(url);
        });
        $("#share-douban").off().on("click", function(){
            var url = "http://www.douban.com/recommend/?url="+local+"&title="+title+"&v=1"
            operation._shareWin(url);
        });
    },
    _shareWin: function(r){
            var d = document;
            var x=function(){if(!window.open(r,'share','toolbar=0,status=0,resizable=1,scrollbars=yes,status=1,width=440,height=430,left='+(screen.width-440)/2+',top='+(screen.height-430)/2))location.href=r};if(/Firefox/.test(navigator.userAgent)){setTimeout(x,0)}else{x()}
    },
    // 回到顶部
    toTop: function(){
        var $toTop = $(".toTop");
        var that = this;

        $(window).on("scroll", function(){
            if($(window).scrollTop() >= $(window).height()){
                $toTop.fadeIn();
            } else {
                $toTop.fadeOut();
            }
        });

        $toTop.on("click", function(evt){
            var $obj = $("body");
            if(that.isIE(7)) $obj = $("html");
            $obj.animate({
                scrollTop: 0
            }, 240);

            evt.preventDefault();
        });
    },

    // 字体修改
    fontChange: function(){
        $(".font-type").on("click", function(){
            $(this).parent().find("a")
            .toggleClass("font-type-song")
            .toggleClass("font-type-hei");

            $("body").toggleClass("post-font-song");
        });
        $(".bg-type").on("click", function(){
            $(this).parent().find("a")
            .toggleClass("font-type-song")
            .toggleClass("font-type-hei");

            $("body").toggleClass("body-bg-moon");
        });
    }
};

var decoration = {
    init: function(){
        this.consoleCtt();
        this.menuIndex($('.post'));
        this.navTurner();
        this.sidebarNav();
    },
    // console 简介
    consoleCtt: function(){
        if(window.console&&window.console.log) {
            var url = "http://" + window.location.host;
            console.log("\n\n\n\n\n\n\n\n\n\n%c", "background:url(" + url + "/avatar150.png); background-repeat:no-repeat; font-size:0; line-height:30px; padding-top:150px;padding-left:150px;");
            console.log("欢迎踩点我的博客：http://barretlee.com，我觉得编程是一件非常愉快的事情。\n对一个疯狂的程序员来说，代码就是他的一切，我还没有那么疯狂，但是也希望coding\n的时候可以融入自己的生活哲学，让更多娱乐化的元素出现在代码中~%c\n\nWeibo: http://weibo.com/hustskyking (@Barret李靖)", "color:red");
        }
    },
    // 鼠标移动添加效果
    sidebarNav: function(){
        var left = 21;
        if(operation.isIE() && !operation.isIE(7)) {
            left = 36;
        }
        $(".func-item").hover(function(){
            $(this).children("div").css({
                "left": "15px",
                "opacity": "0"
            }).clearQueue().show().stop().animate({
                "left": left,
                "opacity": "1"
            }, "fast");
        }, function(){
            var $tmp = $(this).children("div").stop().delay(100).animate({
                "left": "15px",
                "opacity": "0"
            }, "fast").hide(1);
        });
    },
    // 导航树
    menuIndex: function($obj){
        if($('h3',$obj).length > 2 && !isMobile.any()){
            var h3 = [],h4 = [],tmpl = '<ul>',h3index = 0;

            $.each($('h3,h4',$obj),function(index,item){
                if(item.tagName.toLowerCase() == 'h3'){
                    var h3item = {};
                    h3item.name = $(item).text();
                    h3item.id = 'menuIndex'+index;
                    h3.push(h3item);
                    h3index++;
                }else{
                    var h4item = {};
                    h4item.name = $(item).text();
                    h4item.id = 'menuIndex'+index;
                    if(!h4[h3index-1]){
                        h4[h3index-1] = [];
                    }
                    h4[h3index-1].push(h4item);
                }
                item.id = 'menuIndex' + index
            });

            //添加h1
            tmpl += '<li class="h1"><a href="#" data-top="0">'+$('h1').text()+'</a></li>';

            for(var i=0;i<h3.length;i++){
                tmpl += '<li><a href="#" data-id="'+h3[i].id+'">'+h3[i].name+'</a></li>';
                if(h4[i]){
                    for(var j=0;j<h4[i].length;j++){
                        tmpl += '<li class="h4"><a href="#" data-id="'+h4[i][j].id+'">'+h4[i][j].name+'</a></li>';
                    }
                }
            }
            tmpl += '</ul>';

            $('body').append('<div id="menuIndex"></div>');
            $('#menuIndex').append($(tmpl)).delegate('a','click',function(e){
                e.preventDefault();
                var scrollNum = $(this).attr('data-top') || $('#'+$(this).attr('data-id')).offset().top;
                //window.scrollTo(0,scrollNum-30);
                $('body, html').animate({ scrollTop: scrollNum-30 }, 400, 'swing');
            })/*.append("<a href='javascript:void(0);' onclick='return false;' class='menu-unfold'>&gt;</a>");*/

            $(window).load(function(){
                var scrollTop = [];
                $.each($('#menuIndex li a'),function(index,item){
                    if(!$(item).attr('data-top')){
                        var top = $('#'+$(item).attr('data-id')).offset().top;
                        scrollTop.push(top);
                        $(item).attr('data-top',top);
                    }
                });

                var waitForFinalEvent = (function () {
                    var timers = {};
                    return function (callback, ms, uniqueId) {
                        if (!uniqueId) {
                            uniqueId = "Don't call this twice without a uniqueId";
                        }
                        if (timers[uniqueId]) {
                            clearTimeout (timers[uniqueId]);
                        }
                        timers[uniqueId] = setTimeout(callback, ms);
                    };
                })();

                $(window).scroll(function(){
                    waitForFinalEvent(function(){
                        var nowTop = $(window).scrollTop(),index,length = scrollTop.length;
                        if(nowTop+60 > scrollTop[length-1]){
                            index = length
                        }else{
                            for(var i=0;i<length;i++){
                                if(nowTop+60 <= scrollTop[i]){
                                    index = i
                                    break;
                                }
                            }
                        }
                        $('#menuIndex li').removeClass('on')
                        $('#menuIndex li').eq(index).addClass('on')
                    })
                });
            });

            //用js计算屏幕的高度
            $('#menuIndex').css('max-height',$(window).height()-80);
        }
    },

    // 导航栏开关
    navTurner: function(){
        if($("#menuIndex a").size() < 3){
            $(".func-nav").parent().find("a")
                .text("首页瞧瞧~").parents(".func-item").off().on("click", function(){
                    window.location.href = "/";
                });
        } else {
            $(".func-nav").parent().on("click", function(){
                $("#menuIndex").slideToggle();
                var text = $(this).find("a").text() == "显示目录" ? "隐藏目录" : "显示目录";
                $(this).find("a").text(text);
            });
        }
    }
};

$(function(){
    // 初始化项目
    operation.init();
    decoration.init();
    $(".highlight").parent(".highlight").removeClass("highlight");
    $("code").removeClass("highlight").each(function(){
        var $hasB = $(this).parent(".highlight");
        var $hasP = $(this).parent("pre");
        if(!$hasB.size() && $hasP.size()){
            $hasP.wrap("<div class='highlight'></div>");
        }
    })
});

$(window).on("load", function(){
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?14788c3dc5c09194b1bad2d5ded36949";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();

    duoshuoName = $(".ds-thread").attr("data-name");
    window.duoshuoQuery = {short_name: duoshuoName};
    if(window.duoshuoQuery.short_name){
        $.getScript((document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js', function(){
            operation.welcome();
        });
    } else {
        operation.welcome();
    }

    var $wb = $("#followMeOnWeibo");
    if($wb.size() > 0 && !$wb.attr("loaded")){
        $wb.parent().on("mouseenter", function(){
            $wb.parent().off();
            $wb.attr("loaded", 1);
            // weibo
            $("html").attr("xmlns:wb", "http://open.weibo.com/wb");
            $("head").append('<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js" type="text/javascript" charset="utf-8"></script>');
            $("#followMeOnWeibo").html('<wb:follow-button uid="1812166904" type="red_1" width="67" height="24" style="vertical-align:middle;display:inline-block" ></wb:follow-button>');
        });
    }

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-67248043-1', 'auto');
    ga('send', 'pageview');
});