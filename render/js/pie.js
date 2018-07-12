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

let setPie1 = (province, male, female) => {

  let serial = [
    { value: male, name: '男', itemStyle: {color:'#EB5757'}},
    { value: female, name: '女'}
  ]

  let pieOption1 = {
    backgroundColor: 'rgba(0,0,0,0)',

    title: {
      text: `${province}-录取性别比例`,
      left: 'center',
      top: 15,
      textStyle: {
        color: '#ccc'
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
        radius: '60%',
        center: ['50%', '60%'],
        data: serial.sort(function (a, b) { return a.value - b.value; }),
        roseType: 'radius',
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
            shadowBlur: 20,
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
  pie2.setOption(pieOption1)
  pie3.setOption(pieOption1)
}

setPie1('全国', male=100, female=80)
