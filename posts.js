class Post{
    constructor(title,content,comments,_user){
        this.title=title;
        this.content=content;
        this.comments=comments;
        this.user=_user;
    }
    newcomment(comments){
        this.comments.push(comments);
    }
    edittitle(newtitle){
        this.title=newtitle;
    }
    editcontent(newcontent){
        this.content=newcontent;
    }
}
var posts=[];
var nowpostid=-1;
function newcomment(_userid,_comment){
    var tmp={
        userid:_userid,
        comment:_comment
    };
    return tmp;
}
function addpost(newpost){
    posts.push(newpost);
}
function showposts(){
    var nowdiv=localStorage.getElementById("showpost");
    var datas=localStorage.getItem('data')==null?[]:JSON.parse(localStorage.getItem('data'));
    var tmp='';
    for(var i=0;i<posts.length;i++){
        tmp+="<section><h3>";
        tmp+=posts[i].title;
        tmp+="</h3><br /><p>";
        tmp+=datas[posts[i].user].name;
        tmp+="</p></section>";
    }
    nowdiv.innerHTML=tmp;
}
function save(){
    localStorage.setItem("posts",JSON.stringify(posts));
}
function load(){
    if(localStorage.getItem("posts")==null){
        posts=[];
    } else{
        posts=JSON.parse(localStorage.getItem("posts"));
    }
}
function newcomment(){
    if(nowpostid==-1){
        return;
    }
    var _userid=localStorage.getItem("nowuser")==null?-1:JSON.parse(localStorage.getItem("nowuser"));
    var _comment=document.getElementById("comment").value,error_box=document.getElementById("error_box");
    
    if(tmp==-1){
        error_box.innerText="您还未登陆！";
        return;
    } else if(_comment==='' || _comment==null){
        error_box.innerText="输入内容不能为空！";
        return;
    } else{
        posts[nowpostid].newcomment(newcomment(tmp,_comment));
        save();
        window.location.reload();
    }    
}
