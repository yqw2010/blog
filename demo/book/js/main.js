/**
 * @author barret lee
 * @email jingmingjun92@163.com
 * @date 2013/07/11 created
 */

$(function() {
    /**
     *  =================default config=================
     */
    var url = "end",
        //baseUrl = "http://tc-map-data-webming04.tc.baidu.com:8689/book/api/",
        baseUrl = "./json/",
        $form = $("#formContent").clone(true),
        submitBtnDisable = false;

    var options = {
        "nav": [
            "首页",
            "端统计分析",
            "酒店类型统计分析",
            "地域性统计分析",
            "时间段统计分析",
            "价格统计分析",
            "城市统计分析",
            "入住时间差分析",
            "按入住时间分析"
        ],
        "hash": [
            "",
            "end",
            "hotelType",
            "reginal",
            "time",
            "price",
            "city",
            "booktimediff",
            "checkin"
        ],
        "cur": 0
    };

    var ajaxConfig = {
        url: url,
        type: "GET",
        data: $("form.multichoose").serialize(),
        dataType: "json",
        timeout: 10000,
        beforeSend: function() {
            $("#submitBtn").addClass("wait").val("加载中...");
            submitBtnDisable = true;
        },
        success: function(data) {
            doSuccess(data);
        },
        error: function(data) {
            // console.log(data);
            winLog("请求出错，请联系前台开发人员！");
        }
    };

    var $painer = $("#pic-show").get(0),
        lineChart;
    var config = {
        chart: {
            type: 'line',
            renderTo: $painer,
            marginRight: 130,
            marginBottom: 50
        },
        title: {
            text: "",
            x: -20
        },
        subtitle: {
            // text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            title: {
                text: 'Number (PV)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'PV'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 100,
            borderWidth: 0
        },
        series: []
    };

    var configPie = {
        chart: {
            renderTo: $painer,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            marginRight: 130,
            marginBottom: 50
        },
        title: {
            text: '城市统计分析'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function() {
                        return '<b>' + this.point.name + '</b>: ' + this.percentage.toFixed(0) + ' %';
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'PV',
            data: []
        }]
    };

    //initial chart
    lineChart = new Highcharts.Chart(config);


    $(document).ready(function() {
        var hash = window.location.hash.slice(3).toString(),
            i = options["hash"].indexOf(hash);

        (i > 0) && $("#home li").eq(i - 1).trigger("click");
        
        $("#from").val(getDate(-30));
        $("#to").val(getDate(0));

        removeAllItem(hash);
    });
    /**
     *  =================page move module=================
     */
    var $home = $("#home"),
        $main = $("#main"),
        $nav_li = $(".nav-list li");

    $("li", $home).on("click", function(evt) {
        var index = $(this).index();

        $home.animate({
            "left": "-960px",
            "opacity": 0
        }, 600, function() {
            $(this).css("left", "-9999px");
        });
        setTimeout(function() {
            $main.css({
                "top": "-424px",
                "left": "960px",
                "display": "block",
                "opacity": 0
            }).hide().show().animate({
                "left": 0,
                "opacity": 1
            }, 600, function() {
                $("#footer").css("position", "relative").animate({
                    "top": "-=" + ($("#footer").offset().top - $main.offset().top - $main.height() - 30)
                });
            });

            $nav_li.eq(index + 1).trigger("click");
        }, 300);

        evt.preventDefault();
    });

    $(".nav-list li").eq(0).on("click", function(evt) {
        $main.animate({
            "left": "960px",
            "opacity": 0
        }, 600);
        setTimeout(function() {
            $home.css("left", "-960px").animate({
                "left": 0,
                "opacity": 1
            }, 600, function() {
                $("#footer").css("position", "relative").animate({
                    "top": "-=" + ($("#footer").offset().top - $home.offset().top - $home.height() - 30)
                });
            });
        }, 300);

        window.location.hash = "";
        evt.preventDefault();
    });



    /**
     *  =================data exchange module=================
     */
    $(".nav-list li a").on("click", function(evt) {
        evt.preventDefault();
    });

    //data change
    $nav_li.on("click", function() {
        var index = $(this).index();
        var v = options["hash"][index];
        window.location.hash = "#!/" + v;
        document.title = v ? ("Kinds | " + v.replace(/./, function(v) {
            return v.slice(0, 1).toUpperCase() + v.slice(1);
        })) : "Analysis | Index";

        removeAllItem(v);

        //recover button after ajax
        $("#submitBtn").removeClass("wait").val("查询");
        submitBtnDisable = false;

        $nav_li.eq(options["cur"]).children().removeAttr("id");
        $nav_li.eq(index).children().attr("id", "nav-list-on");
        options["cur"] = index;

        config.title.text = options["nav"][options["cur"]];

        lineChart = new Highcharts.Chart(config);
        $("text>tspan:contains(Highcharts.com)").hide();
    });

    /**
     *  =================fullscreen module=================
     */
    if (navigator.appVersion.indexOf("MSIE") == -1) {
        //fullscreen
        $("<div class='fullscreen' id='fullscreen'/>").text("全屏").appendTo($("#pic-show-container"));
        $("#fullscreen").toggle(function() {
            $("#pic-show").css({
                "width": "100%",
                "position": "absolute",
                "top": 0,
                "left": 0,
                "bottom": 0,
                "right": 0,
                "z-index": 1000
            }).appendTo($("body"));
            $(this).appendTo($("body")).text("退出全屏");
            $(window).resize();
        }, function() {
            $("#pic-show-container").append($(this)).append($("#pic-show").html("").css("position", "static"));
            $(".fullscreen").text("全屏")
            lineChart = new Highcharts.Chart(config);
            $("#submitBtn").trigger("click");
        });
    }
    /**
     *  =================ajax module=================
     */

    //bind ajax
    $("#submitBtn").on("click", function() {
        submitFun();
    });

    function submitFun() {
        var evt = event || window.event;
        if (submitBtnDisable) return;

        if (checkDate() < 0) {
            $("#submitBtn").removeClass("wait").val("查询");
            submitBtnDisable = false;
            winLog("亲~ 开始时间不能大于结束时间！！！");
            return;
        }

        //ajaxConfig.url = baseUrl + options["hash"][options["cur"]];
        ajaxConfig.url = baseUrl + options["hash"][options["cur"]] + ".json";
        ajaxConfig.data = $("form.multichoose").serialize();
        $.ajax(ajaxConfig);

        evt.preventDefault();
    }

    //ajax require success

    function doSuccess(data) {
        var res = data,
            kinds = [],
            categories = [],
            arrData = [],
            Ni = 0,
            Nj = 0;

        if (res["data"] == "" && res["status"] == 0) {
            $("#submitBtn").removeClass("wait").val("查询");
            submitBtnDisable = false;
            winLog("数据为空，请扩大筛选范围~");
            return;
        }

        try {
            if (res['status'] == 1) {
                winLog("状态码错误，请联系后台开发人员！");
                $("#submitBtn").removeClass("wait").val("查询");
                submitBtnDisable = false;
                return;
            }

            if (options["cur"] != 4 && options["cur"] != 6 && options["cur"] != 8) {
                //return kinds as: pc andriod webapp ios
                for (var x in res['data']) {
                    for (var y in res['data'][x]) kinds.push(y);
                    break;
                }

                //return arrData as: [arrPC, arrAndriod, aeeWebapp, arrIOS]
                for (var i = 0; i < kinds.length; i++) arrData.push([]);

                //get the xAxis length
                for (var z in res["data"]) Nj++;
                for (var z in res["data"]) {
                    // d = [year, month, day];
                    var d = z.toString().match(/(\d+)-(\d+)-(\d+)/).slice(1);
                    var tempDate = (Nj > 10) ? d[2] : (d[1] + "-" + d[2]);
                    categories.push(tempDate);
                    for (var j = 0; j < kinds.length; j++) {
                        arrData[Ni].push(+res['data'][z][kinds[j]]);
                        Ni++;
                    }
                    Ni = 0;
                }
            } else if (options["cur"] == 4) {
                for (var x in res['data']) {
                    kinds.push(x);
                    var arr = [];
                    for (var y in res['data'][x]) {
                        arr.push(res['data'][x][y]);
                    }
                    arrData.push(arr);
                }
                for (var i = 0; i < 24; i++) {
                    categories.push((i < 10) ? ("0" + i) : i);
                }
            }  else if (options["cur"] == 8) {
                var arr = [];
                for (var x in res['data']) {
                    categories.push(x.slice(-2));
                    arr.push(res['data'][x]);
                }
                kinds.push("入住时间分析");
                arrData.push(arr);
            } 
        } catch (e) {
            $("#submitBtn").removeClass("wait").val("查询");
            submitBtnDisable = false;
            winLog("数据出错，请联系后台开发人员！");
        }

        if (options["cur"] == 6) {
            var total = 0;

            for (var x in res['data']) total += Number(res['data'][x]);
            for (var x in res['data']) {
                var temp = res['data'][x];
                if (Ni++ == 3) {
                    categories.push({
                        name: x,
                        y: parseInt(temp),
                        sliced: true,
                        selected: true
                    });
                    continue;
                }
                categories.push([x, parseInt(temp)]);
            }


            configPie.series[0].data = categories;

            //console.log(configPie);
            lineChart = new Highcharts.Chart(configPie);
            $("text>tspan:contains(Highcharts.com)").hide();

        } else {
            config.xAxis.categories = categories;
            for (var j = 0; j < kinds.length; j++) {
                config.series.push({
                    "name": kinds[j],
                    "data": arrData[j]
                });
            }

            //repaint
            lineChart = new Highcharts.Chart(config);
            $("text>tspan:contains(Highcharts.com)").hide();
        }

        //recover button after ajax
        $("#submitBtn").removeClass("wait").val("查询");
        submitBtnDisable = false;

        config.series = [];
        configPie.data = [];
    }


    /**
     *  =================utils module=================
     */
    /**
     * [removeAllItem description]
     * @param  {[String | Number]} obj
     * @return {[undefined]}
     */

    function removeAllItem(obj) {
        switch (obj) {
            case "hotelType":
                removeItem("#type,[for=type]");
                break;
            case "time":
                removeItem("#price,[for=price]");
                break;
            case "price":
                removeItem("#price,[for=price]");
                break;
            case "city":
                removeItem("#city,[for=city]");
                break;
            case "checkin":
            case "booktimediff":
                removeItem("#book_checkin,[for=book_checkin]");
                break;
            default:
                removeItem("select, [for=type], [for=price], [for=city], [for=booktimediff], [for=device], br");
                break;
        }
    }
    /**
     * [removeItem description]
     * @param  {[String]} str
     * @return {[undefined]}
     */

    function removeItem(str) {
        var $temp = $form.clone(true);

        $temp.find(str).remove();
        $("#formContent").after($temp);
        $("#formContent").eq(0).remove();

        //bind ajax
        $("#submitBtn").off().on("click", function() {
            submitFun();
        });
    }
    /**
     * [winLog description]
     * @param  {[String]} msg
     * @return {[undefined]}
     */

    function winLog(msg) {
        var $box = $("<div/>").css({
            "line-height": "50px",
            "font-size": "22px",
            "border-bottom": "1px solid #238432",
            "text-align": "center",
            "position": "absolute",
            "top": "-100px",
            "width": "100%",
            "min-height": "50px",
            "background": "orange",
            "z-index": "9999"
        });

        $box.html(msg).appendTo($("body")).hide();

        $box
            .show()
            .animate({
                "top": 0
            }, 800)
            .delay(2000)
            .animate({
                "top": "-100px"
            }, 800, function() {
                $(this).remove();
            })
    }
    //check date

    function checkDate() {
        var from = $("#from").val(),
            to = $("#to").val();
        return new Date(to).getTime() - new Date(from).getTime();
    }

    /**
     * [getDate description]
     * @param  {[String | Number]} day
     * @return {[String]}
     */

    function getDate(day) {
        var num, dayBefore, y, m, d, res;
        switch (day) {
            case "today":
            case 0:
                num = 0;
                break;
            case "tomorrow":
            case 1:
                num = 1;
                break;
            case "yersterday":
            case -1:
                num = -1;
                break;
            default:
                num = day;
                break;
        }

        dayBefore = new Date(new Date() * 1 + 1000 * 3600 * 24 * num),
        y = dayBefore.getFullYear(),
        m = dayBefore.getMonth() + 1,
        d = dayBefore.getDate(),
        res = y + "-" + (m < 10 ? ("0" + m) : m) + "-" + (d < 10 ? ("0" + d) : d);

        return res;
    }
});