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




