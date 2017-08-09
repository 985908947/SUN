var cheerio = require('cheerio')
var request = require('request')
var download = require('./download')

var options = {
    url: 'https://www.douban.com/',
    headers: {
        'Host': 'www.douban.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
    }
}
request.get(options, function (error, response, body) {
    var $ = cheerio.load(body)
    var hostImgArr = []
    var hostTitleArr = []
    var timeImgArr = []
    var movieImgArr = []
    var groupImgArr = []
    // 热点内容
    $(".albums>ul>li>.pic>a>img").each(function (index,element) {
        var hostImg = $(element).attr('data-origin')
        hostImgArr.push(hostImg)
        download(hostImg, 'hostImage', index + '.jpg')
    })
    $(".notes>ul>li>a").each(function (index,element) {
        var hostTitle = $(element).text()
        hostTitleArr.push(hostTitle)
    })

    // 豆瓣时间
    $(".time-list>li>a>img").each(function (index,element) {
        var time = {
            img: $(element).attr('src'),
            alt: $(element).attr('alt')
        }
        var timeImg = $(element).attr('src')
        timeImgArr.push(time)
        download(timeImg, 'timeImage', index + '.jpg')
    })
    // console.log(timeImgArr)

    // 视频
    // $(".main>.video-list>li>.video-title").each(function (index,element) {
    //     var videoImg = $(element).attr('href')
    //     console.log(videoImg)
    //     // videoImgArr.push(videoImg)
    //     // download(videoImg, 'videoImage', index + '.jpg')
    // })

    // 电影
    $(".movie-list>ul>li>.pic>a>img").each(function (index,element) {
        var movie  = {
            movieImg: $(element).attr('data-origin')
        }
        movieImgArr.push(movie)
        movieImg = $(element).attr('data-origin')
        download(movieImg, 'movieImage', index + '.jpg')
    })
    $(".movie-list>ul>li>.title>a").each(function (index,element) {
        movieImgArr[index].name = $(element).text()
    })
    $(".movie-list>ul>li>.rating>i").each(function (index,element) {
        movieImgArr[index].score = $(element).text()
    })
    // console.log(movieImgArr)

    // 小组
    $(".group-list>ul>li>.pic>a>img").each(function (index,element) {
        var group  = {
            groupImg: $(element).attr('data-origin')
        }
        groupImgArr.push(group)
        groupImg = $(element).attr('data-origin')
        download(groupImg, 'groupImage', index + '.jpg')
    })
    $(".group-list>ul>li>.info>.title>a").each(function (index,element) {
        groupImgArr[index].name = $(element).text()
    })
    $(".group-list>ul>li>.info").each(function (index,element) {
        groupImgArr[index].count = $(element).text()
    })

    console.log(groupImgArr)
})
