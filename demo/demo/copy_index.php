<?php
    header("Access-Control-Allow-Origin: *");
    function decodeURIComponent($text) {
        $text = preg_replace("/\%u([0-9A-F]{4,4})/e", "'&#'. base_convert('\\1', 16, 10) .';'", $text);
        return $text;
    }

    if( isset( $_GET['demo'] ) ){
        $data = $_GET['demo'];
        $html = "";
        if( $data ){
            $html = file_get_contents( decodeURIComponent( $data ) );
            echo $html;
        }
    }
?>
<script type="text/javascript">
    window.onload = setTimeout(doit, 100);

    function doit(){
        var tops = [], i = 1;
        for(; i < 10; i++){
            var obj = document.getElementById(i);
            if(obj.className == "result" || obj.className == "result-op"){
                var count = 0;
                while(obj != null && obj != document.body) { 
                    count = obj.offsetTop;
                    obj = obj.offsetParent;
                }
                tops.push(count);   
            }
            continue;
        }
        window.top.hashString = tops.join(",");
    }
</script>