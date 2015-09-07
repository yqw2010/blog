//collection.js
var getObj = function ( id ) {
    //获取对象
    var ele = document.getElementById(id);
    //返回结果
    return {
        element: ele,
        startPos: 0,
        endPos: 0,
        init: function(){
            var _this = this;
            if( !("__proto__" in {}) ){
                this.element.attachEvent("onmouseup", _this.getPos);
            }else{
                this.element.addEventListener("mouseup", _this.getPos, false);
            }
            return this;
        },
        getPos: function () {
            var _this = this;
            if( document.selection ) {
                try{
                    var range  = document.selection.createRange();
                    var drange = range.duplicate();
                    drange.moveToElementText( _this.element );
                    drange.setEndPoint( "EndToEnd", range );
                    this.startPos = drange.text.length - range.text.length;
                    this.endPos   = this.startPos + range.text.length;
                }catch(e){

                }
            }else if( window.getSelection ){
                try{
                    this.startPos = this.element.selectionStart;
                    this.endPos   = this.element.selectionEnd;
                }catch(e){
                    //throw new Error("getPos error");
                }
            }
            return this;
        },
        setPos: function ( m, n ) {
            var arg2 = n || m;
            if( document.selection ) {
                var range = document.selection.createRange();
                range.collapse(true);
                range.moveEnd('character', arg2);
                range.moveStart('character', m);
                this.element.focus();
            }else if( window.getSelection ){
                this.startPos = this.element.selectionStart = m;
                this.endPos   = this.element.selectionEnd = arg2;
                this.element.focus();
            }
        },
        getStr: function( m, n ){
            this.getPos( m, n );
            return this.element.value.toString().slice(this.startPos, this.endPos);
        }
    };
};








function shake(e, oncomplete, distance, time){
	if(typeof e === "string") e = document.getElementById(e);
	if(!time) time = 500;
	if(!distance) distance = 5;

	var originalStyle = e.style.cssText;
	e.style.position = "relative";
	var start = (new Date()).getTime();
	animate();

	function animate(){
		var now = (new Date()).getTime();
		var elapsed = now - start;
		var fraction = elapsed / time;

		if(fraction < 1){
			var x = distance * Math.sin(fraction * 4 * Math.PI);
			e.style.left = x + "px";
			setTimeout(animate, Math.min(25, time - elapsed));
		}else {
			e.style.cssText = originalStyle;
			if(oncomplete) oncomplete(e);
		}
	}
}


function fadeOut(e, oncomplete, time){
	if(typeof e === "string") e = document.getElementById(e);
	if(!time) time = 500;

	var ease = Math.sqrt;
	var start = (new Date()).getTime();
	animate();

	function animate(){
		var elapsed = (new Date()).getTime() - start;
		var fraction = elapsed / time;
		if(fraction < 1){
			var opacity = 1 - ease(fraction);
			e.style.opacity = String(opacity);
			setTimeout(animate, Math.min(25, time - elapsed));
		}else {
			e.style.opacity = "0";
			if(oncomplete) oncomplete(e);
		}
	}
}







var DomReady = (function(){
	var funcs = [];
	var ready = false;

	function handler(e){
		if(ready) return;
		if(e.type === "readyStateChange" && document.readyState !== "complete") return;

		for(var i = 0, len = funcs.length; i< len; i++){
			funcs[i].call(document);

			ready = true;
			funcs = null;
		}
	}

	if(document.addEventListener){
		document.addEventListener("DOMContentLoaded", handler, false);
		document.addEventListener("readyStateChange", handler, false);
		//这里考虑window是为了兼容古董浏览器
		window.addEventListener("load", handler, false);
	}else{
		document.attachEvent("onreadyStateChange", handler);
		window.attachEvent("onload", handler);
	}

	return function DomReady( f ){
		if(ready) f.call(document);
		else funcs.push(f);
	};	
}());









