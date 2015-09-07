<?php
    $s = "https://graph.renren.com/oauth/token?client_id=dea3ca3d754148a8821f6e610724e4be&redirect_uri=http://qianduannotes.sinaapp.com/renren/index.html&grant_type=authorization_code&client_secret=e892e6e8ed4740099f05d1d026358f11&" . PHP_URL_QUERY;

    $r = file_get_contents($s);

    echo json_encode($r);
?>