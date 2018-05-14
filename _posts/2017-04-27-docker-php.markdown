---
layout: post
title:  "Docker基于php:7.0-fpm安装memcached扩展"
date:   2017-04-27 15:50:35 +0800
tags: docker php memcached
categories: 工具
---

在php:7.0-fpm容器中安装扩展的方法很简单，大多数情况下并不需要我们去用apt或自己下载源码编译安装。作者在创建镜像的时候这些扩展都已经在里面了，只是没有编译链接进php而已。

<!--break-->


## 安装扩展

* 对于大多数扩展，进入容器后一条命令就可以了

~~~shell

cd /usr/bin

./docker-php-ext-install pdo_mysql

~~~

* 然而memcached稍微麻烦一点，官方给的镜像里并没有给出memcached的扩展，这里就需要自己去下载编译安装了

~~~shell

# PHP Version
FROM php:7.0-fpm

...

# Install Memcached
RUN apt-get update && apt-get install -y \
        libmemcached11 \
        libmemcachedutil2 \
        libmemcached-dev \
        libz-dev \
        git \
    && cd /root \
    && git clone -b php7 https://github.com/php-memcached-dev/php-memcached \
    && cd php-memcached \
    && phpize \
    && ./configure \
    && make \
    && make install \
    && cd .. \
    && rm -rf  php-memcached \
    && echo extension=memcached.so >> /usr/local/etc/php/conf.d/memcached.ini \
    && apt-get remove -y build-essential libmemcached-dev libz-dev \
    && apt-get remove -y \
        libmemcached-dev \
        libz-dev \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

~~~
