<?php
session_start ();

include_once ('./config/config.php');
include_once ('./rennclient/RennClient.php');

$rennClient = new RennClient ( APP_KEY, APP_SECRET );
$rennClient->setDebug ( DEBUG_MODE );

// 生成state并存入SESSION，以供CALLBACK时验证使用
if(empty($_SESSION['renren_state'])){
    $state = uniqid ( 'renren_', true );
    $_SESSION ['renren_state'] = $state;
}else{
    $state = $_SESSION ['renren_state'];
}
// 得认证授权的url
$code_url = $rennClient->getAuthorizeURL ( CALLBACK_URL, 'code', $state );

// 处理code -- 根据code来获得token
if (isset ( $_REQUEST ['code'] )) {
    $keys = array ();
    
    // 验证state，防止伪造请求跨站攻击
    $state = $_REQUEST ['state'];
    if (empty ( $state ) || $state !== $_SESSION ['renren_state']) {
        echo '非法请求！';
        exit ();
    }
    unset ( $_SESSION ['renren_state'] );
    
    // 获得code
    $keys ['code'] = $_REQUEST ['code'];
    $keys ['redirect_uri'] = CALLBACK_URL;
    try {
        // 根据code来获得token
        $token = $rennClient->getTokenFromTokenEndpoint ( 'code', $keys );
    } catch ( RennException $e ) {
        var_dump ( $e );
    }
}

if (! empty($token)) {
    header("location:index.php");
} else {
?>
<a href="<?php echo $code_url; ?>" style="color:red;background:#FFF;display:block;text-align:center;line-height:24px;">登录</a>
<?php
}
?>
