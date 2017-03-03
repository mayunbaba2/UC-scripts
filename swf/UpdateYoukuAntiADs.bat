@echo off 
cd /d %~dp0
::更新视频播放器
set dd=wget.exe --no-check-certificate  -N -P ..\swf\
 
::youku
%dd% https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/swf/player.swf
%dd% https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/swf/loader.swf

::ku6
%dd% https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/swf/ku6.swf
%dd% https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/swf/ku6_out.swf

::iqiyi
%dd% https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/swf/iqiyi.swf
%dd% https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/swf/iqiyi5.swf
%dd% https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/swf/iqiyi_out.swf

::tudou
%dd% https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/swf/tudou.swf
%dd% https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/swf/sp.swf
%dd% https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/swf/olc_8.swf

::letv
%dd% https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/swf/letv.swf
%dd% https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/swf/letv.in.Live.swf

::pptv
%dd% https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/swf/pptv.swf
%dd% https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/swf/pptv.in.Live.swf

::Sohu
%dd% https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/swf/sohu_live.swf


