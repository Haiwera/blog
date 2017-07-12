---
layout: post
title:  "简单的js图像居中"
date:   2017-06-09 21:10:35 +0800
tags: protocol distribute
categories: js小插件
---
JQuery dom容器内自适应居中，可以是以短边为准缩放缺的地方留白，也可以是以长边为准缩放，多出地方隐藏。
<!--break-->

## 代码

~~~js 
define(function(require,exports,module){
	require('jquery');
	//挤压填充
	var adjustImg = function(img,container){
		var w = $(img).closest(container).width() || $(img).width();
		var h = $(img).closest(container).height() || $(img).height();

		var oW = $(img).width();
		var oH = $(img).height();

		var pre = $(img).closest(container);

		if(pre.length){
			pre.css({
				"position" : "relative"
			});
			var l = 0;
			var t = 0;
			var sW = w;
			var sH = h;
			if(w / h > oW / oH){
				sH = h;
				sW = h / oH * oW;
				l = (w - sW) / 2;
				t = 0;
			}
			else{
				sW = w;
				sH = w / oW * oH;
				l = 0;
				t =( h - sH) / 2;
			}
			$(img).css({
				"position" : "absolute"
				,"width" : sW + "px"
				,"height" : sH + "px"
				,"left" : l + "px"
				,"top" : t + "px"
			});

		}
	}
	//拉伸填充
	var adjustImg = function(img){

		var w = $(img).closest('.media-img').width() || $(img).width();
		var h = $(img).closest('.media-img').height() || $(img).height();

		var oW = $(img).width();
		var oH = $(img).height();
		if(!oW || !oH)
		{
			return ;
		}

		var pre = $(img).closest('.media-img');

		var l = 0;
		var t = 0;
		var sW = w;
		var sH = h;
		if(pre.length){
			pre.css({
				"position" : "relative"
			});
			if(w / h < oW / oH){
				sH = h;
				sW = h / oH * oW;
				l = (w - sW) / 2;
				t = 0;
			}
			else{
				sW = w;
				sH = w / oW * oH;
				l = 0;
				t = (h - sH) / 2;
			}
			$(img).css({
				"position" : "absolute"
				,"width" : sW + "px"
				,"height" : sH + "px"
				,"left" : l + "px"
				,"top" : t + "px"
			});

		}
	};

	$(function(){
		$('img').each(function(){
			$(this).load(function(){
				adjustImg(this,'div.img-container');
			});
			adjustImg(this,'div.img-container');

		});
	});
});


~~~

