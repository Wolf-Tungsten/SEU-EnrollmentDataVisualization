let mapOptionTemplate = {
  tooltip: {
    trigger: 'item',
    showDelay: 0,
    transitionDuration: 0.2,
    formatter: function (params) {
      var value = (params.value + '').split('.');
      value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
      return params.seriesName + '<br/>' + params.name + ': ' + value;
    }
  },
  series: [
    {
      name: 'USA PopEstimates',
      type: 'map',
      roam: true,
      map: 'USA',
      itemStyle: {
        emphasis: { label: { show: true } }
      },
      // 文本位置修正
      textFixed: {
        Alaska: [20, -20]
      },
      data: [
          {name:'北京', value:100}
      ]
    }
  ]
};

const map = echarts.init(document.getElementById('map-container'))

window.setMap = (drlbmc, own, finished) => {

  let dataSerial = []

  own.forEach(ssmc => {
    dataSerial.push(
      {
        name: ssmc,
        itemStyle: {
          areaColor: '#fff',
          borderWidth: 0,
          shadowColor: 'rgba(255, 255, 255, 0.5)',
          shadowBlur: 10
        }
      }
    )
  })

  finished.forEach(ssmc => {
    dataSerial.push(
      {
        name: ssmc, 
        itemStyle: {
          areaColor: '#27ae60', 
          borderWidth: 0, 
          shadowColor: '#27ae60',
          shadowBlur: 20
        }
      }
    )
  })
  let mapOption = {
    title: {
      text: `省市完成情况概览-${drlbmc}`,
      left: 'center',
      top: 15,
      textStyle: {
        color: '#f9f9f9'
      }
    },
    series: [
      {
        name: '计划完成情况',
        type: 'map',
        roam: false,
        map: 'china',
        itemStyle: {
          areaColor: 'rgba(255,255,255,0.2)',
          borderWidth: 1,
          shadowColor: 'rgba(255, 255, 255, 1)',
          shadowBlur: 20,
          borderColor: 'rgba(0,0,0,0)',
          label: { show: true },
          emphasis: {
            label: {
              show: true,
              position: ['50%', '50%'],
              color: '#fff',
              fontFamily: 'NotoSansSC',
              fontSize: 20,
              textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowBlur: 10
            } }
        },
        data: dataSerial
      }
    ],
    animationType: 'scale',
    animationEasing: 'elasticOut',
    animationDelay: function (idx) {
      return Math.random() * 200;
    }
  }

  map.setOption(mapOption)
  toggleBottom(false)
}

//setMap(`导入类别：${}`, ['内蒙古', '宁夏', '江苏', '福建'], ['广东', '黑龙江', '新疆', '辽宁', '山西', '甘肃', '贵州'])