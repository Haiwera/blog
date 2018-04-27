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

- 我把css放到了html中，方便根据自己的需求定制样式，如果没有样式要求，可以直接将[示例代码](https://github.com/haiwera-silk-cd/RequireSimplePlugins/blob/master/dropdown/load-dropdown-select.html)的样式拷贝到自己的代码中，注意样式冲突。[使用说明](https://github.com/haiwera-silk-cd/RequireSimplePlugins/blob/master/dropdown/load-dropdown-select.md)

#### 应用场景

* 数据从ajax动态获取的下拉列表


#### 配置

#### 事件说明

### 可以动态改变数据的下拉框，链接选择下拉框

- 我把css放到了html中，方便根据自己的需求定制样式，如果没有样式要求，可以直接将[示例代码](https://github.com/haiwera-silk-cd/RequireSimplePlugins/blob/master/dropdown/link-dropdown-select.html)的样式拷贝到自己的代码中，注意样式冲突。[使用说明](https://github.com/haiwera-silk-cd/RequireSimplePlugins/blob/master/dropdown/link-dropdown-select.md)

#### 应用场景

* 数据可以动态添加到下拉框，并可删除
* 选择后，出现可点击链接

#### 配置

#### 事件说明
