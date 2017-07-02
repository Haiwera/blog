Stopwatch = function ()  {
};

Stopwatch.prototype = {
	startTime: 0,
	running: false,
	elapsedTime: 0,

	start: function () {
		this.startTime = +new Date();
		this.elapsedTime = 0;
		this.running = true;
	},

	stop: function () {
		this.elapsedTime = +new Date() - this.startTime;
		this.running = false;
	},

	getElapsedTime: function () {
		if (this.running) return +new Date() - this.startTime;
		else              return this.elapsedTime;
	},

	reset: function() {
		this.elapsedTime = 0;
		this.startTime = 0;
		this.running = false;
	}
}

AnimationTimer = function (duration, timeWarp)  {
	this.timeWarp = timeWarp;

	if (duration !== undefined) this.duration = duration;
	else                        this.duration = 1000;

	this.stopwatch = new Stopwatch();
};

AnimationTimer.prototype = {
	start: function () {
		this.stopwatch.start();
	},

	stop: function () {
		this.stopwatch.stop();
	},

	getRealElapsedTime: function () {
		return this.stopwatch.getElapsedTime();
	},

	getElapsedTime: function () {
		var elapsedTime = this.stopwatch.getElapsedTime(),
			percentComplete = elapsedTime / this.duration;

		if (!this.stopwatch.running)    return undefined;
		if (this.timeWarp == undefined) return elapsedTime;

		return elapsedTime * (this.timeWarp(percentComplete) / percentComplete);
	},

	isRunning: function() {
		return this.stopwatch.running;
	},

	isOver: function () {
		return this.stopwatch.getElapsedTime() > this.duration;
	},

	reset: function() {
		this.stopwatch.reset();
	}
};

AnimationTimer.makeEaseOut = function (strength) {
	return function (percentComplete) {
		return 1 - Math.pow(1 - percentComplete, strength*2);
	};
};

AnimationTimer.makeEaseIn = function (strength) {
	return function (percentComplete) {
		return Math.pow(percentComplete, strength*2);
	};
};

AnimationTimer.makeEaseInOut = function () {
	return function (percentComplete) {
		return percentComplete - Math.sin(percentComplete*2*Math.PI) / (2*Math.PI);
	};
};

AnimationTimer.makeElastic = function (passes) {
	passes = passes || 3;
	return function (percentComplete) {
		return ((1-Math.cos(percentComplete * Math.PI * passes)) *
			(1 - percentComplete)) + percentComplete;
	};
};

AnimationTimer.makeBounce = function (bounces) {
	var fn = AnimationTimer.makeElastic(bounces);
	return function (percentComplete) {
		percentComplete = fn(percentComplete);
		return percentComplete <= 1 ? percentComplete : 2-percentComplete;
	}; 
};

AnimationTimer.makeLinear = function () {
	return function (percentComplete) {
		return percentComplete;
	};
};
Object.prototype.__jsword_load = function(obj){
	if(obj instanceof Object){
		for(var i in obj){
			this[i] = obj[i];
		}											
	}
	return this;
}
var JSwordTimer = function(time,level){
	this.level = level || 0;
	this.time = time || new history.time.now();
	var gy = this.time.gy;
	if(this.level < 4 && this.level >= 0)
	{
		var jg = Math.pow(10,3-this.level);
		gy.n = gy.n - (gy.n % jg);
		gy.y = gy.r = gy.s = 1;
	}
	if(this.level === 4){
		gy.r = gy.s = 1;
	}
	if(this.level === 5){
		gy.s = 1;
	}
	this.time = new history.time(gy);
}
JSwordTimer.prototype = {
	getChildren : function(){
		var children = [];
		gy = this.time.gy;
		var t;
		if(this.level < 3 && this.level >= 0)
		{
			var jg = Math.pow(10,2-this.level);
			gy.n = gy.n - (gy.n % jg);
			gy = this.time.gy;
			gy.y = gy.r = gy.s = 1;
			t = new history.time(gy);
			count = 10;
			while(count --){
				children.push (new JSwordTimer(new history.time(t.gy),this.level+1));
				t = t.npn(jg);
			}
		}
		if(this.level === 3){
			gy.y = gy.r = gy.s = 1;
			for(var i = 1;i<= 12; i ++){
				gy.y = i;
				children.push (new JSwordTimer(new history.time(gy),this.level + 1));
			}	
		}
		if(this.level === 4){
			gy.r = gy.s = 1;
			t = new history.time(gy);
			while(t.gy.y == gy.y){
				children.push (new JSwordTimer(new history.time(t.gy),this.level + 1));
				t = t.npr();
			}
		}
		if(this.level === 5){
			gy.s = 1;
			t = new history.time(gy);
			while(t.gy.r === gy.r){
				children.push (new JSwordTimer(new history.time(t.gy),this.level + 1));
				t = t.nps();
			}
		}
		return children;
	},
	hasChildren : function(){
		return this.level <= 6;
	},
	toString : function(){
		var gy = this.time.gy;
		var rs = '';
		if(gy.n < 0){
			rs += '前';
		}
		switch(this.level){
			case 0:rs += Math.abs(gy.n)+ '~' + (Math.abs(gy.n + 999)) + '年';break;
			case 1:rs += (gy.n >= 0 ? Math.abs(gy.n) / 100 + 1 : Math.abs(gy.n) / 100) + '世纪';break;
			case 2:rs += Math.abs(gy.n)+ '~' + (Math.abs(gy.n + 9))  ;break;
			case 3:rs += Math.abs(gy.n) + '年';break;
			case 4:rs = gy.y + '月';break;
			case 5:rs = gy.r + '日';break;
			case 6:rs = gy.s + '时';break;
		}
		return rs;
	},
	getStartValue : function(){
		return this.time.t;
	},
	getEndValue : function(){
		var next = new history.time(this.time.t);
		switch(this.level){
			case 0:next = next.npn(1000);break;
			case 1:next = next.npn(100);break;
			case 2:next = next.npn(10);break;
			case 3:next = next.npn(1);break;
			// case 4:next = next.npn(1);break;
			case 4:next = next.ny();break;
			case 5:next = next.npr();break;
			case 6:next = next.nps();break;
		}
		if(this.level == 2){
		}
		return next.t - 1;
	
	},
	getChildrenCount : function(){
		switch(this.level){
			case 0:
			case 1:
			case 2:
				return 10;
			case 3:return 12;
			case 4:return this.time.getrs();
			case 5:return 12;
			case 6:return 0;
		}
	
	}

	
};
var JSwordCursor = function(config){
	var options = {
		position : {x : 0, y : 0},
	}

}

var JSwordNode = function(config){
	var options = {
		level : 0,//	节点级别
		width : 5,
		left : 5,
		toLeft : 5,
		//数据属性
		startIndex : 0,
		endIndex : 0,
		childrenCount : 0, //子结点数量
		parentNode : 0, //父级控制点
		prevNode : 0,//上一个SwordNode
		nextNode : 0,//下一个SwordNode
		dataProvider : undefined,
		//状态
		nodeStatus : undefined, //当前状态  
		// +--	NO_EXPEND	未展开
		// +-- EXPENDED	已展开
		// +-- USER_DEFINED 用户态
		selected : 0,//选中状态
	};

	this.options = options.__jsword_load(config);
	this.width = this.options.width || 0;
	this.level = this.options.level || 0;
	this.children = [];//子结点集
	this.left = this.options.left || 0;
	this.toLeft = this.options.toLeft;
	this.dataProvider = this.options.dataProvider;
	this.parentNode = this.options.parentNode;
	this.nextNode = this.options.nextNode;
	this.prevNode = this.options.prevNode;
	this.domPoint = null;
	this.domLine = null;
	this.globalNext = null;
	this.velocity = 0;
	this.nodeStatus = 0;
	this.deleted = 0;

//事件
	this.events = {
		onExpended : [],//展开完成
		onExpending : [],//开始展开
		onShrinked : [],//开始收缩
		onShrinking : [],//收缩完成
		onUserEventPrepare : [],//用户态事件生效
		onUserEventClick : [],//用户态点击
		onUserEventInvaild : [],//用户态事件失效
		onSelect : []//选中事件 
	}


}
JSwordNode.NO_EXPEND = 0;
JSwordNode.SHRINKING = 1;
JSwordNode.EXPENDED = 2;
JSwordNode.EXPENDING = 3;
JSwordNode.USER_DEFINED = 4;
JSwordNode.DENY_SHRINK = 5;

JSwordNode.prototype = {
	denyShrink : function(){
		var p = this;
		while(p){
			p.nodeStatus = JSwordNode.DENY_SHRINK;
			p = p.parentNode;
		}
	},
	hasChildren : function(){
		if(this.dataProvider instanceof Object){
			return this.dataProvider.hasChildren();
		}
		return false;
	},
	sel: function(){
		if(this.domLine)
		{
			var oClass = this.domLine.className;
			this.domLine.className += " " + "JSword_sel_point";
			oClass.split(" ");
		}
	},
	unsel : function(){
		if(this.domLine)
		{
			var oClass = this.domLine.className;
			var arr = oClass.split(" ");
			var cls = "";
			for(var i = 0;i < arr.length;i ++){
				if(arr[i] != "JSword_sel_point"){
					cls += " " + arr[i];	
				}
			}
			this.domLine.className = cls.trim();
		}
	},
	expend : function(){
		if(!this.children.length && this.hasChildren() && this.nodeStatus == JSwordNode.NO_EXPEND){
			var timers = this.dataProvider.getChildren();
			var prevNode = null;
			var nextNode = null;
			var node = null;
			var oldWidth = this.width;
			this.width = this.dataProvider.getChildrenCount() * 30;
			var parentGlobalNext = this.globalNext;
			var self = this;
			for(var i = 0;i < timers.length;i ++ ){
				node = new JSwordNode({
					parentNode : self,
					prevNode : prevNode,
					left : self.left,
					toLeft : prevNode ? (prevNode.getToLeft() + prevNode.getWidth()) : this.toLeft + 30,
					width : 30,
					dataProvider : timers[i],
				});
				if(prevNode){
					prevNode.nextNode = node;
					prevNode.globalNext = node;
				}else{
					this.globalNext = node;
				}
				prevNode = node;
				this.children.push (node);
			}
			if(node){
				node.globalNext = parentGlobalNext;
				var pr = this;
				while(pr){
					pr = pr.parentNode;
					if(pr){
						// pr.left = pr.left + (this.width - oldWidth);
						pr.width = pr.width + this.width;
					}
				}
				var p = node.globalNext;
				while(p){
					p.toLeft = p.toLeft + this.width;
					p = p.globalNext;
				}
				this.nodeStatus = JSwordNode.EXPENDING;
				this.trigger('onExpending');
			}
		}
	},
	shrink : function(){
		if(this.children.length && this.nodeStatus == JSwordNode.EXPENDED){
			var oldWidth = this.width;
			var oldGlobalNext = this.globalNext;
			var shrinkWidth = 0;
			for(var i = 0;i < this.children.length;i ++){
				shrinkWidth += this.children[i].width;
			}
			this.width -= shrinkWidth;
			var self = this;
			var pr = this;
			while(pr){
				pr = pr.parentNode;
				if(pr){
					// pr.left = pr.left + (this.width - oldWidth);
					pr.width = pr.width - shrinkWidth;
				}
			}
			var child = oldGlobalNext;
			while(child != this.nextNode && child)
			{
				child.toLeft = this.toLeft; 
				child = child.globalNext;
			}
			var p = this.nextNode;
			while(p){
				p.toLeft = p.toLeft - shrinkWidth - this.width;
				p = p.globalNext;
			}
			this.nodeStatus = JSwordNode.SHRINKING;
			this.trigger('onShrinking');
		}
	
	},
	getArea : function(context){
		var pt = context.getPoint(this.left);
		return {left : pt.x,top : pt.y,right: pt.x + 16,bottom: pt.y + 16};
	},
	remove : function(context){
		if(this.domPoint && this.domLine)
		{
			context.element.removeChild(this.domPoint);
			context.element.removeChild(this.domLine);
			this.domPoint = null;
			this.domLine = null;
		}
	},
	draw : function(context){
		if(context.canDisplay(this.left)){
			var pt = context.getPoint(this.left);
			if(!this.domPoint || !this.domLine){
				this.domPoint = document.createElement('div');
				this.domLine = document.createElement('div');
				this.domPoint.className = 'JSword_'+this.dataProvider.level+'_point JSword_point';
				this.domLine.className = 'JSword_'+this.dataProvider.level+'_line JSword_line';
				context.element.appendChild(this.domPoint);
				context.element.appendChild(this.domLine);
			}
			if(this.nodeStatus == JSwordNode.DENY_SHRINK){
				this.domPoint.style.background = '#ccc'; 
			}
			var lineLeft = (pt.x + this.domPoint.clientWidth) / 2;
			this.domPoint.style.left = pt.x + 'px';
			this.domPoint.style.top = pt.y +  'px';
			this.domLine.style.left = lineLeft + 20 + 'px';
			this.domLine.style.top = pt.y + 'px';
			this.domLine.style.width = context.windowWidth - lineLeft  + 'px';
			this.domLine.innerHTML = this.dataProvider.toString();
			this.domPoint.title = this.dataProvider.time.toString();
		}
		else{
			if(this.domPoint && this.domLine)
			{
				context.element.removeChild(this.domPoint);
				context.element.removeChild(this.domLine);
				this.domPoint = null;
				this.domLine = null;
			}
		}
		for(var i = 0;i < this.children.length; i ++){
			this.children[i].draw(context);
		}
	},
	getLeft : function(){
		if(!this.left){
			this.left = this.options.left;
		}
		return this.left;
	},
	getToLeft : function(){
		return this.toLeft;
	},
	getWidth : function(){
		if(!this.width){
			this.width = this.options.width;
		}
		return this.width;
	},
	getChildren : function(){
		return this.children;
	},
	inNode : function(time){
		if(this.dataProvider.level > time.level){
			return false;	
		}
		else{
			if(this.dataProvider.getStartValue() <= time.getStartValue() &&
				this.dataProvider.getEndValue() >= time.getEndValue()){
				return true;	
			}
			return false;
		}
	},
	equals : function(time){
		if(this.dataProvider.level !== time.level){
			return false;
		}
		return this.inNode(time);
	},
	trigger : function(evt,params){
		for(var i in this.events[evt]){
			Object.call(this.events[evt][i],{obj:this,params:params});
		}	
	},
	addEventListener : function(evt,listener){
		this.events[evt].push (listener);
	}
}
var counter = 0;
var JSwordBehavior = {
	lastTime : undefined,
	started : 0,
	timer : null,
	start : function(sword){
		this.lastTime = undefined,
		this.timer = new AnimationTimer(1000,AnimationTimer.makeEaseIn(2));
		this.timer.start();
		this.started = 1;
		window.requestAnimationFrame(function(time){
			sword.animate.call(sword,time);
		});	
	},
	stop : function(){
		this.timer.stop();
	},
	isRunning : function(){
		return this.timer.isRunning();
	},
	updateNodes : function(sword,elapsed){
		var node = sword.headNode;
		if(this.started == 1){
			sword.velocity = 1.0 * (sword.toLeft - sword.left) / this.timer.duration;
			// sword.left = sword.toLeft;
		}
		sword.left += sword.velocity * elapsed;
		while(node){
			if(this.started == 1){
				node.velocity = 1.0 * (node.toLeft - node.left) / this.timer.duration;
				// node.left = node.toLeft; 
			}
			node.left += node.velocity * elapsed; 
			node = node.globalNext;
		}
		this.started = 0;

	
	},
	execute:function(sword,time){
		if(!this.timer.isRunning()) return;
		if(!this.timer.isOver()){
			var animationElapsed = this.timer.getElapsedTime(),elapsed;
			if(this.lastTime !== undefined){
				elapsed = animationElapsed - this.lastTime;
				this.updateNodes(sword,elapsed);
			}
			this.lastTime = animationElapsed;
		}	
		else{
			var node = sword.headNode;
			var eventNodeList = [];
			sword.left = sword.toLeft;
			
			while(node){
				node.left = node.toLeft;
				if(node.nodeStatus == JSwordNode.SHRINKING || node.nodeStatus == JSwordNode.EXPENDING){
					eventNodeList.push(node);
				}
				node.velocity = 0;
				node = node.globalNext;
			}
			for(var i = 0; i < eventNodeList.length;i ++){
				var eventNode = eventNodeList[i];
				if(eventNode.nodeStatus == JSwordNode.SHRINKING){
					var p = eventNode.globalNext;
					while(p !== eventNode.nextNode){
						p.remove(sword);
						p = p.globalNext;
					}
					eventNode.globalNext = eventNode.nextNode;
					eventNode.nodeStatus = JSwordNode.NO_EXPEND;
					for(var j = 0;j < eventNode.children.length; j++){
						eventNode.children[i].deleted = 1;
					}
					eventNode.children = [];
					eventNode.trigger('onShrinked');	
				}else if(eventNode.nodeStatus == JSwordNode.EXPENDING){
					eventNode.nodeStatus = JSwordNode.EXPENDED;
					eventNode.trigger('onExpended');	
				}
			}
			sword.onStop(sword.headNode);
			this.stop();
		}
	}
};

var JSwordRange = function(startTime,endTime){
	this.startTime = startTime;
	this.endTime = endTime;
	this.startNode = 0;
	this.endNode = 0;
	this.domElement = null;
	this.channel = null;
}
JSwordRange.prototype = {
	draw : function(context){
		if(this.startNode && this.startNode.deleted == 1){
			this.startNode = undefined;
		}
		if(this.startNode && this.endNode.deleted == 1){
			this.endNode = undefined;
		}
		if(this.startNode && this.endNode && (context.canDisplay(this.startNode.left) || context.canDisplay(this.endNode.left) || 
			(context.left >= this.startNode.left &&  context.left <= this.endNode.left))){
			var ptStart = context.getPoint(this.startNode.left);
			var ptEnd = context.getPoint(this.endNode.left);

			if(!this.domElement){

				this.domElement = document.createElement('div');
				this.domElement.className = 'JSword_range JSword_' + this.channel.id + '_channel';
				context.element.appendChild(this.domElement);

			}
			var ptop = ( ptStart.y > 0 ? ptStart.y : 0 );
			var pbottom = ptEnd.y + this.endNode.width > context.width ? context.width : ptEnd.y + this.endNode.width;
			this.domElement.style.left = this.channel.left + 'px';
			this.domElement.style.top = ptop +  'px';
			this.domElement.style.height = pbottom - ptop + 'px';
			this.domElement.style.width = this.channel.width + "px";
			this.domElement.innerHTML = this.title;
			// this.domPoint.title = this.dataProvider.toString();
		}
		else{
			if(this.domElement)
			{
				context.element.removeChild(this.domElement);
				this.domElement = null;
			}
		}
	}
};
var JSwordChannel = function(id,width){
	this.id = id;	
	this.width = width;
	this.ranges = [];
	this.left = 0;
}
JSwordChannel.prototype = {
	canLoad : function(range)
	{
		if(range.startNode && range.endNode){
			for(var i = 0;i<this.ranges.length;i ++){
				if((this.ranges[i].startNode.dataProvider.getStartValue() <= range.startNode.dataProvider.getStartValue()
					&& this.ranges[i].endNode.dataProvider.getEndValue() >= range.startNode.dataProvider.getEndValue())
					|| (this.ranges[i].startNode.dataProvider.getStartValue() <= range.endNode.dataProvider.getStartValue()
					&& this.ranges[i].endNode.dataProvider.getEndValue() >= range.startNode.dataProvider.getEndValue())){

					return false;	
				}
				
			}
			return true;
		}
		return false;
	
	},
	draw : function(context){
		for(var i = 0;i < this.ranges.length;i ++){
			this.ranges[i].draw(context);
		}
	},
	load : function(range){
		range.channel = this;
		range.startNode.denyShrink();
		range.endNode.denyShrink();
		this.ranges.push(range);	
	}
};

var JSword = function(config){
	var options = {
		id : null,
		dir:                1,// 方向 横向/竖向
		swordTimer : undefined,
		allowExtendLevel:   3,//允许展开级别
		stepIndex:          1,//当前步进值
		levels:             3,//总层数
		showCount : 10,//显示数量
		width : 500, //长度 px
		cursor : 250 , //游标位置
		currentIndex:       0,
		// 数据属性 currNode:           undefined,//当前值
		currentExtendLevel: 0,//当前展开级别
		startIndex:         0,//起始
		topStartIndex:      0,//
		bottomEndIndex:     100,//
		bottomIndex:        0,// 结束
		//状态有
		canScroll:          0,// 是否允许滚动
	};
	this.element = null;
	this.windowWidth = document.body.clientWidth;
	this.windowHeight = document.body.clientHeight;
	this.rootNodes = [];
	this.currentNode = null;
	this.behaviors = [];
	this.headNode = null;
	this.left = 0;
	this.toLeft = this.left;
	this.velocity = 0;
	this.channels = [];

	this.options = options.__jsword_load(config);
	this.createNodes = function(){
		var prevNode = null;
		var nextNode = null;
		var node = null;
		for(var i = -10; i <= 10; i ++){
			node  = new JSwordNode({
				prevNode : prevNode,
				parentNode : null,
				left : prevNode ? prevNode.left + prevNode.getWidth() : 0,
				toLeft : prevNode ? prevNode.left + prevNode.getWidth() : 0,
				width : 30,
				dataProvider : new JSwordTimer(new history.time({n:i*1000,y:1,r:1,s:1})),
			});
			if(prevNode)
			{
				prevNode.nextNode = node;
				prevNode.globalNext = node;
			}
			prevNode = node;
			this.rootNodes.push(node);	
		}
		this.headNode = this.rootNodes[0];
	}
	this.createChannels = function(n){
		for(var i = 0;i < n;i ++){
			var channel = new JSwordChannel(i,this.windowWidth / (n + 1));
			channel.left = (i + 1) * (this.windowWidth / (n + 1));
			this.channels.push (channel);
		}	
	}

	this.createNodes();
	this.createChannels(10);

	for(var i = 0;i < g_nian.length; i++){
		
		range = new JSwordRange(
			new JSwordTimer(new history.time({n:g_nian[i].start,y:1,r:1,s:1}),3),
			new JSwordTimer(new history.time({n:g_nian[i].end,y:1,r:1,s:1}),3));
		range.title = g_nian[i].title;
		this.addRange(range);
	}


	this.element = document.getElementById(this.options.id);
	var self = this;

	this.element.addEventListener('click',function(e){
		var p = self.headNode;
		while(p){
			var area = p.getArea(self);
			if(e.pageX >= area.left && e.pageX <= area.right && e.pageY >= area.top && e.pageY <= area.bottom){
				if(p.nodeStatus == JSwordNode.EXPENDED){
					p.shrink();
				}else{
					p.expend();
				}
				self.toLeft = p.toLeft;
				// self.draw();
				JSwordBehavior.start(self);
				break;
			}
			p = p.globalNext;
		}
	});
	var lastMoveY = 0;
	this.element.addEventListener('touchstart',function(e){
		e = e.changedTouches[0];
		lastMoveY = e.clientY;
		console.log(e);
	});
	this.element.addEventListener('touchmove',function(e){
		if(lastMoveY){
			e.preventDefault();
			e = e.changedTouches[0];
			e.deltaY = - (e.clientY - lastMoveY);
			self.onWheel(e);
			lastMoveY = e.clientY;
		
		}
		console.log(e);
	
	});
	this.element.addEventListener('touchend',function(e){
		lastMoveY = 0;
	});
	this.element.addEventListener('wheel',function(e){
		self.onWheel(e);
		e.preventDefault();
	});
	this.width = this.options.dir ?  this.element.clientHeight : this.element.clientWidth;

	return this;

}
JSword.DIR_V = 1;
JSword.DIR_H = 0;

JSword.prototype = {
	onWheel : function(e){
		if((e.deltaY > 0 && this.left < (this.getMaxLeft() - this.width)) || (e.deltaY < 0 && this.left > 0)){
			this.left += e.deltaY;
			this.toLeft = this.left;
			this.onStop(this.headNode);
			this.draw();
		}
	},
	addRange : function(range){
		range.startNode = this.findNodeBySwordTimer(range.startTime);
		range.endNode = this.findNodeBySwordTimer(range.endTime);
		for(var i = 0;i < this.channels.length;i ++){
			if(this.channels[i].canLoad(range)){
				this.channels[i].load(range);
				return;
			}
		}
	},
	onStop : function(topNode)
	{
		var node = topNode;
		while(node){
			if(!node.globalNext || node.left > this.left + 300){
				this.selNode(node);
				break;
			}
			node = node.globalNext;
		}	
	},
	getPoint : function(left){
		var x = y = 5;
		if(this.options.dir == JSword.DIR_H){
			x = left - this.left;
		}
		else{
			y = left - this.left;
		}
		return {x:x,y:y}
	},
	getMaxLeft : function(){
		var maxLeft = 0;
		for(var i = 0;i < this.rootNodes.length;i ++){
			maxLeft += this.rootNodes[i].getWidth();	
		}
		return maxLeft;
	},
	draw: function(){
		for(var i = 0;i< this.channels.length;i ++){
			this.channels[i].draw(this);
		}
		for(var i = 0;i < this.rootNodes.length;i ++){
			this.rootNodes[i].draw(this);
		}
	},
	update : function(time){
		for(var i = 0;i<this.behaviors.length;i ++){
			this.behaviors[i].execute(this,time);
		}	
	},
	addBehavior : function(behavior){
		this.behaviors.push (behavior);
	},
	selNode : function(node){
		if(this.currentNode){
			this.currentNode.unsel();
		}
		this.currentNode = node;
		this.currentNode.sel();
	},
	animate: function(time){
		var that = this;

		this.update(time);
		this.draw();

		window.requestAnimationFrame(function(time){
			if(JSwordBehavior.isRunning()){
				that.animate.call(that,time);
			}
		});	
	},
	start : function(){
		var that = this;
		this.addBehavior(JSwordBehavior);
		this.init();

		window.requestAnimationFrame(function(time){
			that.animate.call(that,time);
		});	
		
	},
	canDisplay(left){
		return (left >= this.left) && (left <= this.left + this.width);
	},
	findNodeBySwordTimer : function(swordTimer){
		var cNodes = this.rootNodes;
		var xi = 0;
		var found = null;
		while(found == undefined && cNodes){
			var i = 0;
			for(i =0;i < cNodes.length;i ++){
				if(cNodes[i].inNode(swordTimer)){
					if(cNodes[i].equals(swordTimer)){
						found = cNodes[i];
						break;
					}
					else{
						cNodes[i].expend();
						cNodes = cNodes[i].getChildren();
						break;
					}
					
				}
				else{
					if(xi > 10) return;
				}
			}
			xi ++;
		}
		return found;
	
	},
	init: function(){
		if(!this.options.swordTimer){
			this.options.swordTimer = new JSwordTimer(history.time.now(),6);	
		}
		this.currentNode = this.findNodeBySwordTimer(this.options.swordTimer);
		if(this.currentNode){
			// this.left  = this.currentNode.left;
			// this.toLeft = this.currentNode.left; 
		}

		JSwordBehavior.start(this);
				
	}
}


