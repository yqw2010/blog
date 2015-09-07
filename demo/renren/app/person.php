<?php
include_once ("./header.php");
include_once ("./resolve.php");

$resolve = new Resolve();

// 获取用户信息，并解析返回
$users = $resolve->defaultList();
//echo "<pre>";
//print_r($users);
//echo "</pre>";

?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />
    <meta http-equiv="Cache-Control" content="no-cache" />
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <title>师兄主页</title>
    <link rel="stylesheet" type="text/css" href="./css/main.css" />
</head>
<body>

<div class="wraper person-page">
    <div class="person clearfix">
        <a href="./person.php?id=<?php echo $user["id"]; ?>" class="avatar" style="background-image:url('<?php echo $user['avatar'];?>')"></a>
        <div class="pdetail">
            <p><em>姓名：</em><span>王强</span></p>
            <p><em>学校：</em><span>华中科技大学</span></p>
            <p><em>工作：</em><span>百度</span></p>
            <p>
                <em>爱心指数：</em><span class="rate">ღღღღღ</span>
            </p>
        </div>
        <i></i>
    </div>

    <div id="more-list">
        <h3>帮助过：</h3>
        <div class="plist">
            <a href="#"><img src="" /></a>
            <a href="#"><img src="" /></a>
            <a href="#"><img src="" /></a>
            <a href="#"><img src="" /></a>
            <a href="#"><img src="" /></a>
            <a href="#"><img src="" /></a>
        </div>
        <h3>你朋友认识他的人：</h3>
        <div class="plist">
            <a href="#"><img src="" /></a>
            <a href="#"><img src="" /></a>
            <a href="#"><img src="" /></a>
            <a href="#"><img src="" /></a>
            <a href="#"><img src="" /></a>
        </div>
    </div>
</div>

<div id="flow-rate">
    <a href="#" class="pinfoA">帮助过我</a>
    <a href="#" class="pinfoA follow">加为好友</a>
</div>

<!-- alert box -->
<div id="alertBox" style="display:none;">
    <h3>给师兄打个分吧~</h3>
    <div>
        <span>不热心</span>
        <span class="alertBox-star"><strong class="red-star">ღღღღღ</strong><strong>ღღღღღ</strong></span>
        <span>热心</span>
    </div>
    <div>
        <a href="#" class="alertBox-cancel">取消</a>
        <a href="#" class="alertBox-OK">确定</a>
    </div>
</div>
<script type="text/javascript" src="./js/jquery.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){

    //five star rate layer
    $("#flow-rate a:eq(0)").on("click", function(){
        $("<div/>").attr("id", "alertLayer").css({
            "position": "absolute",
            "top": 0,
            "right": 0,
            "bottom": 0,
            "left": 0,
            "background": "#FFF",
            "opacity": "0.1",
            "z-index": 99
        }).appendTo($("body"));

        $("#alertBox").fadeIn();

        $("#alertBox a").on("click", function(){
            $("#alertBox").fadeOut(function(){
                $("#alertBox a").off();
                $("#alertLayer").remove();
            });
        });
    });
});
</script>
</body>
</html>