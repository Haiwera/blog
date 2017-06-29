---
layout: post
title:  "Docker 搭建内网镜像仓库"
date:   2017-05-02 12:50:35 +0800
tags: docker,tools
categories: 工具
---

团队使用docker最烦燥的莫过于去频繁的去公网下载镜像了，天朝网速下小伙伴们无不以手抚膺坐长叹。在这种背景下，搭建一个团队内使用的docker镜像仓库无疑是一个好选择

<!--break-->

## 搭建docker环境

参考阳老板的[docker 学习笔记（一）](http://r9it.com/20160501/docker-study-1.html)

## 搭建仓库

* 使用docker搭建docker仓库

~~~shell

docker pull registry:2.2 
docker run -d --name docker-repo -p 5000:5000 -v /var/docker/repo:/var/lib/registry registry:2.2

~~~

## 仓库基本使用

* 将本地镜像推送到仓库/拉取

~~~shell
# 打一个新标签（重新定义源）
docker tag ubuntu:14.04 127.0.0.1:5000/ubuntu:14.04 
# 推送
docker push 127.0.0.1:5000/ubuntu:14.04
# 拉取
docker pull 127.0.0.1:5000/ubuntu:14.04

~~~
* (注意：由于registry这个镜像创建的容器是以http方式提供服务的，而docker客户端的服务进程默认只支持https传输方式。我们可以通过修改客户端dockerd服务进程的启动参数来设定某个镜像源使用http方式传输,使用 `--insecure-registry 127.0.0.1:5000`,如果你使用的是ubuntu系统，那么可以通过修改 **/lib/systemd/system/docker.service** ,然后重启docker服务即可)

~~~shell

ExecStart=/usr/bin/dockerd -H fd:// 
#改为 
ExecStart=/usr/bin/dockerd -H fd:// --insecure-registry 127.0.0.1:5000

~~~
保存退出后执行

~~~shell
sudo systemctl daemon-reload
# 重启docker 
sudo service docker restart
~~~

* 如果你是在同一台机器上搭建仓库并推送，请注意，当重启后docker服务，docker-repo容器也会停止运行，后以在推送或拉取前要重新启动docker-repo容器

~~~shell
docker start docker-repo
~~~
* Dockerfile中的`CMD`和`ENTRYPOINT`区别

~~~shell
CMD["sh run.sh"]
# 在run创建容器时run 后面有命令参数会覆盖。 如run ls容器将执行ls
ENTRYPOINT["sh"]
# 在run创建容器时会将run后面的命令作为参数 。如run a.sh容器将执行sh a.sh
# 没有run参数时CMD和ENTRYPOINT没有区别

~~~
