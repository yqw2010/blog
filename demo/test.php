<?php
	header("Content-Type","text/html");
	$html = file_get_contents('http://www.baidu.com/index.html');	
	$html = iconv("GBK", "UTF-8", $html);
	echo $html;
?>

1. setTimeout加入到队列的后面 所以结果是66

var a = 6;
setTimeout(function () {
    alert(a);
    var a = 666;
}, 1000);
a = 66;