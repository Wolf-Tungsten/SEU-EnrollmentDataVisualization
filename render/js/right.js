const right = echarts.init(document.getElementById('right-container'))
const ssmcList = ["北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆"]
console.log(ssmcList.length)
window.provinceProcess = (data) => {
  let itemStyle = {
    normal: {
      shadowBlur: 5,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(255,255,255,0.5)'
    },
    emphasis: {
      barBorderWidth: 1,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0,0,0,0.5)'
    }
  };

  let option = {
    title: {
      text: `省市完成情况概览`,
      left: 'center',
      top: 15,
      textStyle: {
        color: '#f9f9f9'
      }
    },
    tooltip: {},
    color: ['#2F80ED', '#2D9CDB', '#56CCF2', '#FFD600', '#FFFFFF'],
    backgroundColor: 'rgba(0,0,0,0)',
    xAxis: [{
      data: ssmcList,
      name: '省市',
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
        fontSize: 16
      },
      axisLine: {
        lineStyle: {
          color: '#fff', //坐标轴线颜色
          shadowBlur: 200,
          shadowColor: 'rgba(255, 255, 255, 0.5)',
        }
      }
    },{
      data: ssmcList,
      name: '省市',
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
          fontSize: 16
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
    series: [
      {
        name: '计算机',
        type: 'bar',
        stack: 'one',
        itemStyle: itemStyle,
        data: [10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10]
      },
      {
        name: '软件',
        type: 'bar',
        stack: 'one',
        itemStyle: itemStyle,
        data: [10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10]
      },
      {
        name: '电子',
        type: 'bar',
        stack: 'one',
        itemStyle: itemStyle,
        data: [10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10, 12, 8, 10]
      },
      {
        name: '信息未完成',
        type: 'bar',
        stack: 'one',
        itemStyle: itemStyle,
        data: [10, 12, -8, 10, 12, 8, -10, 12, 8, 10, -12, 8, 10, 12, 8, -10, 12, -8, 10, 12, 8, 10, -12, 8, 10, 12, 8, 10, 12, 8, 10]
      },
      {
        name: '计算机未完成',
        type: 'bar',
        stack: 'one',
        itemStyle: itemStyle,
        data: [10, 12, -8, 10, 12, 8, -10, 12, 8, 10, -12, 8, 10, 12, 8, -10, 12, -8, 10, 12, 8, 10, -12, 8, 10, 12, 8, 10, 12, 8, 10]
      },
      {
        name: '软件未完成',
        type: 'bar',
        stack: 'one',
        itemStyle: itemStyle,
        data: [10, 12, -8, 10, 12, 8, -10, 12, 8, 10, -12, 8, 10, 12, 8, -10, 12, -8, 10, 12, 8, 10, -12, 8, 10, 12, 8, 10, 12, 8, 10]
      },
      {
        name: '电子未完成',
        type: 'bar',
        stack: 'one',
        itemStyle: itemStyle,
        data: [10, 12, -8, 10, 12, 8, -10, 12, 8, 10, -12, 8, 10, 12, 8, -10, 12, -8, 10, 12, 8, 10, -12, 8, 10, 12, 8, 10, 12, 8, 10]
      }
    ]
  }

  right.setOption(option)
}

window.setRightAsHistory = (data) => {

}

provinceProcess([])