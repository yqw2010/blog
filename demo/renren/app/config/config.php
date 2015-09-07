<?php
header ( 'Content-Type: text/html; charset=UTF-8' );

// 调试模式开关
define ( 'DEBUG_MODE', false );

if (! function_exists ( 'curl_init' )) {
	echo '您的服务器不支持 PHP 的 Curl 模块，请安装或与服务器管理员联系。';
	exit ();
}

// App Key
define ( "APP_KEY", 'e76e7487ad45492db39a711145bb7859' );
// App Secret
define ( "APP_SECRET", '53023037e28d4ac3acfce84018f81e85' );
// 应用回调页地址
define ( "CALLBACK_URL", "http://qianduannotes.sinaapp.com/renren/app/login.php" );

error_reporting ( E_ERROR );

if (DEBUG_MODE) {
	error_reporting ( E_ALL );
	ini_set ( 'display_errors', true );
}
