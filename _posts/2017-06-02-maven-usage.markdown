---
layout: post
title:  "Maven基本使用"
date:   2017-06-02 10:10:35 +0800
tags: composer
categories: 工具
---
Maven项目对象模型(POM)，可以通过一小段描述信息(pom.xml)来管理项目的构建，报告和文档的软件项目管理工具,依赖/构建管理。

<!--break-->

## pom.xml基本配置
~~~xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
   <modelVersion>4.0.0</modelVersion>
   <!-- groupId: groupId:项目或者组织的唯一标志，并且配置时生成的路径也是由此生成，
       如com.mycompany.app生成的相对路径为：/com/mycompany/app -->
   <groupId>xyz.haiwera.spark</groupId>
   <!-- artifactId: 项目的通用名称 -->
   <artifactId>Program</artifactId>
   <!-- packaging: 打包的机制，如pom, jar, maven-plugin, ejb, war, ear, rar, par   -->
   <packaging>jar</packaging>
   <!-- version:项目的版本 -->
   <version>1.0</version>
   <!-- 项目的名称， Maven 产生的文档用 -->
   <name>program</name>
   <!-- 哪个网站可以找到这个项目,提示如果 Maven 资源列表没有，可以直接上该网站寻找, Maven 产生的文档用 -->
   <!-- <url>http://www.baidu.com/banseon</url> -->
   <!-- 项目的描述, Maven 产生的文档用 -->
   <description>A maven project to study maven.</description>
   <!-- 开发者信息 -->
   <developers>
       <developer>
      <.../>
       </developer>
   </developers>
   <dependencies>
    <dependency>
      <.../>
    </dependency>
   </dependencies>
   <build>
    <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-shade-plugin</artifactId>
      <version>1.2.1</version>
      <executions>
        <execution>
          <phase>package</phase>
          <goals>
              <goal>shade</goal>
          </goals>
            <configuration>
              <transformers>
                <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                  <mainClass>xyz.haiwera.sparkTest.App</mainClass>
                </transformer>
              </transformers>
            </configuration>
        </execution>
      </executions>
     </plugin>
    </plugins>
  </build>
</project>
~~~

* [Maven镜像仓库](http://mvnrepository.com/)

## 创建普通mvn项目

~~~shell
mvn archetype:generate -DgroupId=xyz.haiwera.spark -DartifactId=sparkTest
# 常用命令
mvn package 
mvn compile
~~~
