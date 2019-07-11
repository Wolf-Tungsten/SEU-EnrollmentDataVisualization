const right = echarts.init(document.getElementById('right-container'))
const ssmcList = ["北京","天津","河北","山西","内蒙古","辽宁","吉林","黑龙江","上海","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广东","广西","海南","重庆","四川","贵州","云南","西藏","陕西","甘肃","青海","宁夏","新疆"]


window.setProvinceBar = (finished, unfinished) => {
  right.clear()
  let itemStyle = {
    shadowColor: 'rgba(255, 255, 255, 0.5)',
    shadowBlur: 5,
    normal: {
      color:'#2F80ED',
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
    shadowColor: 'rgba(255, 255, 255, 0.5)',
    shadowBlur: 5,
    normal: {
      color:'#FFFFFF',
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
  for (let zymc in finished) {
    serial.push({
        name: zymc,
        type: 'bar',
        stack: 'one',
        itemStyle: itemStyle,
        data: finished[zymc]
    })
  }

  for (let zymc in unfinished) {
    serial.push({
        name: zymc,
        type: 'bar',
        stack: 'one',
        itemStyle: unfinishedStyle,
        data: unfinished[zymc]
    })
  }

  let option = {
    title: {
      text: `省市完成进度统计`,
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
          textStyle : {
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
      data: ssmcList,
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
      inverse: false,
      splitArea: { show: false },
      axisLabel :{
        interval: 0,
        color: '#ffffff',
        shadowBlur: 50,
        shadowColor: 'rgba(255, 255, 255, 0.5)', 
        fontFamily: 'NotoSansSC-Regular',
        fontSize: 16
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
  right.setOption(option)

}

window.setHistory = (title, data) => {
  right.clear()
  let series = []
  let color = ['#88DFF8', '#F2C94C']
  Object.keys(data).forEach((key, index, array) => {
      series.push(
        {
          name:key,
          type:'line',
          connectNulls: true,
          data:data[key],
          smooth: true,
          symbolSize:10,
          label:{
            position: [20, -20],
            show: true,
            color: '#FFF',
            fontSize:20,
            textShadowColor: 'rgba(255, 255, 255, 0.5)',
            textShadowBlur: 10,
            distance: 15
          },
          lineStyle:{
            color:color[index],
            width:3,
            shadowColor: 'rgba(255, 255, 255, 0.5)',
            shadowBlur: 5,
          },
          areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0.2,
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
      data:Object.keys(data),
      top: 50,
      textStyle:{
        color:'#F0f0f0',
        fontSize:18
      },
      itemWidth:20,
      itemHeight:20
  },
  xAxis:  {
      type: 'category',
      boundaryGap: false,
      data: ['2014','2015','2016','2017','2018'],
      axisLine: {
        lineStyle:{
          color:'#F9F9F9',
          width:2,
          shadowColor: 'rgba(255, 255, 255, 0.5)',
          shadowBlur: 10,
        }
      },
      axisLabel: {
    
        fontSize: 18
    },
  },
  yAxis: {
      type: 'value',
      axisLabel: {
          formatter: '{value}',
          fontSize: 18
      },
      scale:true,
      axisLine: {
        lineStyle:{
          color:'#F9F9F9',
          width:2,
          shadowColor: 'rgba(255, 255, 255, 0.5)',
          shadowBlur: 10,
        }
      }
  },
  series: series
};
  right.setOption(option)
}




