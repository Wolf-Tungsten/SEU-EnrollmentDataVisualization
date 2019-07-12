const {ipcRenderer} = require('electron')

let isAutomaticSwitching = false

//const collegeList = ["建筑学院","吴健雄学院","机械工程学院","能源与环境学院","材料科学与工程学院","土木工程学院","交通学院","自动化学院","电气工程学院","仪器科学与工程学院","化学化工学院","医学院","信息科学与工程学院","电子科学与工程学院","生物科学与医学工程学院","计算机科学与工程学院","软件学院","网络空间安全学院","物理学院","经济管理学院","公共卫生学院","人文学院","艺术学院","外国语学院"]
//const zymcList =["文科试验班类（郭秉文班）","工科试验班（吴健雄班）","经济学类","英语","日语","数学类","物理学类","工程力学","机械工程","测控技术与仪器","材料科学与工程","能源动力类","电气工程及其自动化","电子科学与技术（类）","信息工程","电子科学与技术类（后两年在无锡培养）","信息工程（后两年在无锡培养）","自动化类","计算机科学与技术","软件工程","计算机科学与技术（人工智能）","网络空间安全","土木类","测绘类","化工与制药类","交通运输类","环境工程","生物医学工程类","生物医学工程","建筑学","城乡规划","风景园林","生物工程","临床医学类","临床医学（5+3一体化）","预防医学","医学检验技术","工程管理","工商管理类","劳动与社会保障","工业工程","动画","美术学","产品设计","预科班","预科班（测绘类）","预科班（护理学）","预科班（临床医学类）","预科班（工程管理）","预科班（工商管理类）","预科班（化工与制药类）","预科班（预防医学）","预科班（法学）","预科班（劳动与社会保障）","预科班（文科试验班类）","预科班（经济学类）","预科班（环境工程）","预科班（医学检验技术）","预科班（机械工程）","预科班（工业工程）","预科班（能源动力类）","预科班（信息工程）","预科班（土木类）","预科班（工程力学）","预科班（电子科学与技术类）","预科班（数学类）","预科班（自动化类）","预科班（计算机科学与技术）","预科班（物理学类）","预科班（生物医学工程类）","预科班（材料科学与工程）","预科班（电气工程及其自动化）","预科班（英语）","预科班（日语）","预科班（交通运输类）","预科班（测控技术与仪器）","预科班（生物工程）","预科班（电子科学与技术类（后两年在无锡培养））","预科班（信息工程（后两年在无锡培养））"]
//const ssmcList = ["北京","天津","河北","山西","内蒙古","辽宁","吉林","黑龙江","上海","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广东","广西","海南","重庆","四川","贵州","云南","西藏","陕西","甘肃","青海","宁夏","新疆"]
//const dlzyList = ["建筑类","工科试验班(吴健雄班)","工科试验班(机械能源材料类)","工科试验班(土木交通类)","工科试验班(自动化电气测控类)","工科试验班(环境化工生物类)","电子信息类","电子信息类(无锡)","计算机类","理科试验班","工商管理类","经济学类","文科试验班类","临床医学类","预防医学","设计学类","临床医学(5+3一体化培养)","生物医学工程","英语","日语"]

AutomaticSwitching = function(_,message){
    console.log('开启自动切换')
    isAutomaticSwitching = true
    let i = 1
    console.log(i++)
    ipcRenderer.send('AutomaticSwitching',i)
    setInterval(function(){
        if(isAutomaticSwitching){
            console.log(i++)
            ipcRenderer.send('AutomaticSwitching',i)
        }
    },60000)
}

ipcRenderer.on('set-scale', (_, message) => {
    let scale = message
    console.log(scale)

    $('html').css('transform', `scale(${scale.x}, ${scale.y})`)
    $('html').css('transform-origin','0 0')
} )

ipcRenderer.on('set-pie', (_, message) => {
    setPie1(message.province, message.xb.male, message.xb.female)
    setPie3(message.province, message.mz.hans, message.mz.noHans)
    setPie2(message.province, message.lb.pt, message.lb.ts, message.lb.gjzx, message.lb.art)
    
})

ipcRenderer.on('set-amount', (_, message) => {
    setFinishCount( message.amount )
})

ipcRenderer.on('set-map', (_, message)=>{
    setMap(`${message.drlbmc}`,message.own, message.finished)
    toggleBottom ('rigthMiddleLeft')
})

ipcRenderer.on('set-province-bar', (_, message)=>{
    setProvinceBar(message.finished, message.unfinished)
    toggleBottom ('rightLeft')
})

ipcRenderer.on('set-zy-bar', (_, message)=>{
    setZYBar(message.finished, message.unfinished)
    toggleBottom ('rightLeft')
})

ipcRenderer.on('set-college-bar', (_, message)=>{
    setCollegeBar(message.finished, message.unfinished)
    toggleBottom ('rightLeft')
})

ipcRenderer.on('set-history', (_, message) => {
    setHistory(message.title, message.data)
    toggleBottom ('rigthMiddleLeft')
})

ipcRenderer.on('set-rank', (_, message) => {
    setRank(message.type, message.data)
    toggleBottom ('rightLeft')
})
ipcRenderer.on('set-grade',(_,message) =>{
    setGrade(message.type,message.data,message.meanGarde)
    toggleBottom ('rightLeft')
})
ipcRenderer.on('Turn-on-automatic-switching',AutomaticSwitching)

ipcRenderer.on('Turn-off-automatic-switching',(_,message)=>{
    isAutomaticSwitching = false
    console.log('关闭自动切换')
})

