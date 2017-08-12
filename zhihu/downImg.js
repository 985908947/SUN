var fs = require('fs')
var download = require('./download')
fs.readFile('./arr1.json','utf-8',function (error,data) {
    var array = data.split(",")

    array.forEach(function (item,index) {
        console.log(item)
        download(item, 'image', index + '.jpg')
    })
})

