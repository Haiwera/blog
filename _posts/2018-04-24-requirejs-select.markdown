---
layout: post
title:  "基于requirejs的几个下拉框"
date:   2018-04-22 17:12:01 +0800
tags: requirejs javascript dropdown
categories: js小插件
---

把平时写的一接项目中用到的下拉框稍稍封装了一下，留着以后备用。 这里的都是基于requirejs和jquery开发的，所以在引用之前，请确保已经正确配置了jquery 和 requirejs

<!--break-->


### 异步加载数据的下拉框

#### 效果

![load-dropdown-select](/css/images/load-dropdown-select.png)

- 我把css放到了html中，方便根据自己的需求定制样式，如果没有样式要求，可以直接将[示例代码](https://github.com/haiwera-silk-cd/RequireSimplePlugins/blob/master/dropdown/load-dropdown-select.html)的样式拷贝到自己的代码中，注意样式冲突。[使用说明](https://github.com/haiwera-silk-cd/RequireSimplePlugins/blob/master/dropdown/load-dropdown-select.md)  [项目源码](https://github.com/haiwera-silk-cd/RequireSimplePlugins/tree/master/dropdown)

#### 应用场景

* 数据从ajax动态获取的下拉列表

#### 配置

~~~javascript

var options = {
	"selector":"#dropdown-select"		
};
var plugin = selector.create(options);

~~~

#### 插件方法

* pedding
	* 弹出等待框
* setData
	* 设置下拉框数据，参数是一个键值对像。键相当于option的value ，值用来展示

#### 事件说明

* onDropdown 
	* 下接框展开时触发
	* 回调方法接收两个参数，evt和ele,evt 是原始鼠标点击事件，可以通过它阻止事件冒泡；ele表示插件本身
* onSelect
	* 选择时触发
	* 回调方法接收两个参数，evt和value,evt 是原始鼠标点击事件; value是点击项的key

~~~javascript 
plugin.onDropdown(function (evt,ele){
	ele.pending();
	setTimeout(function(){
		ele.setData({
			"10032":"Javascript",
			"10033":"RequireJS"
		});		
	},1000);
});

plugin.onSelect(function(evt,value){
	console.log(value);		
});
~~~


### 可以动态改变数据的下拉框，链接选择下拉框

#### 效果

![link-dropdown-select](/css/images/link-dropdown-select.png)

- 我把css放到了html中，方便根据自己的需求定制样式，如果没有样式要求，可以直接将[示例代码](https://github.com/haiwera-silk-cd/RequireSimplePlugins/blob/master/dropdown/link-dropdown-select.html)的样式拷贝到自己的代码中，注意样式冲突。[使用说明](https://github.com/haiwera-silk-cd/RequireSimplePlugins/blob/master/dropdown/link-dropdown-select.md)

#### 应用场景

* 数据可以动态添加到下拉框，并可删除
* 选择后，出现可点击链接

#### 配置

~~~javascript 

var options = {
	"selector":"#dropdown-select",
	"linkLabel" : "click me",
	"data" :[ 
		{"id" : "10032","label" : "Javascript","link" : "http://www.haiwera.xyz","addition":{}},
		{"id" : "10033","label" : "Haiwera","link" : "http://www.haiwera.xyz","addition":{}},
		{"id" : "10034","label" : "Blog","link" : "http://www.haiwera.xyz","addition":{}},
	],
	onclear : function(){
		console.log('clear');
	},
	oninit : function(ctrl){
		console.log('init');
	},
	onupdate : function(data){
		console.log('update');
		console.log(data);
		console.log('---------');
	},
	tools : {
		"Add Item" : function(evt,ctrl){
			console.log(ctrl);
			var ind = elem.addItem(Math.random().toString().substr(2,6), "http://haiwera.xyz");
			console.log(ind);
			elem.update();
			evt.stopPropagation();
		},
		"Hello" : function(evt,ctrl){
			console.log("hello");
			evt.stopPropagation();
		}
	}
}

var plugin = selector.create(options);
~~~
* selector 选择器
* linkLabel 选中项显示的链接文字
* data 下拉框初始数据，每项含义如下
	- id : 下拉框的值，相当于option的value
	- label : 显示的内容
	- link : 对应项的链接，可以为空。当有值时，用户选中些项会出现链接。
	- addition : 用户附加数据
* onclear  接收一个回调，用户点击清空时触发
* oninit 插件初始化时触发，回调参数是插件本身
* onupdate 插件数据改变时触发，回调参数是插件当前持有的数据
* tools 用户自定义工具按钮，接收一个键值对象，键表示工具按钮文字内容，值是一个回调，点击时触发。回调接收两个参数，evt 原始事件，ctrl 表示插件本身。

#### 插件方法

* addItem 向插件添加一个选项，接收两个参数
	- label : 显示的内容
	- link : 对应的链接，可以为空，当为空时没有链接
	- **注意:**返回值是一个生成的id, 表求该项对应的值

#### 事件说明

~~~javascript
plugin.onSelect(function(evt,value){
	console.log(value);		
});
~~~
* onSelect 接收一个回调，选中项改变时触发。回调接收两个参数
	- evt 是原始鼠标点击事件
	- value 是选中项的值(id)



