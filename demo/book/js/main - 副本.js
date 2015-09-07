/**
* @author barret lee
* @email jingmingjun92@163.com
* @date 2013/07/11 created
*/

$(function () {
/**
*  =================default config=================
*/
    var submitBtnDisable = false;
    var options = {
        "nav": [
            "首页",
            "端统计分析",
            "酒店类型统计分析",
            "地域性统计分析",
            "时间段统计分析",
            "价格统计分析",
            "城市统计分析",
        ],
        "hash": [
            "",
            "end",
            "hotelType",
            "reginal",
            "time",
            "price",
            "city"
        ],
        "cur": 0
    }; 

    var url  = "./test.php";
    var baseUrl = "http://tc-map-data-webming04.tc.baidu.com:8689/book/api/";
    var ajaxConfig = {
        url: url,
        type: "GET",
        data: $("form.multichoose").serialize(),
        dataType: "json",
        timeout: 10000,
        beforeSend: function(){
            $("#submitBtn").addClass("wait").val("加载中...");
            submitBtnDisable = true;
        },
        success: function(data){
            doSuccess(data);
        },
        error: function(data){
            console.log(data);
            winLog("请求出错，请联系前台开发人员！");
        }
    };    

    var $painer = $("#pic-show").get(0), lineChart;
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

    //initial chart
    lineChart = new Highcharts.Chart(config);


    $(document).ready(function(){
        var i = options["hash"].indexOf(window.location.hash.slice(3).toString());
        (i > 0) && $("#home li").eq(i - 1).trigger("click");
    });
/**
*  =================page move module=================
*/
    var $home = $("#home"),
        $main = $("#main"),
        $nav_li = $(".nav-list li");

    $("li", $home).bind("click", function(evt){
        var index = $(this).index();

        $home.animate({
            "left": "-960px",
            "opacity": 0
        }, 600, function(){
            $(this).css("left", "-9999px");
        });
        setTimeout(function(){
            $main.css({
                "top": "-424px", 
                "left": "960px", 
                "display": "block",
                "opacity": 0
            }).hide().show().animate({
                "left": 0,
                "opacity": 1
            }, 600, function(){
                $("#footer").css("position", "relative").animate({
                    "top": "-=" + ($("#footer").offset().top - $main.offset().top - $main.height() - 30)
                });
            }); 

            $nav_li.eq(index + 1).trigger("click");
        }, 300);

        evt.preventDefault();
    });

    $(".nav-list li").eq(0).bind("click", function(evt){
        $main.animate({
            "left": "960px",
            "opacity": 0
        }, 600);
        setTimeout(function(){
            $home.css("left", "-960px").animate({
                "left": 0,
                "opacity": 1
            }, 600, function(){
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
    $(".nav-list li a").click(function(evt){evt.preventDefault();});

    //data change
    $nav_li.bind("click", function(){
        var index = $(this).index();
        var v = options["hash"][index];
        window.location.hash = "#!/" + v;
        document.title = v ? ("Kinds | " + v.replace(/./, function(v){
            return v.slice(0, 1).toUpperCase() + v.slice(1) ;
        })) : "Analysis | Index";


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
*  =================ajax module=================
*/
    //bind ajax
    $("#submitBtn").click(function(evt){

        if(submitBtnDisable) return;

        if(checkDate() < 0) {
            winLog("亲~ 开始时间不能大于结束时间！！！")
            return;
        }

        ajaxConfig.url = baseUrl + options["hash"][options["cur"]];
        $.ajax(ajaxConfig);

        evt.preventDefault();
    });

    //ajax require success
    function doSuccess(data) {
        var res = data, kinds = [], categories = [], arrData = [], Ni = 0;

        try{
            if(res['status'] == 1) {
                winLog("状态码错误，请联系后台开发人员！");
                return;
            }

            //return kinds as: pc andriod webapp ios
            for(var x in res['data']){
                for(var y in res['data'][x]) kinds.push(y);
                break;
            }
                
            //return arrData as: [arrPC, arrAndriod, aeeWebapp, arrIOS]
            for(var i = 0; i < kinds.length; i++) arrData.push([]);
                
            //get the xAxis length
            for(var z in res["data"]) Nj++;
            for(var z in res["data"]) {
                // d = [year, month, day];
                var d = z.toString().match(/(\d+)-(\d+)-(\d+)/).slice(1);
                var tempDate = (Nj > 10) ? d[2] : (d[1] + "-" + d[2]);
                categories.push(tempDate);
                for(var j = 0; j < kinds.length; j++){
                    arrData[Ni].push( +res['data'][z][kinds[j]] );  
                    Ni++;
                }
                Ni = 0;
            }
        } catch (e) {
            winLog("数据出错，请联系后台开发人员！");
        }

        config.xAxis.categories = categories;
        for(var j = 0; j < kinds.length; j++){
            config.series.push({
                "name": kinds[j],
                "data": arrData[j]
            });
        }

        //repaint
        lineChart = new Highcharts.Chart(config);
        $("text>tspan:contains(Highcharts.com)").hide();

        //recover button after ajax
        $("#submitBtn").removeClass("wait").val("查询");
        submitBtnDisable = false;

        config.series = [];
    }


/**
*  =================utils module=================
*/
    //log platform
    function winLog (msg){
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
        .animate({"top": 0}, 800)
        .delay(2000)
        .animate({"top": "-100px"}, 800, function(){
            $(this).remove();
        })
    }
    //check date
    function checkDate(){
        var from = $("#from").val(),
            to = $("#to").val();
        return new Date(to).getTime() - new Date(from).getTime();
    }
});
