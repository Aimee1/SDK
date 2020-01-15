(function (win) {
    win.indexStatics = {
        data: {
            phoneNumber: "",
            flag: false,
            way: false,   //false表示close按钮不显示
            codeType:1
        },
        exp: {
            phone: '//',
        },
    };
    win.indexMethods = {
        //页面的显示隐藏
        display: (panel_name,type,way) => {
            console.log("swich to " + panel_name);
            $(".container").hide();
            $("." + panel_name).show();
            type?indexStatics.data.codeType=type:'';
            way?indexStatics.data.way=way:false;
        },
        //登陆方式
        way: (loginWays) => {
            console.log(loginWays);
            win.PostMessageToNativeSDK(loginWays, {});
        },
        //
        getAuthCode: (phone_number) => {
            console.log("send authCode to " + phone_number+',indexStatics.data.codeType:'+indexStatics.data.codeType);
            let actionName =  "";
            switch (indexStatics.data.codeType){
                case 1:   
                    actionName= 'phoneLoginCode';    // 发送登录验证码
                    break;
                case 2:
                     actionName= 'sendForgetPWDCode';  //发送忘记密码验证码
                    break;
                case 3:
                        actionName= 'sendBindCode';   //发送绑定验证码  
                    break;
                case 4:
                        actionName= 'reSendBindCode';    //重新发送绑定验证码
                    break; 
                               
            }
            win.PostMessageToNativeSDK(actionName, {
                phone_number: phone_number
            })
            return true
        },
        //点击下一步
        clickNext: (phoneNumber,type) => {
            win.indexStatics.data.phoneNumber = phoneNumber;
            //把下步里面的电话号码修改
            $("#verification-code-number").html(phoneNumber)
            console.log(phoneNumber)
            //调接口需要开始倒计时
            indexStatics.data.codeType = type
            win.indexMethods.getAuthCode( phoneNumber);  //调接口需要开始倒计时
            $("#authCode").val("");
            $(".phone-code li i").html("");
           // win.indexMethods.display("verification-code");
        },
        clickNextForgetpsd:()=>{
            console.log($('#forget-password-account-input').val());
            win.PostMessageToNativeSDK('forgetPsdAccount', {
                account: $('#forget-password-account-input').val()
            })
        },
        //重新发送短信验证码
        resend: () => {
            //调接口需要开始倒计时
            (indexStatics.data.codeType===1)? indexStatics.data.codeType=1:indexStatics.data.codeType=4 
            win.indexMethods.getAuthCode( win.indexStatics.data.phoneNumber);  //调接口需要开始倒计时
        },
         //短信验证码验证
         phoneLoginBind: (authCode) => {
            console.log(authCode);
            let action_name =  "";
            switch (indexStatics.data.codeType){
                case 1:   
                    action_name= 'phone_login';    // 登录验证码
                    break;
                default:
                        action_name= 'phone_login_bind';       //绑定
             }
            win.PostMessageToNativeSDK(action_name, {
                phone: win.indexStatics.data.phoneNumber,
                authCode: authCode
            })
        },
        //实名认证取消
        certificationCancel: () => {
            console.log("certificationCancel");
            win.PostMessageToNativeSDK("certCancel", {});
        },
        //实名认证确定
        certification: (name, idCard) => {
            console.log("certification");
            win.PostMessageToNativeSDK("cert", {
                name: name,
                idCard: idCard
            });
        },
        fastGame:()=>{
            console.log("fastGame");
            win.PostMessageToNativeSDK("fastGame", {
            });
        },
        //账户密码登录
        accountLogin: (account, password) => {
            console.log("account login");
            win.PostMessageToNativeSDK("accountLogin", {
                account: account,
                password: password
            })
        },
        //忘记密码界面发送验证码
        forgetPasswordgetCode: () => {
            console.log($('#forget-password-number').html());
            win.indexMethods.getAuthCode($('#forget-password-number').html());  //调接口需要开始倒计时 
        },
        //忘记密码界面确定
        forgetPasswordBtn: () => {
            win.PostMessageToNativeSDK("retrievePassword", {
                phone_number: $('#forget-password-number').html(),
                yzm_str_forget: $('#forget-password-code').val(),
                pwd_new: $('#forget-password-newPsd').val(),
                pwd_new_confirm: $('#forget-password-psdConfirm ').val()
            })
        },
        //checkbox
        displayCheckbox: () => {
            //点击时候
            $(".checked").click(() => {
                if (!win.indexStatics.data.flag) {
                    $(".checked").attr("src", "static/images/check.png")
                    win.indexStatics.data.flag = !win.indexStatics.data.flag;
                }
                else {
                    $(".checked").attr("src", "static/images/check_on.png");
                    win.indexStatics.data.flag = !win.indexStatics.data.flag;
                }
            })
        },
        //账号注册
        accountRegisterbtn: () => {
                let checkBox = $(".checked").attr("src")
                if (checkBox != "static/images/check_on.png") {
                    alert("请勾选用户服务协议")
                    return
                }
                win.PostMessageToNativeSDK("account_register", {
                    account: $('#account-register-account').val(),
                    password: $('#account-register-psd').val(),
                    confirmPassword: $('#account-register-psdSure').val(),
            })
        },
        //立即注册
        registerNow:()=>{
            indexMethods.display('account-register');
            win.PostMessageToNativeSDK("SDK_StartAccountRegister", { }) 
        },
        //忘记密码
        StartResetPassword:()=>{
            indexMethods.display('forget-password-choose',2)
            win.PostMessageToNativeSDK("SDK_StartResetPassword", { }) 
        },
        //close关闭按钮退SDK
        close: () => {
            console.log("返回游戏")
            win.PostMessageToNativeSDK("backGame", {});
        },
        //退出游戏
        exitGame:()=>{
            console.log("exit game")
            win.PostMessageToNativeSDK("exitGame", {});
        },
          ///*取消退出游戏*/
          exitGameCancel:()=>{
            console.log("exit game cancel")
            win.PostMessageToNativeSDK("exitGameCancel", {});
        },
        //退出登录
        exitLogin:()=>{
            console.log("退出登录")
            win.PostMessageToNativeSDK("exitLogin", {});
        }, 
    
        //验证码界面返回
        codeBack: () => {
            switch (indexStatics.data.codeType){
                case 1:   
                   indexMethods.display('phone-login-container');   //返回主界面登录行为
                    break;
                default:
                    indexMethods.display('phone-bind');   //返回绑定手机界面
             }
        },
        //绑定手机
       bind:()=>{
             indexMethods.display('phone-bind',3)
             console.log('bind indexStatics.data.way'+indexStatics.data.way)
             if(indexStatics.data.way){
                 $('#phone-bind-close,#verification-code-close').show();
             }
             else{
                $('#phone-bind-close,#verification-code-close').hide();
             }
       },
      //绑定手机返回按钮
      phoneBindback:()=>{
        if(indexStatics.data.way){
            indexMethods.display('prompt-bind-information')
        }
        else{
            indexMethods.display('prompt-bind-visitor')
        }
      },
      //忘记密码返回
      goBackFromForget:()=>{
        indexMethods.display('account-login',2);
        win.PostMessageToNativeSDK("goBackFromForget", {});
      },
      //
      forgetPasswordNotBindBtn:()=>{
        win.PostMessageToNativeSDK("forgetPasswordNotBindBtn", {
            game:$('#forget-password-notBind-game').val(),
            account:$('#forget-password-notBind-account').val(),
            role:$('#forget-password-notBind-role').val(),
            name:$('#forget-password-notBind-district').html(),
            service_id:$('#forget-password-notBind-district').attr("data-serviceID"),
            ip:$('#forget-password-notBind-ip').val(),
            phone:$('#forget-password-notBind-phone').val(),
            psd:$('#forget-password-notBind-psd').val()
        });
      },
      //进入账号申诉页面
      accountComplaint:()=>{
        indexMethods.display('forget-password-notBind');
        win.PostMessageToNativeSDK("accountComplaint", { });
      }

    }
    
 
    win.display = (name) => {
        indexMethods.display(name)
    }
 
   win.showcloseBtn = (show)=>{
    if(show){
        $('.close').show()
       }else{
      $(".close").hide()
    }
   }
 
     win.showBindBtn=(show)=>{
          if(show){
                $('.showBindBtn').show()
          }else{
              $(".showBindBtn").hide()
          }
     }
      //选择游戏
    win.chooseGame=(name)=>{
        $('#forget-password-notBind-game').val(name)
     }
     //返回手机号
     win.forgetPasswordNumber=(number)=>{
        $("#forget-password-number").html(number);
     }
     /*页面加载获取账号信息*/
     win.accoutGroup = (str)=>{
        //  var obj= [
        //      {"uuid":"1111","usName":"55555","time":'1209-555'},
        //      {"uuid":"1111","usName":"55555","time":'1209-555'},
        //      {"uuid":"1111","usName":"55555","time":'1209-555'},
        //      {"uuid":"1111","usName":"55555","time":'1209-555'},
        //      {"uuid":"1111","usName":"55555","time":'1209-555'}]
         $('#accoutGroup1 li,#accoutGroup2 li').remove();
        var obj = JSON.parse(str);
        var h =  "";

        for(var  i = 0;i<obj.length;i++){
            if(i ===0){
                h+='  <li><img class="avatar" src="static/images/avatar.png"><div class="account"><span  class="accoutGroupInput" data-uuid="'+obj[i].uuid+'">'+obj[i].usName+'</span><p>上次登录&nbsp;&nbsp;<code class="time">'+obj[i].time+'</code></p></div> <img class="down downBtn" src="static/images/accoutGroupDown.png" ></li>'
            }
            else {
                h+=' <li><img class="avatar" src="static/images/avatar.png"><div class="account"> <span class="accoutGroupInput" data-uuid="'+obj[i].uuid+'">'+obj[i].usName+'</span><p>上次登录&nbsp;&nbsp;<code class="time">'+obj[i].time+'</code></p> </div>  <img class="down accountClose" src="static/images/close.png" > </li>'
               
            }
        }
        $("#accoutGroup1").append(h);
        $("#accoutGroup2").append(h);
       
       /*切换账号下拉*/
       var flag = true;
       $(".downBtn").click(function(){
           if(flag ){
              $("#accoutGroup1").hide();
              $("#accoutGroup2").show();
           }
           else {
               $("#accoutGroup1").show();
               $("#accoutGroup2").hide();
           }
           flag =!flag
       })
    
         /*具体账号*/
         $("#accoutGroup2 li .account").click(function(){
            $("#accoutGroup1").show();
            $("#accoutGroup2").hide();
            let $span = $(this).children('span');
            let $account =  $("#accoutGroup1 li .account")
            $account.children("span").html($span.html()).attr("data-uuid",$span.attr("data-uuid"));
            $account.children().find("code").html($(this).children( ).find("code").html());
        });
        
     
    //点击关闭
    $(".accountClose").click(function(){
        $(this).parent().remove();
        console.log('删除账号')
        let $ac = $(this).prev().children("span");
        window.PostMessageToNativeSDK("deletAccount",{
            uuid: $ac.attr("data-uuid"),
            accountName:$ac.html(),
        })
    })
    
        $("#enterGame").click(function(){
            console.log($("#accoutGroup1 li .account").children("span").attr("data-uuid")+"uuid");
            console.log($("#accoutGroup1 li .account").children("span").html()+"account");
            let $acc=$("#accoutGroup1 li .account")
            win.PostMessageToNativeSDK("enterGame", {
                uuid: $acc.children("span").attr("data-uuid"),
                accountName:$acc.children("span").html(),
            });
        })
    }

       /*页面加载游戏角色区服信息*/
       win.districtGroup = (obj)=>{
        //  var obj= [
        //      {"name":"角色1","service_id":'12088'},
        //      {"name":"角色14","service_id":'125855'},
        //      {"name":"角色154","service_id":'1565'},
        //      {"name":"角色12","service_id":'12025'},
        //      {"name":"角色13","service_id":'1001'}]
         $('#forget-password-notBind-accoutGroup li').remove();
       // var obj = JSON.parse(str);
        var h =  "";

        for(var  i = 0;i<obj.length;i++){
            h+= '<li  class="forget-password-notBind-district" data-serviceID="'+obj[i].service_id+'">'+obj[i].name+'</li>';
        }
        $("#forget-password-notBind-accoutGroup").append(h);
       
         /*具体账号*/
         $("#forget-password-notBind-accoutGroup .forget-password-notBind-district").click(function(){
             $('#forget-password-notBind-accoutGroup').hide()
            $('#forget-password-notBind-district').html($(this).html()).attr('data-serviceID',$(this).attr("data-serviceID"));
        });

        $('.notBindDown').bind('click',function(){
            $('#forget-password-notBind-accoutGroup').slideToggle(300);
        })
        
    }



})(window);


$(function () {
    //忘记密码确定按钮
    $("#forget-password-btn").click(() => {
        indexMethods.forgetPasswordBtn();
    });

    $(".close").click(() => {
        indexMethods.close();
    });
    indexMethods.displayCheckbox();
    // indexMethods.changeCode();
 
    $('input').blur(function () {
        $('html,body').stop().animate({
            scrollTop:0
        })
    });

    var oHeight = $(document).height(); //浏览器当前的高度
   
   $(window).resize(function(){
        if($(document).height() < oHeight){   
              $(".container").css("position","fixed");
        }else{
            $(".container").css("position","absolute");     
           }
        
   });
});