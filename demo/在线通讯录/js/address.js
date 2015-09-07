$(document).ready(function(){
    //判断兼容性
    if(!window.localStorage){
        alertBox("浏览器不支持本地储存！");
        return;
    }else{
        for(var i in localStorage){
            var value = localStorage.getItem(localStorage.key(i)).split(",");
            var Tr = "<tr>" + 
                    "<td>" + value[0] + "</td>" + 
                    "<td>" + value[1] + "</td>" + 
                    "<td>" + value[2] + "</td>" + 
                 "</tr>";
            $("#tb").append(Tr);
        }
    }
    /* 
    for(var i in localStorage){
        localStorage.removeItem(localStorage.key(i));
    }
    */
    var $name, $phone, $address;


    $("#tb tr:eq(0)").css("background-color", "#f4f4f4");
    $("#tb").delegate("tr", "contextmenu", function(evt){
        if($(this).index() == 0){
            evt.preventDefault();
        }else{
            var x   = evt.pageX,
                y   = evt.pageY,
                box = $("<div/>"),
                target = evt.target;

            $(box)
            .attr("id", "menu")
            .css({
                "top"    : y - 2 + "px",
                "left"   : x - 2 + "px"
            })
            .html("<ul><li id='del'>删除</li></ul>")
            .appendTo($("body"))
            .mouseleave(function(){
                $(this).fadeOut(120,function(){
                    $(this).remove();
                });
            });
/*
            //edit
            $("#edit").click(function(){
                var editObj = target.parentNode;
                if(editObj.nodeName.toUpperCase() == "TR"){
                    var childs = $(editObj).find("td");
                    //console.log($(childs));
                    for(var i in childs){
                        console.log(childs[i]);
                        $(childs[i]).html("<input type='text' value='" + $(childs[i]).text() + "' />");
                        $(box).remove();
                    }
                }else{
                    alertBox("It seems something wrong~");
                }
            });
*/
            //del
            $("#del").click(function(){
                var rmObj = target.parentNode;
                if(rmObj.nodeName.toUpperCase() == "TR"){
                    var key = $(rmObj).children("td:first").text();
                    localStorage.removeItem(localStorage.key(rmObj));
                    $(rmObj).remove();
                    $(box).remove();
                }else{
                    alertBox("It seems something wrong~");
                }
            });
        }
        evt.preventDefault();
    });
    //绑定
    $("#add").bind("click", function(){
        getInfo();
        if($name == "" || $phone == ""){
            alertBox("姓名和电话不能为空~");
            //alertBox("姓名和电话不能为空~");
            return ;
        }
        if(localStorage[$name]) {
            alertBox("用户 ‘" + $name + "’ 已经储存!");
            return;
        }
        var Tr = "<tr>" + 
                    "<td>" + $name + "</td>" + 
                    "<td>" + $phone + "</td>" + 
                    "<td>" + $address + "</td>" + 
                 "</tr>";
        $("#tb").append(Tr);
        localStorage.setItem($name, [$name, $phone, $address].join(","));
    });
    //清空 
    $("#zero").bind("click", function(){
        $("#name, #phone, #address").val("");
    });



//Utils 小工具 
    function getInfo(){
        $name    = $("#name").val(),
        $phone   = $("#phone").val(),
        $address = $("#address").val();
    }

   
});

var timer;
function alertBox(msg){
    timer = null;
    var box = $("<div/>");
    $(box)
    .css({
        "width"    : 260,
        "min-height": 50,
        "position" : "absolute",
        "top"      : "-200px",
        "left"     : ($(window).width() - 300) / 2 + "px",
        "padding"  : 20,
        "border"   : "1px solid #fefefe",
        "opacity"  : 0,
        "text-align": "center",
        "background-color": "#eee",
        "font-size": 14
    })
    .attr("id", "alertBox")
    .html(msg)
    .appendTo($("body"))
    .animate({
        "opacity"  : 1,
        "top"      : 0
    }, 600);

    timer = setTimeout(function(){
        $("#alertBox").fadeOut(300,function(){
            $(this).remove();
        });
    }, 1500);
}