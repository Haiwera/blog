---
layout: post
title:  "大数据算法Hadoop&Spark"
date:   2017-05-16 13:30:35 +0800
tags: composer
categories: 读书总结
---
《大数据算法》介绍了大数据处理领域的常用算法的MapReduce实现及Spark实现，讲解了MapReduce实现原理及应用较广的领域。
<!--break-->

## Hadoop File System 简介

Hadoop 是GFS(Google File System 的开源实现)，其内部文件以块的形式组织，底层可以是linux文件系统。Hadoop将文件以块的形式将文件分布到集群的各个结点上，并实现对读写的负载均衡，自动容错，实时备份。Hadoop集群结点分为两种，Namenode 和 Datanode, namenode可以看成是总控结点。

写入时，客户端向Namenode请求写入，获得一个可写的主块、备份块的及所在datanode的信息。

读取时，客户端从Namenode请求文件的位置信息，Namenode获取这个文件对应的datanode中相对空闲的一个返回给客户端，客户端根据这些信息去取对应的文件

## Spark简介

Spark 是一套对大数据处理提供高层抽象的API库 ，它可以在Hadoop上使用

## MapReduce流程简介

MapReduce 是Hadoop的大数据处理组件，它能将对大数据的计算分布到集群的各个结点上，从而提高对大数据处理的效率。它内部也有容错机制，当正在进行运算的某个节点出现错误时，MapReduce会自动将出错的作业重新分配结一个健康的结点运行。

#### map(映射器)

映射器将输入数据映射为键值对，其中键、值可以是用户定义的任何数据类型，但要实现Hadoop的IWritable接口，以便存入hadoop文件系统。大量数据输入会被MapReduce自动分配给集群的各个结点。

#### reduce(归约器)

相同的键的数据将被发送到同一个归约器，计算后可得到输出。这个输出可以作为另一个MapReduce作业的输入以迭代得到最终结果。

#### 分组排序

用户可以自定义分组比效器对映射器生成的值进行比较，映射器生成的数据在到达归约器前会通过这个比较器，这样就可以让到达归约器的值有序。

#### 分区

用户可以自定义分区比较器对映射器生成的键进行比较，比较器判定为相同的数据将被分发至同一个归约器

#### combine单节点合并

为节省网络数据量，可使用combine对单结点产生的数据进行一个预处理


#### setup

## Spark大数据处理

Spark中对大数据的运算是基于RDD(分布式数据集合)的，所有的数据用RDD来描述，计算过程是从一个RDD经过转换函数到另一个RDD。包括以下种类

~~~java
package org.apache.spark.api.java;

class JavaRDD[T] extends AbstractJavaRDDLike[T, JavaRDD[T]]
class JavaPairRDD[K, V] extends AbstractJavaRDDLike[(K, V), JavaPairRDD[K, V]]

~~~

## 获取spark环境

~~~java

import org.apache.spark.api.java.SparkContext;	

SparkConf sparkConf = new SparkConf()
              .setAppName("test");
JavaSparkContext ctx = new JavaSparkContext(sparkConf);

~~~

## 转换函数

~~~java
package org.apache.spark.api.java.function

CoGroupFunction
DoubleFlatMapFunction
DoubleFunction
FilterFunction
FlatMapFunction
FlatMapFunction2
FlatMapGroupsFunction
ForeachFunction
ForeachPartitionFunction
Function
Function0
Function2
Function3
Function4
MapFunction
MapGroupsFunction
MapPartitionsFunction
PairFlatMapFunction
PairFunction
ReduceFunction
VoidFunction
VoidFunction2

~~~


## 创建第一个RDD

~~~java

import org.apache.spark.api.java.SparkContext;	
import org.apache.spark.api.java.JavaRDD;

JavaRDD<String> rdd = ctx.textFile("/home/yurnom/people.txt")
//实现map功能
JavaPairRDD<String,Integer> pairRDD = rdd.map(new PairFunction<String,String,Integer>{
	Tuple2<String,Integer> call(String str){
		List<String> lst = str.split(',');
		return new Tuple2<String,Integer>(lst[0],lst[1].parseInt());
	}		
});

~~~


## 共享变量

可以通过使用 org.apache.spark.Broadcast 在集群中共享变量

~~~java
import org.apache.spark.Broadcast;
Broadcast<Integer> b_t = new Broadcast<Integer>(123);//广播变量

//使用变量

Integer i = b_t.value();
~~~

