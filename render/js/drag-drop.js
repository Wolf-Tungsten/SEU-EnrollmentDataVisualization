const dropArea = document.getElementById('container')
dropArea.ondragover = (ev) => {
  //阻止浏览器默认打开文件的操作
  ev.preventDefault();
}

dropArea.ondragleave = () => {}

dropArea.ondrop = (ev) => {
  ev.preventDefault();

  var drag_files = ev.dataTransfer.files;
  console.log(drag_files[0].path)

  //将文件地址传输到主进程
  ipcRenderer.send('import-data', drag_files[0].path)
}
