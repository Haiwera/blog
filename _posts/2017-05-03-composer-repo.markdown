---
layout: post
title:  "composer 搭建内网仓库"
date:   2017-05-03 13:30:35 +0800
tags: composer
categories: 工具
---

使用composer管理依赖是大多数php开发者都要用到的方式，当然我们都希望可以有一个自己的包管理仓库。漫步各大搜索引擎，终于找到一篇相关的文章了，收藏一下。

<!--break-->

## 仓库搭建

参考[使用 satis 搭建一个私有的 Composer 包仓库](http://www.cnblogs.com/maxincai/p/5308284.html)

## 使用

satis搭建的仓库是以HTTP协议提供服务的，但composer客户端强制要求使用HTTPS协议，否则会报安全问题。这时我们要修改客户端配置来解决这个问题,添加以下配置

~~~javascript

{
    "config": {
		"secure-http": false	
	},
	...
}

~~~

satis 内网仓库可能只适合做不想暴露大公网的自定义组件或插件的仓库，虽然可以用它去缓存composer镜像源的仓库，但似乎它会镜像整个源所有的仓库
