// 这个函数会在每次调用$.get() 或 $.post() 或 $.ajax()的时候，会先调用这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){
    console.log(options);
    //发起真正的AJAX请求之前，统一拼接一下根路径
    options.url = "http://ajax.frontend.itheima.net" + options.url;
})