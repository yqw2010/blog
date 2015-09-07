window.onload = function (){
	var t = document.getElementById("toggle"),
		f = document.getElementById("fix");

	t.onclick = function(){
		if(this.innerHTML == "隐藏") {
			f.className = "fix fhide";
			this.innerHTML = "显示";
		}else{
			f.className = "fix";
			this.innerHTML = "隐藏";
		}
	};

	function e(n){
		var p = document.getElementById("pre-" + n),
			s = document.getElementById("style-" + n);

		setInterval(function(){
			s.innerHTML = p.innerHTML.replace(/<\w+>|<\/\w+>/g, "");
		}, 80);
	}



	for(var i = 1; i <= 3; i++) e(i);

};