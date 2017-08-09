var webpage = require('webpage')
var page = webpage.create()
phantom.outputEncoding = 'utf-8'

var fs = require('fs')
page.onConsoleMessage = function(msg, lineNum, sourceId) {
    console.log('CONSOLE: ' + msg);
};
page.open('https://www.douban.com/', function (status) {
    if (status === 'success') {
        console.log('加载成功')
        console.log(page.title)
        /****************************下午分割线******************************/
        // includeJs
        // 浏览器可以识别其他js库,可以引入一下代码
        // 例如: jQuery
        page.includeJs('https://code.jquery.com/jquery-3.2.1.min.js', function () {
            // 实际情况,浏览器加载网页,有部分内容延迟加载
            // 比如: ajax请求
            // 需要延迟 10秒 加载数据
            setTimeout(function () {
                // 对浏览器中的网页进行操作
                // 比如: dom操作, 事件
                var arrString1 = page.evaluate(function () {
                    var arr = []
                    // 通过jQuery获取对应的img的src
                    $('.main>.video-list>li>.video-cover>a').each(function (index, element) {
                        console.log($(element).css('background-image').replace('url(','').replace(')',''))
                        // 将获取的src添加到数组中
                        arr.push($(element).css('background-image').replace('url(','').replace(')',''))
                    })
                    // 将数组返回
                    return arr
                })
                // 写入文件
                fs.write('./arr1.json',arrString1,'w')
                phantom.exit(0)
            }, 3000)
        })
        /****************************下午分割线******************************/
    } else {
        console.log('加载失败')
        phantom.exit(0)
    }

})

