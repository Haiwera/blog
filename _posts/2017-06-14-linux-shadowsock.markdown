---
layout: post
title:  "Linux Shadowsock-qt5使用"
date:   2017-06-09 21:10:35 +0800
tags: proxy shadowsocks
categories: 工具
---
 如今分布式系统已经成为各互联网巨头的基石了，对于日益庞大的数据存储以及由它们带来的巨大的计算，都不是单机所能完成的任务。那么对于庞大的分布式系统，分布式协议就是协调集群中各节点工作的准则

<!--break-->

## 安装

~~~shell

sudo add-apt-repository ppa:hzwhuang/ss-qt5
sudo apt-get update
sudo apt-get install shadowsocks-qt5

~~~

## 系统代理配置

#### 全局代理

直接修改代理为手动代理，将请求转发到shadowsock代理的端口即可

#### 自动代理

修改代理方式为自动代理，规则文件[agent.js](http://121.40.217.151/agent.js)

## 利用proxychains在终端使用socks5代理

#### proxychains安装

~~~shell
git clone https://github.com/rofl0r/proxychains-ng.git
cd proxychains-ng
./configure
make && make install
cp ./src/proxychains.conf /etc/proxychians.conf
cd .. && rm -rf proxychains-ng
~~~

#### 编辑proxychains配置

`vim /etc/proxychains.conf`将`socks4 127.0.0.1 9095`改为

~~~shell
socks5  127.0.0.1 1080  //1080改为你自己的端口
~~~
#### 在用服器上使用代理

~~~shell
# 安装shadowsocks
sudo apt-get update
sudo apt-get install python-pip
sudo apt-get install python-setuptools m2crypto
sudo pip install shadowsocks

#开启本地监听
sslocal -s 11.22.33.44 -p 50003 -k "123456" -l 1080 -t 600 -m aes-256-cfb
~~~

- 也可以使用配置文件

~~~json
// /etc/sslocl.json
{
    "server":"11.22.33.44",
    "server_port":50003,
    "local_port":1080,
    "password":"123456",
    "timeout":600,
    "method":"aes-256-cfb"
}
~~~

~~~shell
sslocal -c /etc/sslocl.json
~~~

#### 在git中使用代理

- 当开启shadowsocks时，默认会启动主机1080端口为代理端口。在git中有配置项，修改后git的网络请求新会经过代理

~~~shell
git config --global http.proxy socks5://127.0.0.1:1080
git config --global https.proxy socks5://127.0.0.1:1080
~~~

#### 使用方法

在需要代理的命令前加上 proxychains4 ，如：

~~~shell
proxychains4 wget http://xxx.com/xxx.zip
#OR
proxychains4 -f /etc/proxychains.conf wget http://xxx.com/xxx.zip
~~~
