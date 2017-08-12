var request = require('request')
var fs = require('fs')
var path = require('path')
// 封装方法
// 参数1: 要下载的内容地址
// 参数2: 要保存的文件名
// 参数3: 要保存的文件名
function download(url, directory, filename) {
    // 根据当前目录生成该文件夹
    var dir = path.join(__dirname, directory)
    // 判断文件夹是否存在
    var isDir = fs.existsSync(dir)
    if (!isDir){
        // 如果不存在生产目录
        fs.mkdir(dir)
    }
    //生产文件路径
    var filePath = path.join(dir, filename)
    //下载保存
    request(url).pipe(fs.createWriteStream(filePath))
}
module.exports=download