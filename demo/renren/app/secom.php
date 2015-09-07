<?php
//include_once ("./header.php");
include_once ("./resolve.php");

error_reporting(E_ERROR);
//$resolve = new Resolve();

// 获取用户信息，并解析返回
//$users = $resolve->defaultList();
$cps = Array();
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
    <title>找学长 找工作</title>
    <link rel="stylesheet" type="text/css" href="./css/main.css" />
</head>
<body>

<div class="wraper secom-page">
    <div class="search">
        <label for="search"></label>
        <input type="search" placeholder="搜公司" id="search" />
    </div>
    <ul class="res-list">
        <?php  for ($i = 0; $i < count($cps)+1; $i++) {
            $cp = $cps[$i];
        ?>
        <li>
            <div class="cimg">
                <img src="" />
            </div>
            <div class="crelation">

            </div>
        </li>
        <?php } ?>
    </ul>
</div>

<script type="text/javascript" src="./js/jquery.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){

    //search btn
    $("#search").on("change", function(evt){
        var val;
        if(evt.keyCode == 13){   
            val = $(this).val();
            val && console.log("var1, var2");
        }
    });

</script>
</body>
</html>