//分享到QQ空间数据
(function() {
    var p = {
        url : location.href,
        showcount : '1', /*是否显示分享总数,显示：'1'，不显示：'0' */
        desc : '号外 号外 给大家推荐一款HTML5绘图程序', /*默认分享理由(可选)*/
        summary : 'Painter是一款基于HTML5 Canvas绘图程序，能够运行在所有平台，非常强大，可以试试哦，亲，记得用支持html5的浏览器哦', /*分享摘要(可选)*/
        title : 'Painter', /*分享标题(可选)*/
        site : 'https://github.com/yanhaijing', /*分享来源 如：腾讯网(可选)*/
        pics : 'http://yanhaijing.github.io/Painter/images/Painter.gif', /*分享图片的路径(可选)*/
        style:'102',
        width:145,
        height:30
    };
    var s = [];
    for (var i in p) {
        s.push(i + '=' + encodeURIComponent(p[i] || ''));
    }
    $("#nav-share-qzone > a").attr("href", "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + s.join('&'));
})();


(function() {
    var p = {
        url : location.href, /*获取URL，可加上来自分享到QQ标识，方便统计*/
        desc : '号外 号外 给大家推荐一款HTML5绘图程序', /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
        title : 'Painter', /*分享标题(可选)*/
        summary : 'Painter是一款基于HTML5 Canvas绘图程序，能够运行在所有平台，非常强大，可以试试哦，亲，记得用支持html5的浏览器哦', /*分享摘要(可选)*/
        pics : 'http://yanhaijing.github.io/Painter/images/Painter.gif', /*分享图片(可选)*/
        flash : '', /*视频地址(可选)*/
        site : 'http://yanhaijing.github.io/Painter/', /*分享来源(可选) 如：QQ分享*/
        style : '101',
        width : 96,
        height : 24
    };
    var s = [];
    for (var i in p) {
        s.push(i + '=' + encodeURIComponent(p[i] || ''));
    }
    $("#nav-share-qq > a").attr("href", "http://connect.qq.com/widget/shareqq/index.html?" + s.join('&'));
})(); 

