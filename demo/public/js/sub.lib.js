//clone -> prototype chain
function clone(object) {
	//function instanceof Object -> true
	//object instanceif Object -> ture
	//Object.prototype.toString.call(object) === '[object Object]' -> true
	//Object.prototype.toString.call(function) === '[object Object]' -> false, it should be a string '[object Function]'
	//We request that the arguements 'object' is absolutely an Object here, so we choose the prototype toString()
	if( Object.prototype.toString.call(object) !== '[object Object]') {
		throw new Error("We request that the arguements is an object here");
	}
	var F = function() {};
	F.prototype = object;
	return new F;
}

//extend -> class chain
function extend(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    
    subClass.superClass = superClass.prototype;
    if( superClass.prototype.constructor == Object.prototype.constructor ) {
        superClass.prototype.constructor = superClass;
    }
}

//interface ensurImpelements
var Interface = function(name, method) {
	if( arguments.length != 2 ) {
		throw new Error("Interface constructor called with " +
		arguments.length + " arguments, but expected exactly 2.");
	}
	this.name = name;
	this.method = [];
	for( var i = 0, len = method.length; i < len; i++ ) {
		if( typeof method[i] != 'string' ) {
			throw new Error("Interface construtor expects " + 
			"method names to be passed in as in a string");
		}
		this.method.push(method[i]);
	}
}

Interface.ensureImplements = function(object) {
	if( arguments.length < 2 ) {
		throw new Error("Interface constructor called with " + 
		arguments.length + " arguments, but expected at least 2.");
	}
	for( var i = 1, len = arguments.length; i < len; i++ ) {
		var interface = arguments[i];
		if( interface.constructor !== Interface ) {
			throw new Error("Function Interface.ensureImplements " + 
			"expects arguemnts two and above to be instances of Interface");
		}
	}
	for( var j = 0, methodLen = interface.method.length; i < methodLen; j++ ) {
		var method = interface.method[j];
		if( !object[method] || typeof object[method] !== 'function' ) {
			throw new Error("Function Interface.ensuerImplements: object " + 
			"does not implement the " + interface.name +
			" interface.Method " + method + " was not found"); 
		}
		
	}
}

/*
//interface usage examples
var DyamicMap = new Interface('DynamicMap', ['centerOnPoint', 'zoom', 'draw1']);
function displayRoute(mapInstance) {
	Interface.ensureImplements(mapInstace, DynamicMap);
	mapInstance.centerOnPoint(12, 34);
	mapInstance.zoom(5);
	mapInstance.draw();
	/...
}
*/

function getPosition() {
	var startPos = endPos = 0;
	var	element = document.getElementById("a");
	if( document.selection ) { // For IE
		var range  = document.selection.createRange();
		var drange = range.duplicate();
		drange.moveToElementText( element );
		drange.setEndPoint( "EndToEnd", range );
		startPos = drange.text.length - range.text.length;
		endPos   = startPos + range.text.length;
	}else if( window.getSelection ) {  // For Firefox, Chrome, Safari, etc.
		startPos = element.selectionStart;
		endPos   = element.selectionEnd;
	}
	return {
		"start" : startPos,
		"end"   : endPos
	}
}
















