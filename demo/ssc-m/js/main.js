/**
* @author Barret Lee(barret.china@gmail.com)
* @date 2014/08
* 
* MIT LICENSE
*/

;(function(window, undefined){

var curNum = 1          
  , curDoubling = 1     
  , curRes = []         
  , curType = "standard"
  , curFullName = "一星"
  , curId = "SSC_1_1"   
  , CHECK_PASS = 1      
  , CHECK_UNPASS = -1   
  , textMsg = ""
  , MAX_DOUBLING = $(".ssc-resluts-doubling em b").text() || 1000
  , ConfigParam = window.ConfigParam
  , ConfigDOM = window.ConfigDOM
  , ConfigClose = window.ConfigClose || []
  , TABLE_2
  , TABLE_3;

(function(){
    var table2 = []
      , table3 = []
      , tableHash2 = {}
      , tableHash3 = [];

    for(var i = 0; i < ConfigParam['total']; i++){
        for(var j = i; j < ConfigParam['total']; j++){
            table2.push(i + j);
            for(var k = j; k < ConfigParam['total']; k++){
                table3.push(i + j + k);
            }       
        }
    }


    for(i = 0; i < table2.length; i++){
        if(!!!tableHash2[table2[i]]){
            tableHash2[table2[i]] = 1;
        } else {
            tableHash2[table2[i]] += 1;
        }
    }

    for(i = 0; i < table3.length; i++){
        if(!!!tableHash3[table3[i]]){
            tableHash3[table3[i]] = 1;
        } else {
            tableHash3[table3[i]] += 1;
        }
    }

    TABLE_2 = tableHash2;
    TABLE_3 = tableHash3;
})();


//=========================================================== SSC ==//

var SSC = window.SSC = function(con){
    this.init(con);
};

$.extend(SSC.prototype, {
    init: function(con){
        this.$con = $(con).size() > 0 ? $(con) : $("#ssc");
        this.tabSwitch();
        this.bindUI();
        this.bindMultiSelector();

        //fix bug 
        $("#doubling").val(1);
    },
    getCurNum: function(){
        return curNum;
    },
    getCurDoubling: function(){
        return Number(curDoubling);
    },
    getCurType: function(){
        return curType;
    },
    getCurRes: function(){
        return curRes;
    },
    preprocessor: function(pos){
        if(pos.length == 0) return;

        var POSITION = [];
        for(var i = 0; i < pos.length; i++){
            POSITION.push(pos[i].join());
        }

        for(var tab in ConfigDOM){
            for(i = 0; i < ConfigDOM[tab].length; i++){
                var sub = ConfigDOM[tab][i];
                if(!!!sub["group"]){
                    if($.inArray(sub["pos"].join(), POSITION) > -1){
                        ConfigDOM[tab].splice(i, 1);
                        i--;
                    }
                } else {
                    for(var j = 0; j < sub["data"].length; j++){
                        if($.inArray(sub["data"][j]["pos"].join(), POSITION) > -1){
                            ConfigDOM[tab][i]["data"].splice(j, 1);
                            j--;
                        }
                    }
                }
            }
        }

        for(var key in ConfigDOM){
            if(ConfigDOM[key].length == 0){
                delete ConfigDOM[key];
                continue;
            }
            if(ConfigDOM[key][0]["data"]){
                for(j = 0; j < ConfigDOM[key].length; j++){
                    if(ConfigDOM[key][j]["data"].length == 0){
                        ConfigDOM[key].splice(j, 1);
                        j--;
                    }
                }
                if(ConfigDOM[key].length == 0){
                    delete ConfigDOM[key];
                }
            }
        }
    },
    tabSwitch: function(){
        var self = this;

        self.preprocessor(ConfigClose);

        $(".ssc-num").html(DOMHelper.createTab());
        self.$con.on("change", ".ssc-type input", function(){
            self.$con.find(".ssc-tip").html("[玩法介绍]：" + $(this).attr("data-tip"));

            curId = $(this).attr("id");
            curFullName = $(this).attr("data-type");

            self.bollLinkage();
        });

        self.$con.on("click", ".ssc-num a", function(evt){
            evt.preventDefault();

            $(".ssc-num a").removeClass("ssc-num_on");
            $(this).addClass("ssc-num_on");

            var item = $(this).text();

            self.setCurAttr(item);

            for(var key in ConfigDOM){
                if(key === item){
                    item = ConfigDOM[key];
                    break;
                }
            }

            var tplTag = 0; 

            if(!!item[0].data) {
                tplTag = 1;
            }

            item = Utils.tplEngine(DOMHelper.createSubTab(tplTag), item);


            $(".ssc-type").html(item).find("input")
                .eq(0).trigger("change")
                .get(0).checked = "checked";

        }).find(".ssc-num a").eq(0).trigger("click");

    },

    setCurAttr: function(text){
        var table = "一二三四五六七八九".split("");

        if(text.match(new RegExp("(" + table.join("|") + ")"))){
            curNum = $.inArray(RegExp.$1, table) + 1;
        } else {
            curNum = -1;
        }
    },

    /**
     * bollLinkage 根据 SubTab 中的 id 属性来判断当前的算法
     * 并渲染各行球的展示
     */
    bollLinkage: function(){
        var self = this;

        if(/1_1|2_1|3_1/.test(curId)){
            curType = "standard";
        }

        $(".CSR_clear").trigger("click");

        var str = DOMHelper.createBollLine();
        $(".ssc-main-choose").html(str);

        self.bindUISelector();
    },

    bindUI: function(){
        var self = this;

        $(".ssc-resluts-doubling em b").text(MAX_DOUBLING);

        $(".ssc-main-choose").on("click", "span strong", function(){
            $(this).toggleClass("ssc-selector-item_on");

            self.refresh().init();
        });

        $(".CSR_clear").on("click", function(evt){
            evt.preventDefault();

            self.refresh().resetDom();
        });

        $(".ssc-resluts-list").on("click", "a", function(evt){
            evt.preventDefault();

            $(this).parent().hide(0, function(){
                var $this = $(this);
                setTimeout(function(){
                    $this.remove();
                    self.refresh().setFinal();
                }, 16);
            });
        });

        $(".ssc-resluts-list").on("click", "div", function(evt){
            evt.preventDefault();

            $(this).addClass("ssc-resluts-list_active")
                .siblings().removeClass("ssc-resluts-list_active");
        });

        $(".ssc-resluts-doubling a").on("click", function(evt){
            evt.preventDefault();

            $(".ssc-resluts-list").html("");
            self.refresh().setFinal();
        });

        $(".ssc-resluts-doubling i").on("click", function(){
            var index = $(this).index();
            var $val = $("#doubling");

            var val = Number($val.val());
            if(index == 0){
                $val.val( val - 1 > 0 ? val - 1 : 1);
            } else {
                $val.val(val + 1);
            }

            curDoubling = $val.val();
            $(".ssc-resluts-doubling input").triggerHandler("change");
        });

        $(".ssc-resluts-doubling input").on("change keyup blur", function(){
            if(!/^\d+$/.test($(this).val())){
                $(this).val(curDoubling);
                return;
            }
            if(parseInt($(this).val()) >= MAX_DOUBLING){
                $(".ssc-resluts-doubling em").show();
                $(this).val(curDoubling);
                return;
            } else {
                $(".ssc-resluts-doubling em").hide();
            }
            self.refresh().setFinal();
        });
    },

    bindUISelector: function(){
        var total = ConfigParam['total']
          , half = total%2 == 1 ? Math.ceil(total / 2) - 1 : total / 2
          , rnum = []
          , funcPool = {   // 用于操作球的选中状态
                "all": function(index, me){
                    $(me).addClass("ssc-selector-item_on");
                },
                "big": function(index, me){
                    index >= half
                        && $(me).addClass("ssc-selector-item_on");
                },
                "small": function(index, me){
                    index < half
                        && $(me).addClass("ssc-selector-item_on");
                },
                "odd": function(index, me){
                    index % 2 == 0
                        && $(me).addClass("ssc-selector-item_on");
                },
                "even": function(index, me){
                    index % 2 == 1
                        && $(me).addClass("ssc-selector-item_on");
                },
                "other": function(index, me){
                    $.inArray(index, rnum) > -1
                        && $(me).addClass("ssc-selector-item_on");
                }
            }
        , self = this;

        $(".ssc-main-choose").on("change", ".ssc-selector-item select", function(){
            var $this = $(this)
              , $items = $this.parents(".ssc-selector-item").find("span strong")
              , val = $this.val();

            self.refresh().resetDom("don't remove all selector status, just a line");
            $items.removeClass("ssc-selector-item_on");

            if(!isNaN(parseInt(val))){
                rnum = Utils.getSomeRandom(parseInt(val));
                val = "other";
            }

            $items.map(funcPool[val]);
                
            self.refresh().init();
        });

        $(".ssc-selector-item select").next("a").on("click", function(evt){
            evt.preventDefault();

            $(this).prev("select").trigger("change");
        });
    },

    refresh: function(){
        var self = this;

        var setCurRes = function(){
            var res = [];
            $(".ssc-selector-item").each(function(){
                var arr = [];
                $(this).find(".ssc-selector-item_on").map(function(index, me){
                    arr.push($(me).text());
                });
                res.push(arr);
            });

            curRes = res;
        };

        var unDisableBtn = function(){
            var count = self.countor();

            if(count == CHECK_UNPASS){
                $(".CSR_info").find("span").eq(0).text("0").end().eq(1).text("0.00");
                $(".CSR_get").find("span").eq(0).text("0.00").end().eq(1).text("0.00");

                $(".CSR_btn").off().removeClass("CSR_btn_OK");

                return;
            }

            $(".CSR_info").find("span").eq("0").text(count) 
                .end().eq(1).text(count * 2);

            var money = self.calcMoney()
              , award = parseInt($(".CSR_info span").eq(1).text())
              , profit = money.indexOf("~") == -1 ? parseInt(money) - award : (function(){
                  return money.replace(/(\d+)/g, function(s, a){
                      return Number(a) - award;
                  });
              })(money);

            $(".CSR_get").find("span").eq(0).text(money).end().eq(1).text(profit);

            $(".CSR_btn").addClass("CSR_btn_OK").off().one('click', function(evt){
                evt.preventDefault();

                if(curType == "text" && textMsg != ""){
                    $(".CSR_clear").trigger("click");
                    self.alertBox(textMsg);
                    return;
                }

                self.addResItem();
                $(".CSR_clear").trigger("click");
                setFinal();
            });
        };

        var resetDom = function(tag){
            $(".CSR_info").find("span").eq(0).text("0").end().eq(1).text("0.00");
            $(".CSR_get").find("span").eq(0).text("0.00").end().eq(1).text("0.00");

            !tag && $(".ssc-selector-item span strong").removeClass("ssc-selector-item_on");

            $(".CSR_btn").off().removeClass("CSR_btn_OK");

            if(curType == "standard"){
                $(".CSR_select").show();
            } else {
                $(".CSR_select").hide();
            }

            $(".CSR_select option").get(0).selected = "selected";
        };

        var setFinal = function(){
            var val = 0;

            curDoubling = $("#doubling").val();

            $(".ssc-resluts-list div").each(function(index, me){
                val += Number($(me).find("i").eq(0).text());
            });

            $(".ssc-resluts-doubling strong").eq(0).text(val)
                .end().eq(1).text(val * curDoubling * 2 || "0.00");
        };

        return {
            init: function(){
                setCurRes();
                unDisableBtn();
            },
            setCurRes: setCurRes,
            unDisableBtn: unDisableBtn,
            resetDom: resetDom,
            setFinal: setFinal
        }
    },

    /**
     * 算法核心
     * @return {Number} 注数
     */
    countor: function(){
        var self = this
          , ret = 1
          , sum = 0
          , a = curRes[0] && curRes[0].length || 0
          , b = curRes[1] && curRes[1].length || 0;

        switch(curType){
            case "standard":  // 标准
                for(var i = 0; i < curNum; i++){
                    ret *= (curRes[i] && curRes[i].length) || 0;
                }
                return ret == 0 ? CHECK_UNPASS : ret;
    
            default:
                return CHECK_PASS;

        }
    },

    calcMoney: function(){
        var text = $(".ssc-tip").text()
          , ret = text.match(/([\d+?\.?\d+?万]+)(?=元)/g);

        if(!!!ret){
            /**! 
             * 请规范化玩法介绍中文案的呈现，奖金后面加上"元"作为单位，
             * 并使用阿拉伯数字以及万来表示金额
             */
            self.alertBox("程序出错！");
        }

        $.each(ret, function(index, item){
            !/^[\d\.]+$/.test(item) && (ret[index] = Number(item.slice(0, -1)) * 10000);
        });
        if(/2_4/.test(curId)){
            return ret[ret.length - 2] - 50 - 16 + "~" + (ret[ret.length - 2] - 16)
        }
        return ret[ret.length - 1] + "";
    },

    /**
     * 添加一条选择记录
     */
    addResItem: function(data){
        var count = 0, content;

        switch(curType){
            case "standard":
                for(var i = 0; i < ConfigParam['stars']; i++){
                    if(curRes[i] == undefined || curRes[i] == "*") {
                        count++;
                    } else {
                        curRes[i] = curRes[i].join(",");
                    }
                }
                while(count--){
                    curRes.unshift("*");
                }
                content = curRes.join("|");
                break;
            default:
                content = " 『模板错误』 ";
        }

        $(".ssc-resluts-list").append(
            DOMHelper.createResItemTpl($.extend({content: " " + content + " "}, data || {}))
        );
        
        $(".ssc-resluts-list").scrollTop($(".ssc-resluts-list").children().size()*24);
    },

    /**
     * 弹出层，可扩展
     */
    alertBox: function(msg){
        alert(msg);
    },

    bindMultiSelector: function(){
        var self = this;

        $(".CSR_select").on("change", function(){
            var val = +$(this).val();
            if(val == 0) return;

            for(var s = 0; s < val; s++){

                curRes.length = 0;

                if(curType == "standard" && curFullName.indexOf("三星组选") > -1) {
                    curRes[0] = curRes[1] = [Utils.getRandom()];
                    curRes[2] = [Utils.getRandom()];
                } else{
                    for(var i = 0; i < curNum; i++){
                        curRes.push([Utils.getRandom()]);
                    }
                }

                self.addResItem({
                    "num": 1,
                    "money": 2
                });
            }

            self.refresh().setFinal();
            self.refresh().resetDom();
        });
    }
});


//================================================= SSC/DOMHelper ==//

var DOMHelper = $.extend({}, {

    createTab: function(){
        var str = []
          , i = 0;

        for(var key in ConfigDOM){
            str.push('<a href="#" ' + (i++ == 0 ? 'class="ssc-num_on"' : '') + 
                '>' + key + '</a>|');
        }

        return str.join("");
    },

    createSubTab: function(tplTag){

        return tplTag ? (function(){
            return [
                '<div class="ssc-type-choose">',
                '    <%for(var i = 0; i < this.length; i++){%>',
                '    <span>',
                '        <strong><%this[i]["group"]%>：</strong>',
                '        <%for(var j = 0; j < this[i]["data"].length; j++){',
                '            var tmp = this[i]["data"][j];',
                '            var id = "SSC_" + tmp["pos"][0] + "_" + tmp["pos"][1];',
                '        %>',
                '        <input type="radio" id="<%id%>" data-type="<%tmp["type"]%>" data-tip="<%tmp["intro"]%>" name="ctype" />',
                '        <label for="<%id%>"><%tmp["m"]%></label>',
                '        <%}%>',
                '    </span>',
                '    <%}%>',
                '</div>',
                '<div class="ssc-tip">[玩法介绍]：<% this[0]["data"][0]["intro"]%></div>'
            ].join("\n");
        })() : (function(){
            return [
                '<div class="ssc-type-choose">',
                '    <span>',
                '        <%for(var i = 0; i < this.length; i++){',
                '            var id = "SSC_" + this[i]["pos"][0] + "_" + this[i]["pos"][1];',
                '        %>',
                '        <input type="radio" id="<%id%>" data-type="<%this[i]["type"]%>" data-tip="<%this[i]["intro"]%>" name="ctype" />',
                '        <label for="<%id%>"><%this[i]["m"]%></label>',
                '        <%}%>',
                '    </span>',
                '</div>',
                '<div class="ssc-tip">[玩法介绍]：<%this[0]["intro"]%></div>'
            ].join("\n");
        })();
    },

    ceateItemListSelect: function(num){
        var ret = ["<select>"]
          , opts = {
                "all": "全部",
                "big": "大",
                "small": "小",
                "odd": "偶数",
                "even": "奇数"
            };

        for(var i = num; i <= ConfigParam['total'] - 1; i++){
            ret.push("<option value='" + i + "'>机选" + i + "个</option>");
        }

        for(i in opts){
            ret.push("<option value='" + i + "'>机选" + opts[i] + "</option>");
        }
        ret.push("</select>");

        return ret.join("");
    },

    /**
     * 创建球区块
     * @return {String} DOMString
     */
    createBollLine: function(){
        var self = this
          , ret = ""
          , leftText = [];

        /**
        * @description 多行球的展示
        * @param {Number} line 行数，默认为1
        * @param {Array} table 左侧文案
        * @param {Boolean} tag 是否显示右侧select
        * @return {String} 返回拼接好的字符串
        */
        var chooseLineTpl = function(line, table, tag){  // standard
            var N = ConfigParam['total'] || 10
              , table = table || []
              , str = [];

            for(var s = 0; s < line; s++){
                str = str.concat([
                    '<div class="ssc-selector-item">',
                    '<span class="CSI_label"><i>' + (table[s] || '选择号码') + '</i><em>遗漏</em></span>'
                ]);

                for(var i = 0; i < N; i++){
                    str.push("<span><strong>" + i + "</strong><em>*</em></span>");
                }

                str = str.concat([
                    (typeof tag == "undefined" || !!tag) ? DOMHelper.ceateItemListSelect(1) 
                        + '<a href="#" class="btn">机选号码</a>' : "",
                    '</div>'
                ]);
            }

            return str.join("\n");
        };


        $(".ssc-main-choose").show();
        $(".ssc-main-choose-text").hide();

        var table = "个位,十位,百位,千位,万位,十万位,百万位,千万位".split(",");
        switch(curType){
            case "standard":
                table = table.slice(0, curNum).reverse();
                ret = chooseLineTpl(curNum, table);
                break;
            default:
                // 默认文案
                ret = "<strong>[ERROR]</strong> 配置参数有误，请注意查看 curType 参数是否设置";
        }

        return ret;
    },

    createResItemTpl: function(data){
        var tpl = ['<div data-num="<%num%>" data-type="<%type%>">',
                    '<a href="#">删除</a>',
                    '<span>[<%type%>]</span>',
                    '<%content%>',
                    '(<i><%num%></i>注<i><%money%></i>元)',
                '</div>'].join("");

        var data = $.extend({
            "num": $(".CSR_info span").eq(0).text(),
            "money": $(".CSR_info span").eq(1).text(),
            'type': curFullName,
            "content": " 『模板错误』 "
        }, data || {});

        return tpl.replace(/<%([^%>]+)?%>/g, function(m, a){
            return data[a];
        });             
    }
});


//================================================= SSC/Utils ==//

var Utils = $.extend({}, {

    getRandom: function(except){

        var total = ConfigParam['total'] || 10;

        if(!except || except.length == 0){
            return Math.floor(Math.random()*total);
        }

        var res, tag = true;
        while(1 && tag){
            res = Math.floor(Math.random()*total);
            ($.inArray(res, except) == -1) && (tag = false);
        }
        return res == total ? res - 1 : res;
    },

    getSomeRandom: function(num, except){
        var res = [], args;

        while(num--){
            if(except && res.length == 0){
                args = except;
            } else {
                args = Utils.unique((except || []).concat(res));
            }
            var tmp = this.getRandom(args);
            res.push(tmp);
        }

        return res;
    },

    unique: function(arr){
        var hash = {}, i = 0, ret = [];

        for(; i < arr.length; i++ ) !hash[arr[i]] && (hash[arr[i]] = 1)
        for(i in hash) ret.push(Number(i));

        return ret;
    },

    tplEngine: function(tpl, data) {
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
    },

    repeat: function(str, N){
        var res = ""
        while(N--){
            res += str;
        }
        return res;
    },


    combination: function(a, b){
        var resX = 1, resY = 1, tmp = b;
        while(tmp){
            resX *= a;
            a--;tmp--;
        }
        while(b){
            resY *= b;
            b--;
        }
        return resX / resY;
    },
    
    permutation : function(a, b){
        var ret = 1;
        while(b){
            ret *= a--;
            b--;
        }
        return ret;
    }
});

})(window, undefined);