// import {loadjson,savejson} from './datas.mjs'
class Post {
    constructor(title, content, comments, _user) {
        this.title = title;
        this.content = content;
        this.comments = comments;
        this.user = _user;
    }
    newcomment(comment) {
        this.comments.push(comment);
    }
    edittitle(newtitle) {
        this.title = newtitle;
    }
    editcontent(newcontent) {
        this.content = newcontent;
    }
    show() {
        var datas = localStorage.getItem('data') == null ? [] : JSON.parse(localStorage.getItem('data'));
        var showdiv = Document.getElementById("postinfo");
        var tmp = "<section><h2>";
        tmp += this.title;
        tmp += "</h2><br /><p>";
        tmp += datas[this.user].name;
        tmp += "</p><br /><p>";
        tmp += this.content;
        tmp += "<p><br />";
        for (var i = 0; i < comments.length; i++) {
            tmp += "<span class=\"comment\" ><p>";
            tmp += comment[i].content;
            tmp += "</p><br /><p>";
            tmp += comment[i].username;
            tmp += "</p></span>";
        }
        tmp += "</section>";
        showdiv.innerHTML=tmp;
    }
}
var posts = [];
var nowpostid = -1;
function erroronload() {
    alert("出了一些问题，将在3秒内返回首页……");
    window.location.href = "index.html";
}

//保存与登入
const types=['nowuser','data','posts'];
function loadjson(){
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var f1=fso.OpenTextfile("./datas.json",true);
    var tmp=JSON.parse(f1.ReadAll());
    for(var i=0;i<types.length;i++){
        if(types[i] in tmp){
            localStorage.setItem(types[i],tmp[types[i]]);
        }
    }
}
function savejson(){
    var tmp={};
    for(var i=0;i<types.length;i++){
        if(localStorage.getItem(types[i])!=null){
            tmp[types[i]]=JSON.parse(localStorage.getItem(types[i]));
        }
    }
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var f1=fso.OpenTextfile("./datas.json",true);
    
    f1.write(JSON.stringify(tmp));
}
function save() {
    localStorage.setItem("posts", JSON.stringify(posts));
    savejson();
}
function load() {
    if (localStorage.getItem("nowuser") == null) {
        alert("请先登录");
        location.href = "login.html";
    }
    loadjson();
    if (localStorage.getItem("posts") == null) {
        posts = [];
    } else {
        posts = [];
        var tmp = JSON.parse(localStorage.getItem("posts"));
        for (var i = 0; i < tmp.length; i++) {
            var nval = new Post(tmp[i].title, tmp[i].content, tmp[i].comments, tmp[i].user);
            posts.push(nval);
        }
    }
    showposts();
}

//index.html部分
function newpost() {
    var _userid = localStorage.getItem("nowuser") == null ? -1 : JSON.parse(localStorage.getItem("nowuser"));
    var _title = document.getElementById("title").value, _content = document.getElementById("content").value, error_box = document.getElementById("error_box");
    if (_userid == -1) {
        error_box.innerText = "您还未登陆！";
        return;
    } else if (_title == '') {
        error_box.innerText = "标题不能为空！";
        return;
    } else if (_content == '') {
        error_box.innerText = "内容不能为空！";
        return;
    } else {
        var tmp = new Post(_title, _content, [], _userid);
        posts.push(tmp);
        save();
        window.location.reload();
        return;
    }
}
function showposts() {
    var nowdiv = document.getElementById("showpost");
    var datas = localStorage.getItem('data') == null ? [] : JSON.parse(localStorage.getItem('data'));
    var tmp = '';
    for (var i = 0; i < posts.length; i++) {
        tmp += "<div class=\"post\"><h3><a href=\"posts.html?post=";
        tmp += String(i + 1);
        tmp += "\">";
        tmp += posts[i].title;
        tmp += "</a></h3><p>";
        tmp += datas[posts[i].user].name;
        tmp += "</p></div><br />";
    }
    console.log("tmp=", tmp);
    console.log("posts=", posts);
    nowdiv.innerHTML = tmp;
}

//评论部分（posts.html）

function newcomment() {
    if (nowpostid == -1) {
        return;
    }
    var tmp = localStorage.getItem("nowuser") == null ? -1 : JSON.parse(localStorage.getItem("nowuser"));
    var _comment = document.getElementById("comment").value, error_box = document.getElementById("error_box");

    if (tmp == -1) {
        error_box.innerText = "您还未登陆！";
        return;
    } else if (_comment === '' || _comment == null) {
        error_box.innerText = "输入内容不能为空！";
        return;
    } else {
        posts[nowpostid].newcomment({userid:tmp,comment:_comment});
        console.log("new comment=",{userid:tmp,comment:_comment});
        save();
        window.location.reload();
    }
}

function getUrl(url) {
    if (url.indexOf('?') == -1) return {};
    var arr = url.split('?');
    var params = arr[1].split('&');
    var obj = {};
    for (var i = 0; i < params.length; i++) {
        var param = params[i].split('=');
        obj[param[0]] = param[1];
    }
    return obj;
}

function loadpost() {
    if (localStorage.getItem("nowuser") == null) {
        alert("请先登录");
        location.href = "login.html";
    }
    if (localStorage.getItem("posts") == null) {
        posts = [];
    } else {
        posts = [];
        var tmp = JSON.parse(localStorage.getItem("posts"));
        for (var i = 0; i < tmp.length; i++) {
            var nval = new Post(tmp[i].title, tmp[i].content, tmp[i].comments, tmp[i].user);
            posts.push(nval);
        }
    }
    var obj = getUrl(window.location.href);
    if ('post' in obj) {
        if (obj.post > posts.length || obj.post < 0) {
            erroronload();
        } else {
            nowpostid = obj.post - 1;
            console.log("nowpostid=", nowpostid);
        }
    } else {
        erroronload();
    }
    var datas = localStorage.getItem('data') == null ? [] : JSON.parse(localStorage.getItem('data'));
    var post_show = document.getElementById("postinfo"), nowpost = posts[nowpostid];
    var tmp = "<section><h2>" + nowpost.title + "</h2><p>" + nowpost.content + "</p></section>";
    if (nowpost.comments.length >= 1) {
        for (var i = 0; i < nowpost.comments.length; i++) {
            tmp += "<section><p>" + nowpost.comments[i].comment + "</p><p>" + datas[nowpost.comments[i].userid].name + "</p></section>";
        }
    }
    post_show.innerHTML = tmp;
}