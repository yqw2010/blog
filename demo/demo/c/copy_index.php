<?php
    echo file_get_contents( "http://www.baidu.com/s?word=%E7%BD%91%E7%AB%99%E5%88%B6%E4%BD%9C&tn=sitehao123&ie=utf-8" );
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