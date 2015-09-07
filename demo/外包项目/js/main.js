/**
*=======================================
* @Author Barret Lee
* @Date 2013/04/23
* @e-mail jingmingjun92@163.com
* @Blog http://hustskyking.cnblogs.com
*=======================================
*/

$(document).ready(function(e) {
	var w = $(window).width(), timer;
	$("body").css("zoom", parseInt(w) / 1440);
    $("#line").animate({"width": "50%"}, 2000, 'linear', function(){
		$("#line").animate({"width": "100%"}, 2000, 'linear');
		$("#text").animate({"width": "50%"}, 2000, 'linear', function(){		
			$("#bird").fadeIn(2000);
		});
	});
	$(window).resize(function(){
		clearTimeout(timer);
		timer = setTimeout(function(){			
			var w = $(window).width();
			$("body").css("zoom", parseInt(w) / 1440);
		}, 50);
	});
});
