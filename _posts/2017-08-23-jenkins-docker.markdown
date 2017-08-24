---
layout: post
title:  "Docker Jenkins&CI"
date:   2017-08-23 11:12:01 +0800
tags: docker jenkins php
categories: 工具
---
Jenkins是一款较成熟的持续集成工具，有较完备的插件库支持。用户可以按需定制不同语言环境的集成工具。

<!--break-->

## Docker Jenkins安装

~~~shell
# 拉取docker镜像
docker pull jenkins/jenkins:lts
# 创建容器  并将项目目录映射到jenkins home 目录下
docker run -d --name jenkins -P -v /php/dar/:/var/jenkins_home:rw  jenkins/jenkins:lts

~~~

- 启动容器后，打开浏览器 `http://127.0.0.1:32769/` 即可访问Jenkins.

- 安装完成后进入容器 ，初始密码在 `/var/jenkins_home/secrets/initialAdminPassword` 中

## Jenkins 插件 

- Jenkins 大部分功能由插件完成，初始安装过程中可以跳过安装默认插件。完成安装后再按需安装插件。

- Jenkins 可以支持主从节点方式实现分布式构建。关于Jenkins主从节点[Jenkins使用教程之管理节点](http://www.jianshu.com/p/047362b11403)

## PHP工程自动化构建

#### Jenkins 创建与配置工程 

- 对于PHP工程，我们没有编译过程，所谓的构建，其实只是对代码正确性的检查，这一点我们可以写一个语法检测脚本来模拟Java构建过程的编译步骤。或者干脆不要这一步，直接进入测试阶段。
	

#### SSH Plugin

- 为了实现跨容器的构建 ，我们要使用这个插件进行远程构建。这个插件实现以远程登录方式在远程执行构建脚本。
- 安装完成这个插件后，我们可以在全局设置里添加远程主机，大多数情况下它是另外一个容器。里面有脚本执行必要的环境。
		
	当然我们要把这两个容器的工程目录设置成一个，以更好的利用Jenkins其它插件的功能。
	（ 注：我们运行的是Jenkins的官方镜像生成的容器，里面是没有我们自己项目的运行环境的，对于依赖环境的动作，我们交由运行的容器处理）

#### GIT & GIT Bucket Plugin

- 上面说到，运行容器和Jenkins共用工程目录，这样即可以很好的利用Jenkins的 Git&GitBucket 来进行源码管理了。

## 关于Docker

- Docker Jenkins环境主要用于对容器化项目进行持续集成，我们并不需要对Jenkins容器的环境做太大更改，通过SSH我们可以将依赖环境的操作交由其执行容器处理。这么做还有一个好处，即在测试阶段也能发现环境导致的问题。如果线上环境有的是同样的容器，那么这个缺陷可以被及早的发现并修复。
- Jenkins 可以结合容器管理工具，很好的实现对容器的自动化部署及容器的编排。
