const middleRight = echarts.init(document.getElementById('middle-right-container'))
const zymcList = ["文科试验班", "工科试验班", "经济学", "英语", "日语", "数学", "物理", "工力", "机械", "测控与仪器", "材料", "能源", "电气", "电子", "信息", "电子无锡", "信息无锡", "自动化", "计算机", "软件", "人工智能", "网安", "土木", "测绘", "化工", "交运", "环境", "生医类", "生医", "建筑", "城乡规划", "风景园林", "生物工程", "临床医学", "临床5+3", "预防医学", "医学检验", "工程管理", "工商管理", "劳动社…", "工业工程", "动画", "美术", "产品设计"]
const ssmc = ["北京","天津","河北","山西","内蒙古","辽宁","吉林","黑龙江","上海","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广东","广西","海南","重庆","四川","贵州","云南","西藏","陕西","甘肃","青海","宁夏","新疆"]
window.setZYBar = (finished, unfinished) => {
  middleRight.clear()
  let itemStyle = {
    normal: {
      color: '#2F80ED',
    },
    emphasis: {
      barBorderWidth: 1,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0,0,0,0)'
    }
  };

  let unfinishedStyle = {
    normal: {
      color: '#FFFFFF',
    },
    emphasis: {
      barBorderWidth: 1,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0,0,0,0.5)'
    }
  };

  let serial = []
  for (let ssmc in finished) {
    serial.push({
      name: ssmc,
      type: 'bar',
      stack: 'one',
      itemStyle: itemStyle,
      data: finished[ssmc]
    })
  }

  for (let ssmc in unfinished) {
    serial.push({
      name: ssmc,
      type: 'bar',
      stack: 'one',
      itemStyle: unfinishedStyle,
      data: unfinished[ssmc]
    })
  }

  let option = {
    title: {
      text: `专业完成进度统计`,
      left: 'center',
      top: 15,
      textStyle: {
        color: '#f9f9f9'
      }
    },
    tooltip: {},
    backgroundColor: 'rgba(0,0,0,0)',
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 0,
        end: 100,
        textStyle: {
          color: '#f0f0f0'
        }
      },
      {
        type: 'inside',
        realtime: true,
        start: 0,
        end: 100
      }
    ],
    xAxis: {
      data: zymcList,
      name: '专业',
      silent: false,
      boundaryGap: true,
      axisLine: { onZero: true },
      splitLine: { show: false },
      splitArea: { show: false },
      axisLabel: {
        interval: 0,
        color: '#ffffff',
        shadowBlur: 50,
        shadowColor: 'rgba(255, 255, 255, 0.5)',
        fontFamily: 'NotoSansSC-Regular',
        fontSize: 16,
        rotate: -45
      },
      axisLine: {
        lineStyle: {
          color: '#fff', //坐标轴线颜色
          shadowBlur: 200,
          shadowColor: 'rgba(255, 255, 255, 0.5)',
        }
      }
    },
    yAxis: {
      inverse: false,
      splitArea: { show: false },
      axisLabel: {
        color: '#ffffff',
        shadowBlur: 50,
        shadowColor: 'rgba(255, 255, 255, 0.5)',
        fontFamily: 'NotoSansSC-Regular'
      },
      axisLine: {
        lineStyle: {
          color: '#fff', //坐标轴线颜色
          shadowBlur: 200,
          shadowColor: 'rgba(255, 255, 255, 0.5)',
        }
      }
    },
    grid: {
      left: 80,
      top: 80,
      bottom: 80
    },
    series: serial
  }
  middleRight.setOption(option)
}

window.setRank = (title, data) => {
  middleRight.clear()
  let series = {}
  let renderSeries = []
  let years = ['2014', '2015', '2016', '2017', '2018']
  years.forEach((year) => {
    series[year] = []
  })
  let xList = []
  let color = ['rgba(255,100,100,0.8)', 'rgba(100,255,100,0.8)', 'rgba(100,100,255,0.8)', 'rgba(255,0,255,0.8)', 'rgba(255,255,0,0.8)']

  data.forEach((item) => {
    let ssmc = Object.keys(item)[0]
    xList.push(ssmc)
    years.forEach((year, index, arr) => {
      series[year].push(item[ssmc][index])
    })
  })

  console.log(series, xList)
  years.forEach((year, index, arr) => {
    renderSeries.push(
      {
        name: year,
        type: 'line',
        connectNulls: true,
        data: series[year],
        smooth: true,
        symbolSize: 10,
        label: {
          position: [20, -20],
          show: false,
          color: '#FFF',
          fontSize: 20,
          textShadowColor: 'rgba(255, 255, 255, 0.5)',
          textShadowBlur: 10,
          distance: 15
        },
        lineStyle: {
          color: color[index],
          width: 3,
          shadowColor: 'rgba(255, 255, 255, 0.5)',
          shadowBlur: 5,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0.1,
              color: color[index]
            }, {
              offset: 1,
              color: 'rgba(0,0,0,0)'
            }])
          }
        }
      }
    )
  })

  let option = {
    title: {
      text: title,
      left: 'center',
      top: 15,
      textStyle: {
        color: '#f9f9f9'
      }
    },
    grid: {
      left: 100,
      top: 100
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: Object.keys(series),
      top: 50,
      textStyle: {
        color: '#F0f0f0',
        fontSize: 18
      },
      itemWidth: 20,
      itemHeight: 20
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xList,
      axisLine: {
        lineStyle: {
          color: '#F9F9F9',
          width: 2,
          shadowColor: 'rgba(255, 255, 255, 0.5)',
          shadowBlur: 10,
        }
      },
      axisLabel: {
        interval: 0,
        color: '#ffffff',
        shadowBlur: 50,
        shadowColor: 'rgba(255, 255, 255, 0.5)',
        fontFamily: 'NotoSansSC-Regular',
        fontSize: 16,
        rotate: -45
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}',
        fontSize: 18
      },
      scale: true,
      axisLine: {
        lineStyle: {
          color: '#F9F9F9',
          width: 2,
          shadowColor: 'rgba(255, 255, 255, 0.5)',
          shadowBlur: 10,
        }
      }
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 0,
        end: 100,
        textStyle: {
          color: '#f0f0f0'
        }
      },
      {
        type: 'inside',
        realtime: true,
        start: 0,
        end: 100
      }
    ],
    series: renderSeries,
    grid: {
      left: 80,
      top: 80,
      bottom: 80
    },
  };
  middleRight.setOption(option)
}

//大类
window.setGrade = (type) => {
  middleRight.clear()
  var data = [];
  var dataCount = 10;
  var startTime = +new Date();
  var categories = ssmc;
  var types = [
    { name: 'JS Heap', color: '#7b9ce1' },
    { name: 'Documents', color: '#bd6d6c' },
    { name: 'Nodes', color: '#75d874' },
    { name: 'Listeners', color: '#e0bc78' },
    { name: 'GPU Memory', color: '#dc77dc' },
    { name: 'GPU', color: '#72b362' }
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
    var width = api.size([1, 0])[0] * 0.6;



    //clipRectByRect 返回两个矩形的重叠范围
    //x,y表示左上点的坐标，height为Y方向的大小，width为X方向的大小，大小均为正值
    //坐标系以左上为坐标原点，向右为x的正方向，向下为y的正方向

    var rectShape = echarts.graphic.clipRectByRect({
      x: start[0] - width / 2,
      y: end[1],
      height: - end[1] + start[1],
      width: width
    }, {
        x: start[0] - width / 2,
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
      left: 'center',
      top: 20,
    },

    grid: {
      left: 130,
      right: 50,
      top: 100
    },
    xAxis: {
      data: ssmc,
      name: '省市',
      silent: false,
      boundaryGap: true,
      axisLine: { onZero: true },
      splitLine: { show: false },
      splitArea: { show: false },
      axisLabel :{
        interval: 0,
        color: '#ffffff',
        shadowBlur: 50,
        shadowColor: 'rgba(255, 255, 255, 0.5)', 
        fontFamily: 'NotoSansSC-Regular',
        fontSize: 16,
        rotate: -45
      },
      axisLine: {
        lineStyle: {
          color: '#fff', //坐标轴线颜色
          shadowBlur: 200,
          shadowColor: 'rgba(255, 255, 255, 0.5)',
        }
      }
    },
    yAxis: {
      min: startTime,
      scale: true,
      
      axisLabel: {
        formatter: function (val) {
          return Math.max(0, val - startTime) + ' ms';
        },
        fontSize: 18
      },
      axisLine: {
        lineStyle: {
          color: '#F9F9F9',
          width: 2,
          shadowColor: 'rgba(255, 255, 255, 0.5)',
          shadowBlur: 10,
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
  };

  middleRight.setOption(option)
}

window.setRightAsHistory = (data) => {
}