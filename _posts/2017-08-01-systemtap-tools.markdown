---
layout: post
title:  "Linux性能分析工具集合"
date:   2017-08-01 21:10:35 +0800
tags: linux perf
categories: 读书总结
---
系统性能指标及工具有很多，这篇文章从《性能之颠》这本书中总结了一结点罗列如下，以备忘。

<!--break-->

## 操作系统

* 内核管理系统资源，负责CPU调度及设备管理。应用程序通过系统调用操作内核。
* 内核按需执形，轻量级，占cpu少。I/O型负载会频繁在内核中执行。计算型则很少打扰内核。
* 内核会选择本地性更好的cpu供进程使用。
* 现代型cpu时钟中断要做的事情很少
* 进程间数据无法直接访问
* 进程中每个线程拥有自己的线程栈和内核栈
* 设备驱动被划分为两部分，上半部分强调快速，后半部分交由内核调度或放到中断处理程序中。
* 进程复制(fork)可用采用cow策略
* unix理念是要保证内核尽可能简单，其系统调用数量较少，复杂的接口放到用户空间的系统库中实现。
* 内核为每个cpu实现一个优先队列，内核支持多类别调度。
* SMP/ASMP处理器

## 性能分析工具分为四类

- 系统级计数器类
	- vmstat mpstat iostat netstat
- 系统级跟踪器类
	- ps top htop pmap
- 用户级计数器类
	- tcpdump snoop blktrace iosnoop execnoop dtrace systemtap perf
- 用户级跟踪器类
	- gdb mdb 

* 剖析是通过采样来归纳目标特征
* 监视是定期记录计数器里的数据

* /proc 目录中的数字目录代表的是对应进程id的计数信息,其它目录是其它系统及计数信息
* /sys 目录中存放的是系统各硬件的状态信息
* 某些功能要内核编译选项才能使用如延时核算
* 静态分析使用的是代码中已有的观测点，动态分析使用的是中插入中断指信令的方式，动态的向指定目录插入观测点

## DTrace & systemtap

* dtrace探针 `provider:module:function:name`

| provider | 描述                           |
| --       | --                             |
| syscall  | 系统调用自陷表                 |
| vminfo   | 虚拟内存信息                   |
| sysinfo  | 系统统计信息                   |
| profile  | 任意频率采样                   |
| sched    | 内核调度事件                   |
| proc     | 进程级别事件，创建，执行，退出 |
| io       | 地设备接口跟踪                 |
| pid      | 用户级别动态跟踪               |
| tcp      | tcp事件                        |
| ip       | ＩＰ事件                       |
| fbt      | 内核级别动态跟踪               |

* systemtap探针`syscall.read.return`

| tapset     | 描述           |
| --         | --             |
| syscall    | 系统调用自陷表 |
| memory     | 虚拟内存信息   |
| scsi       | SCSI目标事件   |
| scheduler  | 内核调度事件   |
| ioblock    | 地设备接口跟踪 |
| tcp        | tcp事件        |
| socket     | socket事件     |
| networking | 网络事件       |

* 语法

~~~shell
	# DTrace
	probe_description /predicate/ {action}
	# SystemTap
	global stat; probe syscall.read.return { stat <<< $return; } probe end { print(@hist_log(stats))
~~~

* 内置变量&action

- [DTrace](http://docs.oracle.com/cd/E24847_01/html/E22192/gcfqr.html#gcgke)
- [SystemTap](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html-single/SystemTap_Beginners_Guide/#systemtapscript-functions)


## 应用程性能分析方法

- 线程状态分析
- CPU剖析
- 系统调用分析
	- strace 
- I/O剖析
- 工作负载归纳
- 锁分析 
	- plockstat
	- lockstat
- USE方法
- 向下挖掘法

## 优化方向

- 选择i/o尺寸
- 缓存
- 缓冲区
- 轮询 (poll&epoll)
- 并发和并行
- 非阻塞i/o
- 处理器绑定
- 垃圾回收机制影响
- 静态性能调优

