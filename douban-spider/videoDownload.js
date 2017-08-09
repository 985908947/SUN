var fs = require('fs')
var download = require('./download')
fs.readFile('./arr1.json','utf-8',function (error,data) {
    var array = data.split(",")
    // console.log(array)
    array.forEach(function (item,index) {
        download(item, 'images', index + '.jpg')
    })
})

