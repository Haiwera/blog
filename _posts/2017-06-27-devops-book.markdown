---
layout: post
title:  "DevOps总结"
date:   2017-06-27 21:10:35 +0800
tags: devops jenkins
categories: 读书总结
---
DevOps 是一套实践方法，在保证高质量的前提下缩短变更到部署到线上的时间。

<!--break-->

## 发布过程

~~~flow
A=>start: 需求
B=>operation: 开发
C=>operation: 构建
D=>operation: 测试
E=>operation: 部署
F=>end: 执行

A(right)->B(right)->C(right)->D(right)->E(right)->F

~~~

为了达到缩短更变到部署执行的时间，DevOps强调各过程衔接高度自动化。

## 特点

在需求阶段引入对运维的考量，运维提出额外的运维角度的需求。

团队结构中引入服务所有者的角色，负责外部协作。服务出问题是作为第一责任人。团队规模小，跨团队协作少。

强调基础设施即代码，用管理项目的方式管理部署流水线中各工具脚本、环境、配置等。

DevOps强调变更快速生效（频繁的变更）,虽然对质量控制有较高要求。但对错误依然是有容忍度的。在特定领域，对质量要求极高或是不需要频繁变更的实践中，并不适用。

## 运维

运维的职能包括硬件供给、软件供给、IT功能供给、服务级别协议的规格的监控、容量规划、保证业务连续性、信息安全。提供团队技术咨询服务。


## 测试

使用测试套件完成单元测试，开发人员维护单元测试套件。或是以测试驱动开发的方式，测试先于开发即先编写测试再以满足测试条件的方式开发。

集成测试套件在构建完成时执行，对大型系统系统来说为节省时间成本，以集群方式执行。

问题修复后要对相应测试进行更改完善。

~~~flow
st=>start: 开始
code=>operation: 开发提交代码
ut=>operation: 单元测试
cond1=>condition: 测试是否通过
cond2=>condition: 测试是否通过
cond3=>condition: 测试是否通过
build=>operation: 构建
ci=>operation: 集成测试
tes=>operation:  预发布
user=>operation: 用户验收测试/性能测试
prod=>operation: 部署
h=>operation: 金丝雀测试
rol=>operation: 回滚
e=>end: 结束

st->code->ut(right)->cond1
cond1(yes)->build
cond1(no)->code
build->ci(right)->cond2
cond2(yes)->tes->user(right)->cond3
cond2(no)->code
cond3(yes)->prod(right)->h(right)->e
cond3(no)->code

~~~

开发完成后测试过程就作为“看门人”的角色控制着部署流水线的移动，测试不通过，无法向后移动。

## 监控

监控包括对布署流水线的监控，部署流水线执行过程的监控应被同等对待。

监控系统应将监控数据聚集，收集到的数据应满足某种规范，以便诊断问题。对大量监控数据进行分析是非常有价值的。

在部署上线过后的一段时间，对系统监控级别临时提升级别。部署过程中，对监控也需要调整。

发现告警第一时间通知服务所有者，若一定时间内未响应。告警级别提升并逐级上报

监控主要目的 检测故障、诊断性能问题、规划容量、用户行为分析、入侵检测。
