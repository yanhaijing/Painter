//分享到QQ空间数据
(function() {
    var p = {
        url : location.href,
        showcount : '1', /*是否显示分享总数,显示：'1'，不显示：'0' */
        desc : '推荐一款HTML5绘图程序', /*默认分享理由(可选)*/
        summary : 'HTML5绘图程序', /*分享摘要(可选)*/
        title : 'Painter', /*分享标题(可选)*/
        site : 'https://github.com/yanhaijing', /*分享来源 如：腾讯网(可选)*/
        pics : '../images/Painter.gif', /*分享图片的路径(可选)*/
        style:'102',
        width:145,
        height:30
    };
    var s = [];
    for (var i in p) {
        s.push(i + '=' + encodeURIComponent(p[i] || ''));
    }
    $("#nav-share-qzone").attr("href", "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + s.join('&'));
})(); 