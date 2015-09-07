## 项目文档

由于项目功能过于复杂，故此文档介绍 JavaScript 结构及其使用说明。

### 1. 结构说明

本项目所用到的各种函数和属性都封装在 Cathectic 这个类中，类的封装方式：

	var Class = (function(){

		var privateAttr;
		var privateFunction = function(){

		};

		return {
			publicAttr: "attr",
			publicFunction: function(){

			},
			_publicFunction: function(){
				// 该函数虽然为公有函数，但是内部为私有调用。
			}
		}
	})();

上面使用一个自执行的函数，返回一个 Object 值给 Class，同时也为这个类添加了一个工具函数：

	Class.util = (function(){
		// 形式同上
	})();

### 2. 函数的介绍

#### init

用于初始化。

#### getCurNum

获取目前选择的球数。如任选五，则 CurNum 为 5.

#### chooseType

选择的类型包括：

- dingwei 定位
- normal  普通
- dantuo  胆拖
- text    单式

#### numSelector

对顶部 tab 的一个绑定，点击 `选一`，`任选五`等等，下部的 `input[radio]` 选项也会变化。

点击`input[radio]` 选项，下方的球的数量和算法方式也会跟随变化。

#### _showItemList

选一，选二，选三等，下面球有一排、两排、三排；普通投注，球都是一排，这个函数的作用就是正确显示这些内容的。

#### _ceateItemListSelect

该函数是用来辅助 _showItemList 的函数，他的作用是用来创建球右侧的 select 框，控制其隐藏、显示已经内容。

#### _bindSelect

该函数依然是对上述 select 的控制，其作用是当 select 的 value 发生变化的时候，左侧的球的选中状态也跟随变化。

#### _calcMoney

这个函数是算法的核心，里面处理了定位投注、普通投注和胆拖投注的各种算法，本函数会返回选择完了之后的总注数。

#### _setMoney

该函数调用了 _calcMoney ，将上述函数算出的值，呈现在球的下侧。

#### resetBtn

在点击 “选好了” 的 button 时，会重置页面，取消所有球的选中状态，并且置灰该 button。

#### _getItemTpl

点击 “选好了” 的 button 时，会在下侧的容器中添加记录，这个函数是用于生成一条记录的。他接受一个参数，默认处理的时候没送入参数，只有在机选多注的时候才用到。

#### resetDOM

控制球下侧数字的变化，同时也控制 机选select 的显示和隐藏，在胆拖和单式上传模式下，机选select 是不显示的。

#### permutation

这是排列组合中，组合公式的实现。送入两个参数，a 为 下标， b 为上标。（在 a 中任选 b 个元素的选法）

#### alertBox

本函数课扩展。

#### bindResultBox

对一些“清空内容”，“清空列表”，“删除”等按钮做绑定。

#### _updateTotalMoney

当机选/清空/改变倍率的时候，需要更新下侧金额。

#### _checkIsUse

用于去重，在定位投注中存在重复，该函数可以甄别重复内容。

#### _checkIsUseHelper

辅助 _checkIsUse 的函数。

#### errorHandler

错误控制，屏蔽一些未知错误。

#### bindSelector

当 机选select 的值发生改变是，添加记录。

#### Cathectic.util 

- getRandom 获取随机数，参数 expert 为不期望出现的数组成的数组
- getSomeRandom 获取多个数，参数 expert 为不期望出现的数组成的数组
- tplEngine 简单的模板引擎
- repeat 实现重复多个字符串的拼接
- arrayIntersection 取出两个数组的交集

### 3.参数的解释

在 Cathectic 中有几个私有变量：

- curNum 当前选择球的个数，如任选五，则 curNum 为 5
- chooseTpl 用于生成一列球的模板
- selectOpts select选择的辅助解释
- curId 目前选中种类的 input[radio] 的 ID
- basic 该种选择方式下的中奖奖金
- curRes 这是一个多维数组，用于记录选择的球的标号，如：

	curRes = [
		[1,2,3,4],
		[5],
		[6,7]
	];

表示[直选三]中，第一列选中的数字为 1,2,3,4，第二列选中的数字为 5，第三列选中的数字为 6,7。

- curDoubling 当前的倍率，默认为 1。改值可通过下侧的 + - 号进行设置，也可以直接在 input 框中设置。

### 4.扩展内容

1) 选法控制

代码中的 config 参数用于设定扩展功能。

- config['totalNum'] 表示当前从多少个球中选择，默认是 11 个。
- config['selectNum'] 表示从 config['totalNum'] 中选出多少个球，默认是 5 个。

即游戏默认为 11 选 5。可扩展为 x 选 x 的模式。

2) 【选好了】按钮

这个按钮的点击绑定事件在  _setMoney 函数中，可以在调用 _updateTotalMoney 之前对程序做判断，也可以在 _updateTotalMoney 函数中处理判断。

这里需要说明是的，如果球的选择不满足要求，这个按钮是不会变色（之前的灰色不可点击状态），所以最好的方式是在计算注数的时候就开始判断，计算注数的函数(_calcMoney)，他返回的结果是当前选球的总注数。

3) 倍数选择框

对倍数的设置有两个方式，一个是点击+ -号，另一个方式就是直接在框中设置。这两者的绑定在 bindResultBox 函数中，如果想对参数大小进行设置，控制 curDoubling 这个变量就行了。

4) 向后台提交数据

需要提交的数据有选球方式、选择的球、倍率，注数和参数涉及到钱，所有其实后台还是要进行一次判断的。

选球的方式：$("#" + Cathectic.getCurId()).attr("data-type")
选择的球： Cathectic.getCurRes()
倍率： Cathectic.getCurDoubling()



### 任选九的扩展实例

对于上部 tab 的选择，比如要扩展 “任选九”，这个需要对 HTML 进行设定：

1) 在 'div.cathectic-num' 中增加

	<a href="#">任选九</a>|

2) 在最后一个 'div.cathectic-type' 后面追加一个 '.cathectic-type' 单元，单元格式如下：

	<div class="cathectic-type">
		<div class="cathectic-type-choose">
			<span>
				<input type="radio" id="CTC_9_1" data-type="任选九" name="ctype" /><label for="CTC_9_1">普通投注</label>
				<input type="radio" id="CTC_9_2" data-type="任九胆拖" name="ctype" /><label for="CTC_9_2">胆拖投注</label>
				<input type="radio" id="CTC_9_3" name="ctype" /><label for="CTC_9_3">单式上传</label>
			</span>
		</div>
		<div class="cathectic-tip" style="display:block">
			玩法提示：从11个号码中任选<span>8</span>个号码，1/8.25的中奖机会，奖金<span>9</span>元。
		</div>
		<div class="cathectic-tip">
			玩法提示：胆码可选1-7个，拖码可选2-10个，胆码加拖码≥9个，奖金<span>9</span>元。
		</div>
	</div>	
	

".cathectic-type-choose" 包含的是 radio 的选项，后面的 ".cathectic-tip" 对应上面的各种投注方式的 tip 说明。

3) 代码中的设定

在 numSelector 这个函数中，对当前选球方式（胆拖、普通、定位还是其他）做了判断，判断方式是使用的正则，可以看看上述代码中，对input[radio] 做了标记，他们都有 ID，如CTC_9_1。

CTC_9_1 是普通投注，所以在 numSelector 的正则判断中需要加入：

if(/2_2|2_4|3_3|3_5|(4|5|6|7|8)_1|9_1/.test(id)) {
	chooseType = "normal";   // 普通
	self._showItemList(1);
}

原来的正则是 2_2|2_4|3_3|3_5|(4|5|6|7|8)_1，我在后面加了一个  |9_1 ,意思就是在 id 中发现了 9_1 就断定他为 普通投注，其他投注方式的设置也是一样。

**注意：** 这里最重要的一件事是要修改对应的 input['radio'] 的 id 的值。

### 任选九的扩展实例（二） —— 添加自定义玩法

还是按照上述步骤。

1) 省略,这个不用说了
2) 多加一个 input 元素，input元素中记得加上一个 data-type 来标识这是什么玩法
3) 代码中多加一个判断，比如上面加了个ID叫做CTC_other来表示自定义玩法，在正则中需要重新写一个判断

if(/other/.test(id)){
	chooseType = "other";
	// do something
}

4) 在 _calcMoney 中添加该玩法的算法就行了。