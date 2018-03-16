---
layout: post
title:  "vim自动补全的一些小技巧"
date:   2018-03-16 11:12:01 +0800
tags: vim snippets
categories: 工具
---

vim 自动补全用的是snipMate.vim这个插件，vim 作为一高度自定义的编辑器，其补全功能也是相当灵活的。下面总结了一些关于补全的一些小技巧

<!--break-->

- vim补全的配置文件保存在`~/.vim/snippets/*.snippets` ,`*`表示在什么类弄的文件中使用这个配置，比如`php.snippets`表示在php文件中使用，其中`_.snippets`文件中的配置在作何文件类型中有效。

### 配置文件的基本语法

~~~vim

snippet __c
	public function __construct(){
		$1
	}

~~~

- 以上片段表示在输入 `__c`再按下`<TAB>`键时，补全为下面的代码。`$1`表示光标补全完后停留的位置，当然你可以写`$2`... 表示补全前进(按下`ctrl+<TAB>`)光标接下来的位置。

### 内置方法

~~~vim

snippet author
	/**
	* @Name : `system("echo ".Filename())`
	* @Function : 
	* @Author : Haiwera
	* @Created : `strftime("%Y-%m-%d")`
	*/

~~~

- 可以通过 \` 这个符号来表示执行vim函数,其中几个比较好用的这是`system`、`strftime` 、`Filename`了

### 还可以这么用

~~~vim
snippet php
	<?php
	/**
	* @Name : `system("php ~/.snippets/getName.php ".bufname('%'))`
	* @Author : Haiwera
	* @Created : `strftime("%Y-%m-%d")`
	*/
	namespace `system("php ~/.snippets/getNs.php ".bufname('%'))`;	

	class `system("php ~/.snippets/getName.php ".bufname('%'))` ${1:extends} 

snippet layout
	`system("php ~/.snippets/getLayoutXml.php ".bufname('%'))`

~~~

- 哈哈，`system`函数可以执行外部脚本，这么办，是不是什么都可以做呢，让我个看看`~/.snippets/getNs.php`这个文件,通过`.`符号可以连接`vim`内置的变量以做为参数传递给php脚本

~~~php

	unset($argv[0]);
	$param = implode($argv, ' ');

	$file = pathinfo($param, PATHINFO_BASENAME);
	if (strpos($file, '.') !== false) {
		$file = substr($file, 0, strpos($file, '.'));
	}
	echo $file;

~~~

- 关于一些vim变量和内置方法可以参考 [vim的杀手操作(三)](http://blog.chinaunix.net/uid-24993824-id-160089.html)
