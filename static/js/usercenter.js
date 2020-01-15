(function (win) {
    win.userStatics={
          msgId:'-1'
    };
    win.userMethods = {
        /*****/
        deleteBugWarnRequest: function () {
            let { uuid, game_id } = statics.urlCode;
            $.post(statics.base + "user_messages/del_bug_warn", {
                uuid: uuid,
                game_id: game_id
            }, function (result) {
                console.log(result);
                var res = $.parseJSON(result);
                console.log(res);
                if (res.error_code == 0) {
                    $("#new-mgs").hide();
                }
            }).fail(function (result) {
                // alert(result.error_reason);
            })
        },
        // 个人中心消息红点
        rash: function () {
            // 我的消息和客服反馈红点
            let { uuid, game_id } = statics.getRequest();
         
            var message_data = {
                //  game_id=FF000001CL01&uuid=ff_zceviN8Jx24F9L0UIk
                game_id: game_id,
                uuid: uuid
            }
            $.post(statics.base + "user_messages/red_point", message_data, function (result) {
                console.log(result);
                var res = $.parseJSON(result);
                console.log(res);
                if (res.error_code == 0) {
                    console.log(res.error_code);
                    console.log("111" + res.data.user_message);
                    if (res.data.user_message == true) {
                        console.log(res.data.user_message);
                        $(".message span").addClass("active");
                        $(".customer_service span").addClass("active");
                    }
                    if (res.data.bug_list == true) {
                        $("#new-mgs").show();
                    }
                }
            })
        },
        resizeElements: function () {
            let { uname, change_phone_show } = statics.urlCode;
            $(".personal span").text(uname);
            if (change_phone_show == "false") {
                $(".lister ul li:first").hide();
            }
        },
        // 消息列表
        post_list(){
            $.post(statics.base + "user_messages/data", { uuid:statics.urlCode.uuid }, function (result) {
                var res = JSON.parse(result);
                var html = "";
                $(".lister ul").html("");
                $.each(res.messages, function (i, val) {
                    if (val.is_read) {
                        html += '<li><a href="javascript:;" onclick="userMethods.goToDetail('+val.id+')">' + val.title + '</a></li>'
                    } else {
                        html += '<li><a href="javascript:;"  onclick="userMethods.goToDetail('+val.id+')" class="active">' + val.title + '</a></li>'
                    }
                    $(".lister ul").html(html);
                })
            }).fail(function (result) {
               
            })
        },
        // 删除个人消息
        post_delete(){
            $.post(statics.base + "user_messages/del", {id:userStatics.msgId,uuid:statics.urlCode.uuid}, function (result) {
                console.log(result);
                var res = $.parseJSON(result);
                console.log(res);
                if(res.error_code==0){
                    methods.display('lister_message');
                    userMethods.post_list();
                }  
            })
        },
        // 消息详情
        goToDetail(id){
            $('.user-message').show();
            $('.lister_message').hide();
            userStatics.msgId = id;
            $('.user-message .center').html('');
            let html ='';
            $.post(statics.base + "user_messages/detail", { uuid: statics.urlCode.uuid,user_message_id: id }, function (result) {
                console.log(result);
                var res = $.parseJSON(result);
                if(res.error_code==0){
                    html += `<h2>${res.detail.title}</h2>
                    <p>${res.detail.content}</p>
                    <a href="javascript:;">删除邮件</a>`;
                    $('.user-message .center').append(html);   
                }
            })
        },  
        //绑定手机
        bind:()=>{
            console.log('personal center bind btn');
            win.PostMessageToNativeSDK("personalCenterBindBtn", {});
        },
        //点击下一步
        clickNext: (phoneNumber) => {
            win.statics.data.phoneNumber= phoneNumber;
            //把下步里面的电话号码修改
            $("#verification-code-number").html(phoneNumber)
            console.log(phoneNumber)
            //调接口需要开始倒计时
            win.PostMessageToNativeSDK('sendBindCode', {    //调接口需要开始倒计时
                phone_number: win.statics.data.phoneNumber
            })
            $("#authCode").val("");
            $(".phone-code li i").html("");
           // win.indexMethods.display("verification-code");
        },
        //绑定手机返回按钮
       phoneBindback:()=>{
        console.log('返回提示绑定页面');
        win.PostMessageToNativeSDK("personalCenterBindBack", {});
      },
          //短信验证码验证
          phoneLoginBind: (authCode) => {
            console.log(authCode+win.statics.data.phoneNumber);
            win.PostMessageToNativeSDK('phone_login_bind', {
                phone: win.statics.data.phoneNumber,
                authCode: authCode
            })
        },
         //验证码界面返回
         codeBack: () => {
            console.log('返回绑定手机');
            win.PostMessageToNativeSDK('backbindPhone', { })
        },
          //重新发送短信验证码
          resend: () => {
            win.PostMessageToNativeSDK('reSendBindCode', {    //调接口需要开始倒计时
                phone_number: win.statics.data.phoneNumber
            })
        },  
    }
    //个人中心客户端传递url参数    
    win.setupRequestParams = function (data) {
        var res = JSON.parse(data);
        statics.urlCode = Object.assign(res);
        userMethods.resizeElements();
        userMethods.deleteBugWarnRequest();
        // 我的消息
        userMethods.post_list();
        //获取验证码
        $(".change span").html(statics.urlCode.iphone);
    }
    // 公共头部
    win.disdplayHeader=function(title,help){
        $("div").hide();
        $(".customer").show();
        $("#title span").html(title);
        var height=$('.header').outerHeight(true);  
        PostMessageToNativeSDK('headerHeight',{
            headerHeight:height, 
        });
        var html = '';
        var headerClass = help=="show"? "header help":"header";
            html += '<div class="'+headerClass+'">';
            html += '<a href=\"javascript:;\" id=\"title\"><img src=\"static/images/l-back.png\" alt=\"\"> <span>'+title+'</span></a>';
            if(help=="show"){
                html += '<span id=\"help\">使用帮助</span>';
            }
        html += '</div>';
        $(".customer").html('');
        $(".customer").append(html);
    }
    win.isIPhoneX=function(Callable,number){
        if(Callable=="ture"){
        $(".header").css({"padding-left":number,"padding-right":number});
        $(".header img").css("margin",".2rem .2rem .1rem 0rem");
        $(".l-iphonex").addClass("style-iphonex");
        $(".style-iphonex").css({"padding-left":number,"padding-right":number});
        $(".style-iphonex div").addClass("iphonex");    
        $(".container .header").css({"padding-left":"0","padding-right":"0"});
        }
        var height=$('.header').outerHeight(true);
        PostMessageToNativeSDK('headerHeight',{
        headerHeight:height, 
        });

    }
    // 清除数据
    win.isClear=function(){
        clearInterval(statics.data.time);
        $(".getCodes").text("获取验证码").removeAttr("disabled");
        $("input").val("");
    }
})(window);

    $(function () {
        //个人中心
        $("#switch").click(function () {
            PostMessageToNativeSDK('switchAccount');
        });
        // 返回游戏
        $(".backGame").click(function(){
            PostMessageToNativeSDK('backGame');
        });
        // 返回游戏iphoneX
        $(".backGames").click(function(){
            PostMessageToNativeSDK('backGames');
        });
        // 返回个人中心
        $(".backs").click(function(){
            methods.display('user-box');
        });
        // 确认解绑
        $(".input-ok").click(function () {
            var iphone = $("#iphone").val();
            var old = $("#old-pw").val();
            var new_pw = $("#new-pw").val();
            var new_pw_ok = $("#new-pw-ok").val();
            PostMessageToNativeSDK('changePassword', {
                iphone: iphone,
                old: old,
                new_pw: new_pw,
                new_pw_ok: new_pw_ok,
            })
        });
        $('.l_input input').blur(function () {
            $('html,body').stop().animate({
                scrollTop:0
            })
        });
        // 点击修改密码
        $(".change_password").click(function () {
            PostMessageToNativeSDK("resertPassword");
        });
        // 点击更换手机绑定
        $(".iphone-d").click(function () {
         PostMessageToNativeSDK("resetPhone");
        });
        // 解绑验证码
        $("#oldCode").click(function () {
            PostMessageToNativeSDK("sendUnbindCode");
        });
        //更换绑定修改
        $(".next").click(function () {
            var oldCode = $("#old_code").val();
            PostMessageToNativeSDK("unbindPhone",{oldCode:oldCode});
        });
        // 更换绑定获取手机号
        $("#newCode").click(function () {
            var iphone = $("#iphone").val();
            PostMessageToNativeSDK("sendBindNewPhoneCode", {
                iphone: iphone,        //更换的手机号
            });
        });
        // 更换绑定确认按钮传递验证码y
        $(".news-replace").click(function () {
            var iphone = $("#iphone").val();
            var new_code = $("#new_code").val();
            PostMessageToNativeSDK("bindNewPhone", {
                new_code: new_code,    //更换的手机号验证码
                iphone: iphone,        //更换的手机号
            });
        });
        // 修改密码返回键
        $(".l_back").click(function () {
            methods.display('user-box');
        });
        // 修改密码获取验证码
        $("#getCodes").click(function(){
            var pw_iphone=$("#forget-password-number").val();
            PostMessageToNativeSDK("snedChangepsCode",{pw_iphone:pw_iphone});
        });
         // 确认修改
         $("#forget-password-btn").click(function(){
            var pw_iphone=$("#forget-password-number").val();
            var forget_password_code=$("#forget-password-code").val();
            var forget_password_newPsd=$("#forget-password-newPsd").val();
            var forget_password_psdConfirm=$("#forget-password-psdConfirm").val();
            PostMessageToNativeSDK("okChangePassword",{
                pw_iphone:pw_iphone,
                forget_password_code:forget_password_code,
                forget_password_newPsd:forget_password_newPsd,
                forget_password_psdConfirm:forget_password_psdConfirm
            });
        });
        
        // 是否删除邮件
        $(document).on('click','.center a',function(){
            $(".mask").show();
        });
        // 再次确认
        $("#l-backs").click(function(){
            $(".mask").hide();
        });
        // 继续
        $("#continues").click(function(){
            userMethods.post_delete();
            $(".mask").hide();
        });
        //客服反馈
        $(".customer_service").click(function(){
            PostMessageToNativeSDK("customerFeedback");
        });
        $(document).on('click','.open-page',function(){
            let urlClass = $(this).attr('data-class');
            if(urlClass){
                methods.display(urlClass);
            }
        });
        $('.l_input input').blur(function () {
            $('html,body').stop().animate({
                scrollTop:0
            });
        });
        // 支付返回
        $("#go-back").click(function(){
            PostMessageToNativeSDK("goBack");
        });
        // 继续
        $("#continue").click(function(){
            $(".mask").hide();
        });
        // 绑定手机返回
        $(".l-bindingIphone").click(function(){
            PostMessageToNativeSDK("l-bindingIphone");
        })
        // 顶部头部修改title
        $("#title").click(function(){
            PostMessageToNativeSDK("backCenter");
        });
        //返回清除l-
        $("#l-back").click(function(){
            isClear();
        });
        // 消息列表返回
         $(".back_user").click(function(){
            methods.display('lister_message');
            userMethods.post_list();
        });
    });