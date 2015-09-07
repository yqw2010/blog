/**
* author：hustskyking
* date: 2013-1-24 22:15:53
*/
var isIE = window.navigator.appName.indexOf("Microsoft");

//td_mid 高度 比 td_side 稍大
function setHeight(){
	var tdMid = document.getElementById("td_mid");
	var tdLeft = document.getElementById("td_side");
	var minus = (isIE > -1) ? 290 : 70;
	tdLeft.style.cssText = "height:" + (tdMid.clientHeight - minus) + "px";		
}

function showSubnav(){
	var list = document.getElementById("nav_ul");
	var Lis = list.getElementsByTagName("li");
	var subList = getByClassName("nav_subUl");
	var current = 1;
	for(var i = 1; i < Lis.length; i++){
		Lis[i].onmouseover = function(){
			var index = getIndex(this);
			subList[current - 1].style.display = "none";
			subList[index - 1].style.display = "block";
			current = index;
		}
	}
}

function tab(){
	var listDiv = document.getElementById("con_midTop");
	var Lis = listDiv.getElementsByTagName("span");
	var subList = getByClassName("tabUl");
	var current = 1;
	for(var i = 1; i < Lis.length; i++){
		Lis[i].onclick = function(){
			var index = getIndex(this);
			subList[current - 1].style.display = "none";
			subList[index - 1].style.display = "block";
			current = index;
		}
	}
}

//获取 index 值
function getIndex(ele){
	var a =[];
	if(ele && ele.nodeType && ele.nodeType == 1){	
		var oParent = ele.parentNode;
		var oChilds = oParent.children;
		for(var i = 0; i < oChilds.length; i++){
			if(oChilds[i] == ele) return i;
		}
	}else{
		alert('Arguments error! Sub navigator can not show, please contact technician!');	
		return ;
	}
}

// getByClassName
function getByClassName(className){  
	if(document.getElementByClassName){  
		return document.getElementByClassName(className) 
	}  
	var nodes = document.getElementsByTagName("*");
	var arr = []; 
	for(var i = 0; i < nodes.length; i++){  
		if(hasClass(nodes[i],className)) arr.push(nodes[i]);  
	}  
	return arr;  
} 

//used in getByClassName
function hasClass(node,className){  
	var cNames = node.className.split(/\s+/);
	for(var i = 0; i < cNames.length; i++){  
		if(cNames[i] == className) return true;  
	}  
	return false;  
} 