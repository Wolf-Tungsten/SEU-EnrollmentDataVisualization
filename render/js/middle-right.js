const middleRight = echarts.init(document.getElementById('middle-right-container'))
const zymcList = ["建筑类", "工科试验班(吴健雄班)", "工科试验班(机械能源材料类)", "工科试验班(土木交通类)", "工科试验班(自动化电气测控类)", "工科试验班(环境化工生物类)", "电子信息类", "电子信息类(无锡)", "计算机类", "理科试验班", "工商管理类", "经济学类", "文科试验班类", "临床医学类", "预防医学", "设计学类", "临床医学(5+3一体化培养)", "生物医学工程(七年制)", "英语", "日语"]
const ssmc = ["北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆"]
const xymc = ["建筑学院", "吴健雄学院", "机械工程学院", "能源与环境学院", "材料科学与工程学院", "土木工程学院", "交通学院", "自动化学院", "电气工程学院", "仪器科学与工程学院", "化学化工学院", "医学院", "信息科学与工程学院", "电子科学与工程学院", "生物科学与医学工程学院", "计算机科学与工程学院", "软件学院", "网络空间安全学院", "物理学院", "经济管理学院", "公共卫生学院", "人文学院", "艺术学院", "外国语学院"]
const xyjhs = {
  "建筑学院": 147,
  "吴健雄学院": 80,
  "机械工程学院": 220,
  "能源与环境学院": 252,
  "材料科学与工程学院": 115,
  "土木工程学院": 230,
  "交通学院": 326,
  "自动化学院": 132,
  "电气工程学院": 160,
  "仪器科学与工程学院": 105,
  "化学化工学院": 60,
  "医学院": 279,
  "信息科学与工程学院": 236,
  "电子科学与工程学院": 195,
  "生物科学与医学工程学院": 113,
  "计算机科学与工程学院": 135,
  "软件学院": 90,
  "网络空间安全学院": 140,
  "物理学院": 210,
  "经济管理学院": 143,
  "公共卫生学院": 90,
  "人文学院": 257,
  "艺术学院": 90,
  "外国语学院": 95
}
const zyjhsSimple = {"建筑类":121,"工科试验班(吴健雄班)":95,"工科试验班(机械能源材料类)":464,"工科试验班(土木交通类)":483,"工科试验班(自动化电气测控类)":342,"工科试验班(环境化工生物类)":121,"电子信息类":346,"电子信息类(无锡)":70,"计算机类":287,"理科试验班":204,"工商管理类":195,"经济学类":72,"文科试验班类":187,"临床医学类":106,"预防医学":38,"设计学类":89,"临床医学(5+3一体化培养)":119,"生物医学工程(七年制)":29,"英语":46,"日语":30}
window.setZYBar = (finished, unfinished) => {
  middleRight.clear()

  //根据大类专业招生计划显示不同的样式

  //完成样式
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

  //人数未完成的样式
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

  //人数超标的样式
  let excessStyle = {
    normal: {
      coloe: '#EB5757'
    },
    emphasis: {
      barBorderWidth: 1,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0,0,0,0.5)'
    }
  }

  finished = finished['已完成']
  unfinished = unfinished['未完成']

  //已完成
  let data1 = []
  zymcList.forEach((ele,index)=>{
    if (finished[index] > zyjhsSimple[ele]) {
      data1.push({
        name:'完成',
        value: finished[index],
        itemStyle: {
          color: '#EB5757'
        }
      })
    } else {
      data1.push({
        name:'完成',
        value: finished[index],
        itemStyle: {
          color: '#2F80ED'
        }
      })
    }
  })
  
  //未完成
  let data2 = []
  zymcList.forEach((ele,index)=>{
    if(unfinished[index]>0){
      data2.push({
        name:'未完成',
        value: unfinished[index],
        itemStyle:{
          color: '#FFFFFF'
        }
      })
    }else{
      data2.push({
        name:'超标',
        value: unfinished[index],
        itemStyle:{
          color: '#bdbdbd'
        },
        tooltip:{
          formatter:function(params,tiket,callback){
            return params.marker + '超标:' + (-params['value'])
          }
        }
      })
    }
  })

  let series1 = {
    type: 'bar',
    stack: 'one',
    itemStyle: itemStyle,
    data: data1
  }

  let series2 = {
    type: 'bar',
    stack: 'one',
    itemStyle: itemStyle,
    data: data2
  }

  let series = []
  series.push(series1)
  series.push(series2)


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
    series: series
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
window.setGrade = (type, data) => {

  console.log(type)
  middleRight.clear()

  let srcData = data
  let types = [
    { name: 'MinGrade', color: '#0ce8aa' },
    { name: 'MaxGrade', color: '#de320b' },
    { name: 'Grade', color: '#ffe600' }
  ];

  //创建数据
  let detailData = []

  
  ssmc.forEach((ssmc, index) => {
    //每个省的成绩
    let grade = srcData[ssmc]
    let maxGrade = Math.max.apply(null, grade)  //最大成绩
    let minGrade = Math.min.apply(null, grade)  //最小成绩
    let interval = maxGrade - minGrade;
    grade.forEach(grade => {
      if (grade === maxGrade) {
        detailData.push({
          name: 'maxGrade',
          value: [
            index,
            (maxGrade - minGrade) / interval * 100,
            (maxGrade - minGrade) / interval * 100 + 1,
            grade
          ],
          itemStyle: {
            normal: {
              color: '#ffffff'
            }
          }
        })
      } else if (grade === minGrade) {
        detailData.push({
          name: 'minGrade',
          value: [
            index,
            (minGrade - minGrade) / interval * 100,
            (minGrade - minGrade) / interval * 100 + 1,
            grade
          ],
          itemStyle: {
            normal: {
              color: '#ffffff'
            }
          }
        })
      } else {
        detailData.push({
          name: 'Grade',
          value: [
            index,
            (grade - minGrade) / interval * 100,
            (grade - minGrade) / interval * 100 + 1,
            grade
          ],
          itemStyle: {
            normal: {
              color: '#f2da1f'
            }
          }
        })
      }
    })
  })

  //console.log(detailData)
  
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
        return '成绩: ' + params.value[3];
      }
    },
    title: {
      text: `${type}成绩分布`,
      left: 'center',
      top: 30,
      textStyle: {
        color: '#f9f9f9'
      }
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
      scale: true,
      min: 0,
      showMaxLabel: true,
      axisLabel: {
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
    series: [

      /*{
        type: 'bar',
        itemStyle: {
            normal: {color: '#f0f0f0',opacity: 0.8},
            
        },
        barGap:'-100%',
        width: 20,
        data: dataShadow,
        animation: false
      }
      */,
      {
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
        data: detailData
      }]
  };

  middleRight.setOption(option)
}

window.setCollegeBar = (finished, unfinished) => {
  middleRight.clear()
  finished = finished['已完成']
  unfinished = unfinished['未完成']

  

  //console.log(finished)
  //console.log(unfinished)
  //完成样式
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

  //人数未完成的样式
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

  //人数超标的样式
  let excessStyle = {
    normal: {
      coloe: '#EB5757'
    },
    emphasis: {
      barBorderWidth: 1,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0,0,0,0.5)'
    }
  }




  let data1 = []
  //已完成
  xymc.forEach((ele, index) => {
    if (finished[index] > xyjhs[ele]) {
      data1.push({
        name:'完成',
        value: finished[index],
        itemStyle: {
          color: '#EB5757'
        }
      })
    } else {
      data1.push({
        name:'完成',
        value: finished[index],
        itemStyle: {
          color: '#2F80ED'
        }
      })
    }
  })


  let data2 = []
  //未完成
  xymc.forEach((ele, index) => {
    if(unfinished[index]>0){
      data2.push({
        name:'未完成',
        value: unfinished[index],
        itemStyle:{
          color: '#FFFFFF'
        }
      })
    }else{
      data2.push({
        name:'超标',
        value: unfinished[index],
        itemStyle:{
          color: '#bdbdbd'
        },
        tooltip:{
          formatter:function(params,tiket,callback){
            return params.marker + '超标:' + (-params['value'])
          }
        }
      })
    }
  })


  let series1 = {
    type: 'bar',
    stack: 'one',
    itemStyle: itemStyle,
    data: data1
  }

  let series2 = {
    type: 'bar',
    stack: 'one',
    itemStyle: itemStyle,
    data: data2
  }

  let series = []
  series.push(series1)
  series.push(series2)

  //console.log(series)
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

    xAxis: {
      data: xymc,
      name: '学院',
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
    series: series
  }
  middleRight.setOption(option)
}

window.setRightAsHistory = (data) => {
}