var fs = require('fs')
var download = require('./download')
fs.readFile('./arr6.json','utf-8',function (error,data) {
    console.log(data)
    var array = data.split(",")
    // console.log(array)
    array.forEach(function (item,index) {
        download(item, 'JDImages', index + '.jpg')
    })
})


