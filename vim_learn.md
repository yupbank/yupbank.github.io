##死命学习vimscript##

##声明，这个是个人理解学习写vim脚本，纯粹的学习，不带玩的。下面应该会学习js+css，ios， java

##目前还有雅思考试，更新于今天。

### chapter01
echo 和 echom， echom会缓存

### chapter02
:set 用法

###chapter03
:map 用法 

### chapter04
:imap
:nmap
:vmap
三种模式下的map

###chapter05
:nunmap
:iunmap
:vunmap
三种unmap

:nnoremap
非循环map

###chapter06

:let mapleader = "-"
设置老板键
:nnoremap <leader>d dd
使用老板键

:let maplocalleader = "\\"
设置小老板键

###chapter07

:nnoremap <leader>ev :vsplit $MYVIMRC<cr>
一件分屏编辑配置文件，使用了老板键哦， <cr> 是真的cr，不是ctrl+v

ZZ
大写zz，一键关闭分的第二屏，自带保存

:nnoremap <leader>sv :source $MYVIMRC<cr>
一键激活配置文件

###chapter08

:iabbrev adn and

自动纠错命令，在编辑模式下纠正adn为and

:iabbrev @@    steve@yu.com

设置私人邮箱版权等

####chapter09
:nnoremap <leader>" viw<esc>a"<esc>hbi"<esc>lel

瞬间给左右加上双引号!

###chapter10
:inoremap <esc> <nop>
关闭你的esc

###chapter11

:setlocal 只给当前编辑有效果

:nnoremap <buffer> Q add 这个效果有点不一样，对每一个buffer产生，对vssplit出来的新窗口等拥有神奇的效果

###chapter12

:autocmd BufWritePre/BufNewFile/etc */*.html/*.js :write/:normal gg=G
:autocmd FileType python nnoremap <buffer> <localleader>c I#

autocmd可以监听各种事件，比如写文件，创建新文件，比如当前是python文件，然后执行下面的操作，保存？设置gg=G？设置当前vim老板键+c 对句子加注释 #?


###chapter13
:autocmd FileType python     :iabbrev <buffer> iff if:<left>

:autocmd FileType javascript :iabbrev <buffer> iff if ()<left>

自动修改不同filetype的iff为对应语言的 if正确


###chapter14

:autocmd BufWrite * :sleep 200m
傻逼作者，睡200分钟。。。

:augroup testgroup
:    autocmd BufWrite * :echom "Foo"
:    autocmd BufWrite * :echom "Bar"
:augroup END

据作者说是会产生 输出 Foo和bar

:augroup uncompress
:  au!
:  au BufEnter *.gz	%!gunzip
:augroup END
加 au！ 是为了，防止这个autocommand被执行两次，比如source一下vimrc，还会再被执行的时候，不会再autocommand一下

###chapter15

:onoremap p i(

这个其实是把i( 加上自定义的名字p
加进去vimrc后， dp = di(  了呢。

:onoremap il( :<c-u>normal! F)vi(<cr>
:onoremap in( :<c-u>normal! f(vi(<cr>

这些厉害的语句大概是在说，cin(/cil( 命令可以删除括号内或者其他什么的吧。。太厉害，先不纠结了



###chapter16






