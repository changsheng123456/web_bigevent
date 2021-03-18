$(function(){

    var form = layui.form;
    form.verify({
        nickname: function(value){
            if(value.length>6){
                return "昵称的长度必须在1 ~ 6 之间!"
            }
        }
    })
    initUserInfo();

    function initUserInfo(){
        $.ajax({
            method:"GET",
            url:"/my/userinfo",
            success:function(res){
                console.log(res);
                if(res.status!=0){
                    return layer.msg("获取用户信息失败!")
                }
                form.val("formUserInfo",res.data);
            }
        })
    }

    // 目的是当用户修改了表单项的值以后，发现不是修改错了，通过点击重置按钮还原为最初的值
    $("#btnReset").on("click",function(e){
        // 阻止重置按钮会见所有表单项重置为空的效果
        e.preventDefault();
        initUserInfo();
    })

    $(".layui-form").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            method:"POST",
            url:"/my/userinfo",
            //this 代表form表单
            data:$(this).serialize(),
            success:function(res){
                if(res.status!=0){
                    return layer.msg("更新用户信息失败!");
                }

                layer.msg("更新用户信息成功!");
                //调用父页面中的方法重写渲染index页面 为了就是重写更新用户名为昵称名字 如果有的话
                window.parent.getUserInfo();
            }
        })
    })
    
})
