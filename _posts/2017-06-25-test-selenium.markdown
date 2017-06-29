---
layout: post
title:  "web自动化测试-selenium"
date:   2017-06-09 21:10:35 +0800
tags: selenium
categories: 工具
---
[selenium](https://goo.gl/s4o9Vx)是web自动化的流行工具，它能以一种独立运行的方式为其它程序服务。在php中我们可以使用一些三方库对其进行操作已实现Web自动化测试。比较常用的库有facebook的webdriver以及codeception
<!--break-->

## 独立运行

对于版本较高的firefox浏览器，要引入[geckodriver](https://github.com/mozilla/geckodriver/releases)，否则能打开浏览器，却无法打开链接,对于ie和chrome 对应参数为`-Dwebdriver.ie.driver`和`-Dwebdriver.chrome.driver`

~~~shell

java -Dwebdriver.gecko.driver="/usr/local/bin/geckodriver" -jar selenium-server-standalone-3.4.0.jar

~~~

## Codeception配置

[Codeception WebDriver](http://codeception.com/docs/modules/WebDriver)，我们可以配置用于执行的测试集群，这个可以是三方的，如browserstack/testingbot等，也可以是自己搭建的。

~~~yaml
modules:
   enabled:
	  - WebDriver:
		 url: http://mysite.com
		 host: '<username>:<access key>@hub.browserstack.com'
		 port: 80
		 browser: chrome
		 capabilities:
			 os: Windows
			 os_version: 10
			 browserstack.local: true # for local testing

~~~

## selenium集群搭建

[selenium 测试框架中使用grid](http://www.cnblogs.com/tobecrazy/p/4564902.html)

~~~shell
# 启动hub节点（主节点）
java -jar selenium-server-standalone-2.46.0.jar -role hub
# 其默认监听端口4444，默认IP localhost  如果要修改，只需要加-port 参数和-Hubhost

# 接下来添加node ，创建Node.bat,这里使用的是默认的Hubhost Ip 和端口

java -jar selenium-server-standalone-2.46.0.jar -role node -hub http://localhost:4444/grid/register

~~~
