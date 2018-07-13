const middleRight = echarts.init(document.getElementById('middle-right-container'))
const zymcList = ["文科试验班","工科试验班","经济学","英语","日语","数学","物理","工力","机械","测控与仪器","材料","能源","电气","电子","信息","电子无锡","信息无锡","自动化","计算机","软件","计算机人工智能","网安","土木","测绘","化工与制药","交运","环境","生医类","生医","建筑","城乡规划","风景园林","生物工程","临床医学","临床医学5+3","预防医学","医学检验","工程管理","工商管理","劳动与社会保障","工业工程","动画","美术","产品设计"]

window.setZYBar = (finished, unfinished) => {
  let itemStyle = {
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
        name: ssmc+'未完成',
        type: 'bar',
        stack: 'one',
        itemStyle: unfinishedStyle,
        data: unfinished[ssmc]
    })
  }

  let option = {
    title: {
      text: `专业完成情况概览`,
      left: 'center',
      top: 15,
      textStyle: {
        color: '#f9f9f9'
      }
    },
    tooltip: {},
    backgroundColor: 'rgba(0,0,0,0)',
    xAxis: [{
      data: zymcList,
      name: '专业',
      silent: false,
      boundaryGap: true,
      axisLine: { onZero: true },
      splitLine: { show: false },
      splitArea: { show: false },
      axisLabel :{
        interval: (index, value) => { return index % 2 === 0},
        color: '#ffffff',
        shadowBlur: 50,
        shadowColor: 'rgba(255, 255, 255, 0.5)', 
        fontFamily: 'NotoSansSC-Regular',
        fontSize: 10
      },
      axisLine: {
        lineStyle: {
          color: '#fff', //坐标轴线颜色
          shadowBlur: 200,
          shadowColor: 'rgba(255, 255, 255, 0.5)',
        }
      }
    },{
      data: zymcList,
      name: '专业',
      silent: false,
      boundaryGap: true,
      axisLine: { onZero: true },
      splitLine: { show: false },
      splitArea: { show: false },
      axisLabel : {
          interval: (index, value) => { return index % 2 === 1 },
          color: '#ffffff',
          shadowBlur: 50,
          shadowColor: 'rgba(255, 255, 255, 0.5)',
          fontFamily: 'NotoSansSC-Regular',
          fontSize: 10
      },
        axisLine: {
          lineStyle: {
            color: 'rgba(0,0,0,0)' //坐标轴线颜色
          }
        },
      splitLine:{
        lineStyle:{color:'#ff0'}
      }
    }],
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
      left: 100,
      top: 100
    },
    series: serial
  }
  middleRight.setOption(option)
}

window.setRightAsHistory = (data) => {
}