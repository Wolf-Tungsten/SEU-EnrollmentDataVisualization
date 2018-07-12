# SEU-EnrollmentDataVisualization
东南大学学生处招生录取数据可视化

## 可能需要参考的实例

* http://www.echartsjs.com/gallery/editor.html?c=pie-custom
* http://echarts.baidu.com/examples/editor.html?c=bar-brush

## 页面内设置参数的方法列表

`window.setFinishCount( number )` 设置屏幕右上角完成总人数

饼图参数直接传入 **人数**

`window.setPie1( province, male, female )` 设置男女比例

`window.setPie2( province, science, art, both )` 设置理科/文科/文理综合比例

`window.setPie3( province, [{name:'汉族', value:100}] )` 设置少数民族比例

`window.setMap( drlbmc, own, finished )` 设置地图显示，own表示计划但是未完成，finish表示已完成