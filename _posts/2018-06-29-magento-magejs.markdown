---
layout: post
title:  "Magento mage contentUpdated事件触发无效"
date:   2018-06-29 17:12:01 +0800
tags: magento js
categories: magento
---

问题表象：Magento mage无法向body上绑定contentUpdated事件，导致所有元素调用`.trigger('contentUpdated')`无首效，从而导致所有动态加载的`<script type="text/x-magento-init">`代码块不起作用。

<!--break-->

## 开始排查

### 首先开始在事件绑定处打断点`pub/static/<...>/mage/mage.js`如图:
![breakpoint1](/css/images/magejs_breakpoint1.png)

- 确认事件绑定的代码的确是执行了的

* 但查看`<body>`上的事件监听:

![breakpoint2](/css/images/magejs-breakpoint2.png)

- 可以看到，并没有显示在`mage.js`文件中有事件绑定，继续找原因。

### 带着刚才的断点再一次刷新页面，发现`<body>`上的事件监听又有了，居然是个偶发的问题:

![breakpoint3](/css/images/magejs-breakpoint3.png)

* 带着疑问和不解，再试了几次，发现只要是强制刷新，事件就绑不上。思考良久，决定强制刷新再看看，这次在断点停下来，看看页面状态：


### 查看元素，发现居然没有`<body>`，难怪事件绑不上去。但为什么不强刷又能绑上去呢，于是带着疑问，刷新看看：

![breakpoint4](/css/images/magejs-breakpoint4.png)

* 能看到`<body>`并且事件也能绑定，为什么强刷`<body>`出不来呢？为什么`mage.js`会在`<body>`渲染之前执行？这好像不是`magento`要的。
* 一开始总以为是页面加载的问题，经过一翻查找代码无果，并没有找到原因

### 打开性能分析器，看看`<body>`在什么时候开始渲染：

![performs1](/css/images/magejs-performs1.png)
![performs2](/css/images/magejs-performs2.png)

* 发现在计算`CSS`前有好长一段时间在请求网络，并且执行器好像被挂起了，没在执行代码，一直到加载完成，才开始页面渲染。

* 问题应该就在这了，这段代码直接被执行器执行，然后阻塞在网络请求上了，在源码查看器找到这个请求的网址：

### 拿着关键词在代码中搜了一波之后，并没有找到。于是想可能是在数据库中。在配置表中果然找到了。

![db](/css/images/magejs-db1.png)
* 居然是客户在配置里搞的鬼，很无奈的到后台把配置在`head`里的脚本挪到`footer`里去，问题解决。

## 总结

* Magento 渲染过程会被写在页面上的同步脚本阻塞，从而影响页面加载速度。
* 页面加载和渲染，浏览器应该是分开处理的
* 强制刷新导致浏览器重新去服务器请求，而直接刷新会取缓存，这使得不强刷的时候能正常绑定

