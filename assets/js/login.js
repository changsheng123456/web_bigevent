$(function(){
    // 点击"去注册账号"的链接
    $("#link_reg").on("click",function(){
        $(".login-box").hide();
        $(".reg-box").show();
    })

       // 点击"去登录"的链接
    $("#link_login").on("click",function(){
        $(".reg-box").hide();
        $(".login-box").show();
    })

    //从layui中获取form
    var form = layui.form;
    form.verify({
        //自定义一个pwd的检验规则，哪个表单项需要这个检验可以设置lay-verify='pwd'
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        //检验两次密码是否一致的检验
        repwd:function(value){
        //函数中形参value拿到的是确认密码框中输入的值
        //还需要拿到密码框中的值
        //然后进行一次等于的检验
        //如果检验失败，则return一个提示消息
        var pwd = $(".reg-box [name=password]").val();
        if(pwd != value){
            return "两次输入密码不一致"
        }
     }
    })

    //监听注册表单的提交事件
    $("#form_reg").on("submit",function(e){
        e.preventDefault();
        $.post("/api/reguser",
        {
            username:$("#form_reg [name=username]").val(),
            password:$("#form_reg [name=password]").val()
        },
        function(res){
            if(res.status!=0){
                return layer.msg(res.message)
            }

            layer.msg("注册成功");
            $("#link_login").click();
        })
    })

    $("#form_login").submit(function(e){
        e.preventDefault();
        $.ajax({
            // url: "http://ajax.frontend.itheima.net/api/login",
            //在baseAPi.js中对url进行了设置 所以直接写资源路径进行了
            url:"/api/login",
            method: "POST",
            data: $(this).serialize(),
            success:function(res){
                if(res.status!=0){
                    return layer.msg("登录失败");
                }
                console.log(res);
                layer.msg("登录成功");
                //将登陆成功后获得token字符串的值保存到localStorage中
                localStorage.setItem("token",res.token);
                location.href = "/index.html"

            }
        })
    })
})