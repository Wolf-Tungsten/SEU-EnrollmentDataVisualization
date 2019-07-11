var data = [];
var dataCount = 10;
var startTime = +new Date();
var categories = ['categoryA', 'categoryB', 'categoryC'];
var types = [
    {name: 'JS Heap', color: '#7b9ce1'},
    {name: 'Documents', color: '#bd6d6c'},
    {name: 'Nodes', color: '#75d874'},
    {name: 'Listeners', color: '#e0bc78'},
    {name: 'GPU Memory', color: '#dc77dc'},
    {name: 'GPU', color: '#72b362'}
];

// Generate mock data
echarts.util.each(categories, function (category, index) {
    var baseTime = startTime;
    for (var i = 0; i < dataCount; i++) {
        //console.log(index)
        var typeItem = types[Math.round(Math.random() * (types.length - 1))];
        var duration = 200;
        data.push({
            //数据格式
            name: typeItem.name,
            value: [
                index,
                baseTime,
                baseTime += duration,
                duration
            ],
            itemStyle: {
                normal: {
                    color: typeItem.color
                }
            }
        });
        baseTime += Math.round(Math.random() * 2000);
    }
});

function renderItem(params, api) {
    var categoryIndex = api.value(0);
    var start = api.coord([categoryIndex, api.value(1)]);
    var end = api.coord([categoryIndex, api.value(2)]);
    var width = api.size([1,0])[0]*0.6;
    

    
    //clipRectByRect 返回两个矩形的重叠范围
    //x,y表示左上点的坐标，height为Y方向的大小，width为X方向的大小，大小均为正值
    //坐标系以左上为坐标原点，向右为x的正方向，向下为y的正方向

    var rectShape = echarts.graphic.clipRectByRect({
        x: start[0] - width/2,
        y: end[1],
        height: - end[1] + start[1],
        width: width
    }, {
        x: start[0] -  width/2,
        y: end[1],
        height: - end[1] + start[1],
        width: width
    });
    

    return rectShape && {
        type: 'rect',
        shape: rectShape,
        style: api.style()
    };
}


option = {
    tooltip: {
        formatter: function (params) {
            return params.marker + params.name + ': ' + params.value[3] + ' ms';
        }
    },
    title: {
        text: 'Profile',
        left: 'center'
    },
    
    grid: {
        height:300
    },
    xAxis: {
        data: categories
    },
    yAxis: {
        min: startTime,
        scale: true,
        axisLabel: {
            formatter: function (val) {
                return Math.max(0, val - startTime) + ' ms';
            }
        }
    },
    series: [{
        type: 'custom',
        renderItem: renderItem,
        itemStyle: {
            normal: {
                opacity: 0.8
            }
        },
        encode: {
            y: [1, 2],
            x: 0
        },
        data: data
    }]
};;