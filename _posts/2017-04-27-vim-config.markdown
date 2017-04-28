---
layout: post
title:  "vim定制强大的php IDE"
date:   2017-04-26 15:50:35 +0800
tags: vim,config,php
categories: 工具
---

不得不说，vim合理搭配各种插件后，的确是十分强悍，无论何种语言开发，用vim都能搭建出一个定制的IDE。自从[阳老板](http://r9it.com)那里撸到第一份vim配置，几经增补到现在，也算的上是比较顺手了。
<!--break-->

真心想吐槽一下vdebug,第一个坑就是，这个插件要求vim支持python，我用的是apt装的vim8.0,用<code>vim --version | grep python</code>是可以看到python支持的
![vim_python支持](/css/images/vim_python.png)
但是加入下面的代码在vdebug.vim中,然后再打开vim

~~~vim

if(!has("python")){
	echo "can not support python"
	finish
}
~~~

## 安装

发现其实并不支持python,百般折腾，无奈之下只得自己编译安装[vim](https://github.com/vim/vim),编译选项

~~~shell
#!/bin/bash 
./configure --with-features=huge \
--enable-rubyinterp \
--enable-pythoninterp \
--enable-python3interp \
--enable-luainterp \
--enable-perlinterp \
--enable-multibyte \
--enable-cscope \
--with-python-config-dir=/usr/lib/python2.7/config-x86_64-linux-gnu/  \
--with-python-config-dir=/usr/lib/python3.5/config-3.5m-x86_64-linux-gnu/  \
--prefix=/usr/local/vim

~~~

使用编译安装vim遇到breakspace键删除字符无效的问题，那是因为在默认打开vim时使用的是vi兼容模式，解决这个问题只须在.vimrc中加入下面的配置以关首闭兼容模式，并添加breakspace全部的删除功能

~~~vim

set nocompatible
set backspace=indent,eol,start

~~~

## 插件管理工具

Vundle是一款非常方便的插件管理工具，安装完成后只需要直接在.vimrc中添加插件的名称，然后在vim的命令模式输入:VundleInstall就可以直接安装了,以下是我安装的一些插件

~~~vim

set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'gmarik/Vundle.vim'
Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'
Plugin 'vim-scripts/EasyGrep'
Plugin 'scrooloose/nerdtree'
Plugin 'majutsushi/tagbar'
Plugin 'jreybert/vimagit'
Plugin 'mhinz/vim-signify'
Plugin 'joonty/vdebug'
Plugin 'tpope/vim-fugitive'
Plugin 'tpope/vim-commentary'
Plugin 'junegunn/vim-easy-align'
" The following are examples of different formats supported.
" Keep Plugin commands between vundle#begin/end.

" All of your Plugins must be added before the following line
call vundle#end()            " required

~~~

## 快捷键
玩vim当然是要高度定制，按自已的习惯设置快捷键当然就必不可少，这样能大大加快搬砖效率。下面是一些我定义的快捷键，大部分都是对窗口操作的

~~~vim
nmap  <F8> :TagbarToggle<CR>
nmap <c-n> :tabnew<CR>
nmap <c-h> :tabp<CR>
nmap <c-l> :tabn<CR>
nmap     , :NERDTreeToggle<CR>
nmap     . :!
nmap <C-F> :Grep -ir 
nmap <c-k> <c-w><c-w>
nmap <c-o> :only<CR>
nmap <c-i> :sp<CR>
nmap <c-b> :Breakpoint<CR>
nmap <c-j> :vs<CR>
imap <M-v> "+gp
" Start interactive EasyAlign in visual mode (e.g. vipga)
xmap ga <Plug>(EasyAlign)

" Start interactive EasyAlign for a motion/text object (e.g. gaip)
nmap ga <Plug>(EasyAlign)

~~~

## PHP

当然既然是php的IDE ,那么当然得有一些特有的插件，像语法/规范检查，自动格式化代码phpcbf及phptags跳转定义等当然要单独来说

* 语法检查这种简单的插件可以自己写个简单的,就几行代码，写好命名为phpcheck.vim丢到.vim/plugin下就可以了

~~~vim

autocmd BufWritePost *.php call PHPSyntaxCheck()

if !exists('g:PHP_SYNTAX_CHECK_BIN')
    let g:PHP_SYNTAX_CHECK_BIN = 'php'
endif

function! PHPSyntaxCheck()
    let result = system(g:PHP_SYNTAX_CHECK_BIN.' -l -n '.expand('%'))
    if (stridx(result, 'No syntax errors detected') == -1)
        echohl WarningMsg | echo result | echohl None
    endif
endfunction

~~~
* php代码格式化 `beanworks/vim-phpfmt.git` 插件，它不仅有可以格式化代码，还能给出代码不规范的提示，安装非常简单，在plugin里把这个名称加进去就完了，配置也很简单。有个前提是要安装`phpcbf`及 `phpcs`可以直接用composer安装

~~~vim

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0

" 规范文件
let g:phpfmt_standard = '/var/phpcs.xml'

" Or your own defined source of standard (absolute or relative path):
"let g:phpfmt_standard = '/php/dar/dar-creator/phpcs.xml'
let g:phpfmt_autosave = 1 
let g:phpfmt_command = '/usr/local/bin/phpcbf'
let g:phpfmt_tmp_dir = './'

~~~

* vdebug调试参考[vim+vdebug调试php](http://blog.csdn.net/guyue35/article/details/53968611)

## 我的vim配置

[vimrc](http://121.40.217.151/vim/vimrc)
![效果图](/css/images/vim_effect.png)
