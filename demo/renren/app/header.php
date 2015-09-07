<?php
session_start ();

include_once ('./config/config.php');
include_once ('./rennclient/RennClient.php');

$rennClient = new RennClient ( APP_KEY, APP_SECRET );
$rennClient->setDebug ( DEBUG_MODE );

try{
    // 获得保存的token
    $rennClient->authWithStoredToken ();
} catch( RennException $e ) {
    header("location:login.php");
}