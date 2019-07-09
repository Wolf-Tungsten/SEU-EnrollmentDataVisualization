

const pieOptionTemplate = {
  backgroundColor: 'rgba(0,0,0,1)',

  title: {
    text: 'Customized Pie',
    left: 'center',
    top: 20,
    textStyle: {
      color: '#ccc'
    }
  },

  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },

  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1]
    }
  }
};

const pie1 = echarts.init(document.getElementById('pie-1'))
const pie2 = echarts.init(document.getElementById('pie-2'))
const pie3 = echarts.init(document.getElementById('pie-3'))

window.setPie1 = (province, male, female) => {
  pie1.clear()
  if (province.length > 4) {province = province.slice(0,4) + '…'}
  let serial = [
    { value: male, name: '男', itemStyle: {color:'#EB5757'}},
    { value: female, name: '女'}
  ]

  let pieOption1 = {
    backgroundColor: 'rgba(0,0,0,0)',

    title: {
      text: `${province}-性别比例`,
      left: 'center',
      top: 15,
      textStyle: {
        color: '#f9f9f9'
      }
    },

    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: '性别比例',
        type: 'pie',
        radius: ['40%', '60%'],
        center: ['50%', '60%'],
        data: serial.sort(function (a, b) { return a.value - b.value; }),
        //roseType: 'radius',
        label: {
          normal: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)'
            }
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.8)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        itemStyle: {
          normal: {
            color: '#ffffff',
            shadowBlur: 5,
            shadowColor: 'rgba(255, 255, 255, 0.5)'
          }
        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }
    ]
  }

  pie1.setOption(pieOption1)
}

window.setPie2 = (province, pt, ts, gjzx,art) => {
  pie2.clear()
  if (province.length > 4) {province = province.slice(0,4) + '…'}
  let serial = [
    { value: pt, name: '普通类', itemStyle: {color:'#FFD600'}},
    { value: ts, name: '特殊类',itemStyle:{color:'#AFD600'}},
    { value: gjzx, name: '国家专项',itemStyle:{color:'#ABD600'}},
    { value: art, name:'艺术'}
  ]

  let pieOption = {
    backgroundColor: 'rgba(0,0,0,0)',

    title: {
      text: `${province}-招生类型比例`,
      left: 'center',
      top: 15,
      textStyle: {
        color: '#f9f9f9'
      }
    },

    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: '招生类型比例',
        type: 'pie',
        radius: ['40%', '60%'],
        center: ['50%', '60%'],
        data: serial.sort(function (a, b) { return a.value - b.value; }),
        //roseType: 'radius',
        label: {
          normal: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)'
            }
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.8)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        itemStyle: {
          normal: {
            color: '#ffffff',
            shadowBlur: 5,
            shadowColor: 'rgba(255, 255, 255, 0.5)'
          }
        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }
    ]
  }

  pie2.setOption(pieOption)
}

window.setPie3 = (province, hans, noHans) => {
  pie3.clear()
  if (province.length > 4) {province = province.slice(0,4) + '…'}
  let serial = [
    { value: noHans, name: '少数民族', itemStyle: {color:'#BB6BD9'}},
    { value: hans, name: '汉族'}
  ]

  let pieOption = {
    backgroundColor: 'rgba(0,0,0,0)',

    title: {
      text: `${province}-少数民族比例`,
      left: 'center',
      top: 15,
      textStyle: {
        color: '#f9f9f9'
      }
    },

    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: '少数民族比例',
        type: 'pie',
        radius: ['40%', '60%'],
        center: ['50%', '60%'],
        data: serial.sort(function (a, b) { return a.value - b.value; }),
        //roseType: 'radius',
        label: {
          normal: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)'
            }
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.8)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        itemStyle: {
          normal: {
            color: '#ffffff',
            shadowBlur: 5,
            shadowColor: 'rgba(255, 255, 255, 0.5)'
          }
        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }
    ]
  }

  pie3.setOption(pieOption)
}

