---
layout: post
title:  "Hadoop安装及基本使用"
date:   2017-06-02 13:10:35 +0800
tags: hadoop
categories: 工具
---

收集的一个关于Hadoop安装及基本使用方法，如何在单机快速搭建hadoop环境以及常用的命令

<!--break-->

## 安装Hadoop

默认安装上的hadoop可以直接以文件系统的方式运行,即直接访问linux文件系统

* [hadoop下载地址](http://mirror.bit.edu.cn/apache/hadoop/common/stable2/hadoop-2.7.3.tar.gz)

~~~shell
wget http://mirror.bit.edu.cn/apache/hadoop/common/stable2/hadoop-2.7.3.tar.gz

tar -xvf hadoop-2.7.3.tar.gz

sudo mv hadoop-2.7.3 /usr/local/hadoop

~~~

## 简单的单机配置（Datanode和namenode)同时在localhost

按如下配置更改后，运行 `./sbin/start-dfs.sh` 启动 hadoop, 这个配置是将namenode进程和 datanode进程都配置在localhost,namenode和datanode通信时会通过ssh进行网络通信，故须确保本机开启了ssh服务。为方便通信，通常会配置ssh key登录，否则在启动hdfs时要输入密码，比较麻烦。

* core-site.xml

~~~xml
<configuration>
	<property>
		 <name>hadoop.tmp.dir</name>
		 <value>file:/usr/local/hadoop/tmp</value>
		 <description>Abase for other temporary directories.</description>
	</property>
	<property>
		 <name>fs.defaultFS</name>
		 <value>hdfs://localhost:8088</value>
	</property>
</configuration>

~~~

* hdfs-site.xml

~~~xml
<configuration>
	<property>
		 <name>dfs.replication</name>
		 <value>1</value>
	</property>
	<property>
		 <name>dfs.namenode.name.dir</name>
		 <value>file:/usr/local/hadoop/tmp/dfs/name</value>
	</property>
	<property>
		 <name>dfs.datanode.data.dir</name>
		 <value>file:/usr/local/hadoop/tmp/dfs/data</value>
	</property>
</configuration>
~~~

* 配置ssh

~~~shell
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
~~~

* 格式化namenode

按如上配置后,初次启动之前要格式化namenode否则namenode启动会失败

~~~shell
# 格式化namenode 
/usr/local/hadoop/bin/hdfs namenode -format
# 启动hdfs
/usr/local/hadoop/sbin/start-dfs.sh

~~~

## 基本使用

~~~shell
hadoop fs -mkdir [hadoopdir]					#创建目录
hadoop fs -ls /									#列出文件信息
          -rm -mv -cat ...
hadoop fs -put [localfile] [hadoopfilelocation] #上传文件到hdfs
hadoop fs -get [hadoopfilelocation] [localpath] #从hdfs下载文件
~~~

## 相关链接

* <em>给力星</em> [Hadoop安装教程_单机/伪分布式配置_Hadoop2.6.0/Ubuntu14.04](http://www.powerxing.com/install-hadoop/)
* <em>王丽兵</em> [Hadoop启动报Error: JAVA_HOME is not set and could not be found解决办法  ](http://wlb.wlb.blog.163.com/blog/static/467413201501451724327/)
