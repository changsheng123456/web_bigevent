// 这个函数会在每次调用$.get() 或 $.post() 或 $.ajax()的时候，会先调用这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){
    //发起真正的AJAX请求之前，统一拼接一下根路径
    options.url = "http://ajax.frontend.itheima.net" + options.url;

    //这里给访问/my/路径的所有请求统一设置 身份验证信息
    if(options.url.indexOf("/my/")!=-1){
        options.headers = {
            Authorization:localStorage.getItem("token")
        }
    }

    //全局统一挂载complte回调函数,complete函数 是无论请求是否成功 都会执行的
    options.complete = function(res){
        console.log(res);
        //在complete函数中可以使用responseJSON属性拿到服务区响应回来的数据
        if(res.responseJSON.status == 1){
            console.log(res.responseJSON.message);
            //强制清空token
            localStorage.removeItem("token");
            //跳转登录页
            location.href = "/login.html"
        }
    }
})