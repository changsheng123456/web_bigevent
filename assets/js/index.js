$(function(){
    getUserInfo();

    $("#btnLogout").on("click",function(){
        layer.confirm("确定退出登录?",{icon:3,title:"提示"},function(index){
            //1. 清除本地存储的token
            localStorage.removeItem("token");
            //2. 重新跳转到登录也
            location.href = "/login.html"
            layer.close(index);
        })
    })
})

//获取用户基本信息
function getUserInfo(){
    $.ajax({
        method:"GET",
        url:"/my/userinfo",
        //请求头配置对象
        // headers:{
        //     Authorization: localStorage.getItem("token") || ''
        // },
        success:function(res){
            if(res.status!=0){
                return layer.msg("获取用户信息失败!");
            }

            renderAvatar(res.data);
        },
        // //无论成功与否都会调用complete函数
        // complete:function(res){
        //     console.log(res);
        //     //在complete函数中可以使用responseJSON属性拿到服务区响应回来的数据
        //     if(res.responseJSON.status == 1){
        //         console.log(res.responseJSON.message);
        //         //强制清空token
        //         localStorage.removeItem("token");
        //         //跳转登录页
        //         location.href = "/login.html"
        //     }
        // }
    })
}
//渲染用户头像
function renderAvatar(user){
    //1. 获取用户的名字，如果设置了昵称优先使用昵称
    var name = user.nickname || user.username 
    //2. 设置用户的名字
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    //3. 按需渲染用户头像
    if(user.user_pic!=null){
        //渲染图片头像
        $(".layui-nav-img").attr("src",user.user_pic).show();
        $(".text-avatar").hide();
    }else {
        //渲染文本头像
        $(".layui-nav-img").hide();
        //取名字的第一个字符作为文本头像的值 这里注意下字符串通过[0]的方式获取到了第一个字符
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}