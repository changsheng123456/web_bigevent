$(function(){
    var form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        somePwd:function(value){
            if(value == $("[name=oldPwd]").val()){
                return "新旧密码不能相同";
            }
        },
        rePwd:function(value){
            if(value != $("[name=newPwd]").val()){
                return "两次密码不一致";
            }
        }
    })

    $(".layui-form").on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:"POST",
            url:"/my/updatepwd",
            data:$(this).serialize(),
            success:function(res){
                if(res.status!=0){
                    return layer.msg("密码更新失败!");
                }
                console.log(this);
                layer.msg("密码更新成功!");
                $(".layui-form")[0].reset();
            }
        })
    })
})