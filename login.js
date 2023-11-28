function login(){
    if(localStorage.getItem("nowuser")!=null){
        localStorage.removeItem("nowuser");
    }
    var userName=document.getElementById("getname").value,userPassword=document.getElementById("getpassword").value;//用户端的名字和密码
    var Errbox=document.getElementById("error_box");
    var datas=localStorage.getItem('data')==null?[]:JSON.parse(localStorage.getItem('data'));
    var state=-1;
    for(var i=0;i<datas.length;i++){
        if(datas[i].name==userName){
            state=i;
            break;
        }
    }
    console.log("user name id=",state);
    if(state==-1){
        Errbox.innerText="未找到用户名！";
        return;
    } else if(datas[state].pass==userPassword){
        //登陆成功
        localStorage.setItem("nowuser",JSON.stringify(state));
        window.history.back();
        alert("登陆成功！");
        return;
    } else{
        Errbox.innerText="密码错误！";
        return;
    }
}
function register(){
    var userName=document.getElementById("getname").value,userPassword=document.getElementById("getpassword").value;//用户端的名字和密码
    var Errbox=document.getElementById("error_box");
    if(userName=='' || userPassword==''){
        Errbox.innerText="账户或密码不能为空！";
        return;
    }
    console.log("start real register");
    var tmp=localStorage.getItem('data')==null?[]:JSON.parse(localStorage.getItem('data'));
    var state=-1;
    for(var i=0;i<tmp.length;i++){
        if(tmp[i].name==userName){
            state=i;
            break;
        }
    }
    if(state!=-1){
        Errbox.innerText="用户已存在！";
        return;
    }
    var obj={name:userName,pass:userPassword};
    tmp.push(obj);
    localStorage.setItem("data",JSON.stringify(tmp));
    window.history.back();
    alert("注册成功！");
}
function islogin(){
    return localStorage.getItem("nowuser")!=null && localStorage.getItem("nowuser").states!=-1;
}