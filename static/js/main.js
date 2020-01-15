require("expose-loader?$!jquery");
import '../css/style.less';
import './self-adaption'

(function (win) {
    win.statics = {
        base: "https://sh-apiservice.00joy.com/",
        urlCode: {
            uuid: '',
            game_id: '',
            uname: '',
            iphone: '',
            change_phone_show: '',
        },
        data:{
            time:"",
            phoneNumber:''
        },
        getRequest: function () {
            //获取url中"?"符后的字串
            var url = location.search;
            var requestParam = new Object();
            if (url.indexOf("?") != -1) {
                var params = url.substr(1).split("&");
                var keyAndValue = [];
                for (var i = 0; i < params.length; i++) {
                    keyAndValue = params[i].split("=");
                    requestParam[keyAndValue[0]] = unescape(keyAndValue[1]);
                }
                return requestParam;
            }
        }
    };
    win.methods = {
          //输入验证码
          changeCode: function () {
            var $input = $("#authCode")
                , $li = $(".phone-code li")
                , expNum = /^[\d]+$/
                , inputLength = 0;
            $($li[0]).find("i").text("|");
            $($li[0]).addClass("current");
            $input.focus();
            $(document).click(function () {
                $input.focus()
            });
            $(document).click();
            $(".phone-code").on("click", function () {
                inputLength = $input.val().length;
                $input.focus();
                $li.find("i").text("");
                $input.val("");
                $($li[0]).find("i").text("|");
                $($li[0]).addClass("current");
            });
            $input.on("input", function (n) {
                inputLength = $input.val().length;
                if ($input.val() && expNum.test($input.val())) {
                    $($li[inputLength - 1]).find("i").text($input.val().substring(inputLength - 1, inputLength));
                    $($li[inputLength]).find("i").text("|");
                    $($li[inputLength]).addClass("current").siblings().removeClass("current");
                }
                if (4 === inputLength) {
                    $input.blur();
                    $li.removeClass("current");
                    console.log($input.val());
                    //验证成功实名认证界面            
                    try{
                        win.indexMethods.phoneLoginBind($("#authCode").val());
                        return
                    }
                    catch(e){
                       //console.log(e)
                    } 
                    try{ 
                        win.userMethods.phoneLoginBind($("#authCode").val());}
                    catch(e){
                      //  console.log(e)
                     } 
                   
                } 
            });
            $input.blur(function(){
                
            });
            $(document).on("keyup", function (t) {
                8 === t.keyCode && ($li.find("i").text(""),
                    $li.removeClass("current"),
                    $input.val(""),
                    $($li[0]).find("i").text("|"),
                    $($li[0]).addClass("current"),
                    $(document).click())
            });
        },
        //页面的显示隐藏
        display:(panel_name,type) => {
            console.log("swich to " + panel_name);
            $(".container,.user-container").hide();
            $("." + panel_name).show();
            type?statics.data.codeType=type:'';
        },
       
}

    //倒计时
    win.update_p = (num, t, id,lessClass) => {
        if (num >= t) {
            $("#" + id,lessClass).text("重新发送").removeAttr("disabled");
            window.clearInterval( statics.data.time);
        } else {
            let printnr = 0;
            printnr = t - num;
            $("#" + id,lessClass).text("" + printnr + "S").attr("disabled", "disabled");
        }
    }
    
    win.code_Countdown = (ID) => {
        let countdown = 60;
        let id = ID;
        let i = 1;
        statics.data.time= setInterval(() => {
             update_p(i, countdown, id);
            i++
        }, 1000)
    }
   win.resetSendCodeButton=(id)=>{
        window.clearInterval(statics.data.time);
        $("#"+id).text("获取验证码").removeAttr("disabled");
    }


    //安卓和ios调用一套方法
    win.PostMessageToNativeSDK = (action, data) => { // call back function
        const obj = {};
        obj.data = data;
        obj.action = action;
        const objStr = JSON.stringify(obj);
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
            try {
                return window.webkit.messageHandlers.NKJSObject.postMessage(objStr);
            } catch (err) {
                console.log(err)
            }

        } else if (userAgent.match(/Android/i)) {
            try {
                return window.NKJSObject.receivedMessageFromJS(objStr)
            } catch (err) {
                console.log(err)
            }
        }
    }
    

    win.display = (name) => {
        methods.display(name)
    }

    win.showHide=( name)=>{
        console.log("弹窗显示："+name);
        $(".master").hide();
        $("." + name).show();
        $('.'+name).children('.container').show()
    }

})(window);


$(function () {

    let [w, h] = [innerWidth, innerHeight];
    if (w == 568 && h == 320) {
        $('html').css("font-size", "40px");
    }

    methods.changeCode();

    $('.master input').blur(function () {
        $('html,body').stop().animate({
            scrollTop:0
        })
    });

});

