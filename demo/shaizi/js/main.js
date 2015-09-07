var player_1 = {				// 玩家一
	name  : "caca",
	color : "red",
	id    : 0,
	grade : 0 
};
var player_2 = {				// 玩家二
	name  : "我是李靖",
	color : "blue",
	id    : 1,
	grade : 0 
};

var player_cur_id  	=	player_1.id;							// 当前玩家
var dice_face_num	= 	6;										// 骰子面数
var console			= 	_("console");							// 信息输出面板
var promt 			=	"promt";								// 控制板块
var yesBtn			=   _("yesBtn");							// yes按钮
var noBtn			=   _("noBtn");								// no按钮
var text			=   _("text");								// no按钮
var startGame		=   _("startGame");							// 开始游戏
var temp			= 	0;										// 随机数
var tempNum 		= 	0;										// 一轮积累点数
var wins			=	0;										// 赢的效果

//getElement
function _(obj){
	return document.getElementById(obj);
}
//输出
function consoleLog(msg){
	var message = document.createElement("p");
	message.innerHTML = msg;
	console.appendChild(message);
	console.scrollTop += 50;
}
//toggle函数
function toggle(obj){
	var objStyle = _(obj).style;
	objStyle.cssText = "display:" + (objStyle.display == "none" ? "block" : "none");
}

//hide函数
function hide(obj){
	_(obj).style.cssText = "display:none";
}

//获取名字
function getPlayerName(id){
	if(id == 0)	return player_1.name;
	return player_2.name;
}
//获取颜色
function getPlayerColor(id){
	if(id == 0)	return player_1.color;
	return player_2.color;
}
//获取选手
function getPlayer(id){
	if(id == 0)	return player_1;
	return player_2;
}

//产生随机数
function randomize(){
	return Math.floor(Math.random() * dice_face_num + 1);
}
//交换选手
function swapPlayer(){
	player_cur_id = player_cur_id == player_1.id ? player_2.id : player_1.id;
}

//core function
function getNum(){
	tempNum = randomize();
	_("flash").innerHTML = tempNum;
	if(tempNum == 1){
		_("flash").innerHTML = "擦";
		temp = 0;
		consoleLog("<span style='color:" + getPlayerColor(player_cur_id) + 
			"'>" + getPlayerName(player_cur_id) + "</span> 掷得点数为: " + tempNum + ".<br />");
		consoleLog("<strong style='cloor:#999'>× 运气不好哦~</strong>");
		swapPlayer();
		consoleLog(">> 现在由<span style='color:" + 
			getPlayerColor(player_cur_id) + "'>" + getPlayerName(player_cur_id) + "</span> 来投掷");
		toggle("startGame");
		toggle("promt");
		return ;
	}
	consoleLog("<span style='color:" + getPlayerColor(player_cur_id) + 
			";padding-left:20px;'>→ " + getPlayerName(player_cur_id) + "</span> 掷得点数为: " + tempNum + ".");
	temp += tempNum;
}

//flash随机移动坐标
function changePos(){
	var h = document.height || document.documentElement.height;
	var w = document.width || document.documentElement.width;
	var a = (arguments[0]!= null) ? (w - 100) : 800;
	_("flash").style.cssText = "position:absolute;left:" + Math.floor(Math.random() * a) +
		"px;top:" + Math.floor(Math.random() * (h - 100)) + "px";
}

//wins
function win(){
	var a;
	if(wins % 2 == 0) a = "傻";
	else a = "×";
	_("flash").innerHTML = a;
	wins++;
	changePos(0);
}
//绑定事件startGame
startGame.onclick = function(){
	changePos();
	consoleLog("<span style='text-decoration:underline;'>Game hiahia~....</span>");
	toggle("startGame");
	toggle("promt");
	getNum();
}

//绑定事件yesBtn
yesBtn.onclick = function(){
	changePos();
	getNum();
}

//绑定事件noBtn
noBtn.onclick = function(){
	changePos();
	var tempPlayer = getPlayer(player_cur_id);
	tempPlayer.grade += temp;
	if(tempPlayer.grade >= 100){
		text.innerHTML = "<span style='color:" + getPlayerColor(player_cur_id) + "'>" +
		getPlayerName(player_cur_id) + ", 恭喜你，你赢了！！！</span>";
		hide("promt");
		setInterval(win, 300);
		return;
	}
	delete tempPlayer;
	temp = 0;
	consoleLog("<strong style='cloor:#999'>√ <span style='color:" + getPlayerColor(player_cur_id) + 
		"'>" + getPlayerName(player_cur_id) + "</span> 您的分数已经保存！</strong></strong>");
	swapPlayer();
	consoleLog(">> 现在由<span style='color:" + 
		getPlayerColor(player_cur_id) + "'>" + getPlayerName(player_cur_id) + "</span> 来投掷");
	text.innerHTML = "<span style='color:" + player_1.color + 
		"'>" + player_1.name + "</span> : " + player_1.grade +
		"<span style='color:" + player_2.color + 
		";padding-left:20px;'>" + player_2.name + "</span> : " + player_2.grade;
	getNum();
}

//获取玩家名字
_("putName").onclick = function(){
	var a = _("nameHere").value;
	if(!a){
		alert("我擦，丫的，把名字给咱家写上！！！");
		return false;
	}
	player_1.name = a;
	hide("nameBox");
	toggle("startGame");
}
