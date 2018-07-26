$(function(){
    //输入框点击提示
    $('input[type=text]').focusin(function(){
        $(this).css('border','1px solid #3F89EC');
        $(this).parent().siblings('.mes').find('.error').hide().end().find('.tip').show();
    }).focusout(function(){
        $(this).css('border','1px solid #ddd');
        $(this).parent().siblings('.mes').find('.tip').hide();
    });

    $('input[type=password]').focusin(function(){
        $(this).css('border','1px solid #3F89EC');
        $(this).parent().siblings('.mes').find('.error').hide().end().find('ul').show();
    }).focusout(function(){
        $(this).css('border','1px solid #ddd');
        $(this).parent().siblings('.mes').find('ul').hide();
    });

//框内输入就会显示clear
    $('input').keyup(function(){
        if($(this).val()){
            $(this).next('.clear').show();
        }
    });
    //给clear添加事件
    $('.clear').click(function(){
        $(this).prev('input').val('');
        $(this).prev('input').focus();
        $(this).hide();
    })

    //添加警告
    $('#usr').blur(function(){
        if(isUsr()){
            $(this).parent().siblings('.mes').find('.error').show().find('span').eq(0).removeClass()
                .addClass('ok_icon').next('span').html('');
        }
        else{
            if($('#usr').val())
            {
                $(this).parent().siblings('.mes').find('.error').show().
                find('span').eq(0).removeClass().addClass('error_icon').
                next('span').html('用户名不能超过7个汉字或14个字符');
            }
        }
    });

    var isUsr = function(){
        var p=/^[a-zA-Z0-9\u4e00-\u9fa5]{1,14}$/;
        return p.test($('#usr').val());
    };

    $('#tel').blur(function(){
        if(isTel())
        {
            $(this).parent().siblings('.mes').find('.error').show().find('span').eq(0).removeClass()
                .addClass('ok_icon').next('span').html('');
        }
        else
        {
            if($('#tel').val())
            {
                $(this).parent().siblings('.mes').find('.error').show().find('span').eq(0).removeClass()
                    .addClass('error_icon').next('span').html('手机号码格式不正确');
            }
        }
    });

    var isTel=function(){
        var p=/^1\d{10}$/;
        return p.test($('#tel').val());

    };

    //密码判定

    //密码判定
    $('#pwd').keyup(function(){
        if(CheckLength())
        {
            $(this).parent().next('.mes').find('.pwd_tip').eq(0).css('color','#999');
        }else{
            $(this).parent().siblings('.mes').find('.pwd_tip').eq(0).css('color','red');
        }

        if(checkChar()){
            $(this).parent().next('.mes').find('.pwd_tip').eq(1).css('color','#999');
        }else{

            $(this).parent().siblings('.mes').find('.pwd_tip').eq(1).css('color','red');
        }

        if(!checkSpace()){
            $(this).parent().next('.mes').find('.pwd_tip').eq(2).css('color','#999');
        }else{
            $(this).parent().siblings('.mes').find('.pwd_tip').eq(2).css('color','red');
        }

        if(!checkSpace()&&checkChar()&&CheckLength())
        {
            $(this).parent().siblings('.mes').find('.error').show().find('span').eq(0).removeClass()
                .addClass('ok_icon').next('span').html('');
        }
    });

    var CheckLength=function(){
        return $('#pwd').val().length >= 6 && $('#pwd').val().length <=14;
    };
    var checkChar = function(){
        return /[0-9a-zA-Z|\.]/.test($('#pwd').val());
    };

    var checkSpace = function(){
        return /\s/g.test($('#pwd').val());
    };

    //验证码
    var checkYzm = function(){
        return false;
    };
    //协议
    var checkAgree = function(){
        if($('#agree').is(':checked')){
            return true;
        }else{
            return false;
        }
    };

//注册按钮
    $('.regBtn').click(function(){
        if(isUsr() && isTel() && CheckLength() && checkChar() && !checkSpace() && checkAgree()){
            alert('注册成功');
        }else{

            if(!isUsr()){
                $('#usr').css('border','1px solid red');
                $('#usr').parent().siblings('.mes').find('.error').show().find('span').eq(0).
                removeClass().addClass('error_icon').next('span').html('请您填写用户名');
            }

            if(!isTel()){
                $('#tel').css('border','1px solid red');
                $('#tel').parent().siblings('.mes').find('.error').show().find('span').eq(0).
                removeClass().addClass('error_icon').next('span').html('请您填写手机号');
            }

            if(!checkYzm()){
                $('#yzm').css('border','1px solid red');
                $('#yzm').parent().siblings('.mes').find('.error').show();
            }

            if(!CheckLength() || !checkChar() || checkSpace()){
                $('.mes').find('ul').hide();
                $('#pwd').css('border','1px solid red');
                $('#pwd').parent().siblings('.mes').find('.error').show().find('span').eq(0).
                removeClass().addClass('error_icon').next('span').html('请输入密码');
            }
                if(!checkAgree()){
                    $('#agree').parent().next('.mes').find('.error').show();
                }

        }
    });


})
