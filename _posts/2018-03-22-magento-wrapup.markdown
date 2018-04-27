---
layout: post
title:  "magento学习总结"
date:   2018-03-22 17:12:01 +0800
tags: magento php
categories: 读书总结
---

magento是一款使用比较广泛的电商系统，基于其可以非常灵活的进行二次开发，以其出色的`fallback`等重写机制，可以实现领域内非常大程度的自定义。

<!--break-->

- Magento 2框架部分采用多种设计模式以降低代码的藕合性，保证其灵活性。使用依赖注入管理对像构建`建造者`，全局管理对像池`单例` `享元` ,事件管理器 `中介者` ,视图以`组合模式`管理视图资源（layout,container,block) ,模型层采用`迭代器模式`管理数据集合，并引入延时加载的机制避免不必要的查询。

## REST or SOAP API

- magento 通过依赖注入对API进入管理，修改`di.xml`可以直接修改其实现。请求由`magento/webapi`模块负责分发，路由单由`webapi.xml`管理

#### 编写REST接口的方法

1. 定义接口
2. 配置`/etc/webapi.xml`,将接口映射到路由，并定义接品的访问权限。
3. 编写实现，实现可以直接继承自数据模型，返回值可以是magento的任意DataObject,Magento会自动处理返回并将其转化为json or xml
4. 修改`/etc/di.xml` 将实现类关联到接口

## 配置管理器

- magento 把对象的配置信息通过依赖注入以参数据形式写到`di.xml`，实现动态改变对象的行为。

* magento 在启动时指定配置加载器，在编译过程中每个`area`会生成一个配置组并缓存。在生成环境中可以指定`ConfigLoader\Compiled`加载器，提高配置加载效率。
* `di.xml`中的xsi:type=object可填一个virtualType指示依赖注入中的被注参数的依赖关系。注入器根据依赖关系递归创建对象。
* magento 配置分为三个scope, global & website & store 
* 配置策略是只要不是敏感数据，基本上可以能过管理后台改变其值，极大的增强了其灵活性，减少了维护成本。

	
## 任务管理器

* Magento 的任务管理主要用于建立和重建索引、消息队列的管理(未接入RabbitMQ时)
* 我们可以使用它来管理自定义的作务，如邮件群发、数据备份、生成每日报表等。

###### 单独的任务管理易于对其进行版本控制，符合`基础设施即代码`的理念。

## 脚手架

* `php bin/magento` 定义了很多公用工具，我们也可以根据需求进行定制。
* `pestle` 是一个magento官方推荐的工具，方便快速生成一些组件
* 为了更快速的使用这些命令，可以给这些命令取一些别名

~~~shell
# mac 修改 ~/.bash_profile   linux 修改 ~/.bashrc

alias m='php bin/magento'
alias c='php bin/magento cache:clean'
alias mup='php bin/magento setup:upgrade'
alias men='php bin/magento module:enable'
alias mgen='~/script/pestle.magento2.generate'

## 以下是 ~/script/pestle/pestle.magento2.generate 的内容

#!/bin/bash
pestle magento2:generate:$*

~~~

## 缓存机制

* Magento 对底层缓存以接口形式依赖，方便开发者对特写缓存系统进行实现和集成
* Magento 提供页面缓存和静态资源缓存

## 数据模型

- magento 数据模型由三个部分组成，(Model,ResourceModel&Collection),用户使用Model对像对数据进行操作，Model可持有ResourceModel类进行真正的数据库操作(ORM）其中ResourceModel也可以为EavEntity对像，对模型属性进行扩展。Collection 对象处理数据集合的查寻操作，可以通过修改其查寻策略修改其缓存策略。

* ResourceModel 对象和Collection 对象需要一个工厂来处理查寻结果，Magento 的策略是如果这个工厂不存在会自动生成。
* Eav模型实现了对属性值的管理和数据层的映射，实现由`magento/eav`模块负责，不属于框架核心模块。
* 可以对ResourceModel进行扩展已实现关联的数据模型，自定义的`ResourceModel`要关注对数据层的映射，确保数据的完整性。

## 视图机制

## 前端框架

* 前端采用require js，每个模块在`view/require-config.js`的文件，作为查该模块的requirejs配置文件。
* 采用knockout模板引擎，分离模板与数据模型。

## 架构模式

- 主体采用MVC架构，使用php的特性结合依赖注入
- 插件模式，对大部分对像方法调用都暴露了点。
- 数据模型采用分层模式，ResourceModel - Model - Buessiness Model
