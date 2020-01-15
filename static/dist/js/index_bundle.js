/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./static/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./static/js/index.js":
/*!****************************!*\
  !*** ./static/js/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n(function (win) {\n  win.indexStatics = {\n    data: {\n      phoneNumber: \"\",\n      flag: false,\n      way: false,\n      //false表示close按钮不显示\n      codeType: 1\n    },\n    exp: {\n      phone: '//'\n    }\n  };\n  win.indexMethods = {\n    //页面的显示隐藏\n    display: function display(panel_name, type, way) {\n      console.log(\"swich to \" + panel_name);\n      $(\".container\").hide();\n      $(\".\" + panel_name).show();\n      type ? indexStatics.data.codeType = type : '';\n      way ? indexStatics.data.way = way : false;\n    },\n    //登陆方式\n    way: function way(loginWays) {\n      console.log(loginWays);\n      win.PostMessageToNativeSDK(loginWays, {});\n    },\n    //\n    getAuthCode: function getAuthCode(phone_number) {\n      console.log(\"send authCode to \" + phone_number + ',indexStatics.data.codeType:' + indexStatics.data.codeType);\n      var actionName = \"\";\n\n      switch (indexStatics.data.codeType) {\n        case 1:\n          actionName = 'phoneLoginCode'; // 发送登录验证码\n\n          break;\n\n        case 2:\n          actionName = 'sendForgetPWDCode'; //发送忘记密码验证码\n\n          break;\n\n        case 3:\n          actionName = 'sendBindCode'; //发送绑定验证码  \n\n          break;\n\n        case 4:\n          actionName = 'reSendBindCode'; //重新发送绑定验证码\n\n          break;\n      }\n\n      win.PostMessageToNativeSDK(actionName, {\n        phone_number: phone_number\n      });\n      return true;\n    },\n    //点击下一步\n    clickNext: function clickNext(phoneNumber, type) {\n      win.indexStatics.data.phoneNumber = phoneNumber; //把下步里面的电话号码修改\n\n      $(\"#verification-code-number\").html(phoneNumber);\n      console.log(phoneNumber); //调接口需要开始倒计时\n\n      indexStatics.data.codeType = type;\n      win.indexMethods.getAuthCode(phoneNumber); //调接口需要开始倒计时\n\n      $(\"#authCode\").val(\"\");\n      $(\".phone-code li i\").html(\"\"); // win.indexMethods.display(\"verification-code\");\n    },\n    clickNextForgetpsd: function clickNextForgetpsd() {\n      console.log($('#forget-password-account-input').val());\n      win.PostMessageToNativeSDK('forgetPsdAccount', {\n        account: $('#forget-password-account-input').val()\n      });\n    },\n    //重新发送短信验证码\n    resend: function resend() {\n      //调接口需要开始倒计时\n      indexStatics.data.codeType === 1 ? indexStatics.data.codeType = 1 : indexStatics.data.codeType = 4;\n      win.indexMethods.getAuthCode(win.indexStatics.data.phoneNumber); //调接口需要开始倒计时\n    },\n    //短信验证码验证\n    phoneLoginBind: function phoneLoginBind(authCode) {\n      console.log(authCode);\n      var action_name = \"\";\n\n      switch (indexStatics.data.codeType) {\n        case 1:\n          action_name = 'phone_login'; // 登录验证码\n\n          break;\n\n        default:\n          action_name = 'phone_login_bind';\n        //绑定\n      }\n\n      win.PostMessageToNativeSDK(action_name, {\n        phone: win.indexStatics.data.phoneNumber,\n        authCode: authCode\n      });\n    },\n    //实名认证取消\n    certificationCancel: function certificationCancel() {\n      console.log(\"certificationCancel\");\n      win.PostMessageToNativeSDK(\"certCancel\", {});\n    },\n    //实名认证确定\n    certification: function certification(name, idCard) {\n      console.log(\"certification\");\n      win.PostMessageToNativeSDK(\"cert\", {\n        name: name,\n        idCard: idCard\n      });\n    },\n    fastGame: function fastGame() {\n      console.log(\"fastGame\");\n      win.PostMessageToNativeSDK(\"fastGame\", {});\n    },\n    //账户密码登录\n    accountLogin: function accountLogin(account, password) {\n      console.log(\"account login\");\n      win.PostMessageToNativeSDK(\"accountLogin\", {\n        account: account,\n        password: password\n      });\n    },\n    //忘记密码界面发送验证码\n    forgetPasswordgetCode: function forgetPasswordgetCode() {\n      console.log($('#forget-password-number').html());\n      win.indexMethods.getAuthCode($('#forget-password-number').html()); //调接口需要开始倒计时 \n    },\n    //忘记密码界面确定\n    forgetPasswordBtn: function forgetPasswordBtn() {\n      win.PostMessageToNativeSDK(\"retrievePassword\", {\n        phone_number: $('#forget-password-number').html(),\n        yzm_str_forget: $('#forget-password-code').val(),\n        pwd_new: $('#forget-password-newPsd').val(),\n        pwd_new_confirm: $('#forget-password-psdConfirm ').val()\n      });\n    },\n    //checkbox\n    displayCheckbox: function displayCheckbox() {\n      //点击时候\n      $(\".checked\").click(function () {\n        if (!win.indexStatics.data.flag) {\n          $(\".checked\").attr(\"src\", \"static/images/check.png\");\n          win.indexStatics.data.flag = !win.indexStatics.data.flag;\n        } else {\n          $(\".checked\").attr(\"src\", \"static/images/check_on.png\");\n          win.indexStatics.data.flag = !win.indexStatics.data.flag;\n        }\n      });\n    },\n    //账号注册\n    accountRegisterbtn: function accountRegisterbtn() {\n      var checkBox = $(\".checked\").attr(\"src\");\n\n      if (checkBox != \"static/images/check_on.png\") {\n        alert(\"请勾选用户服务协议\");\n        return;\n      }\n\n      win.PostMessageToNativeSDK(\"account_register\", {\n        account: $('#account-register-account').val(),\n        password: $('#account-register-psd').val(),\n        confirmPassword: $('#account-register-psdSure').val()\n      });\n    },\n    //立即注册\n    registerNow: function registerNow() {\n      indexMethods.display('account-register');\n      win.PostMessageToNativeSDK(\"SDK_StartAccountRegister\", {});\n    },\n    //忘记密码\n    StartResetPassword: function StartResetPassword() {\n      indexMethods.display('forget-password-choose', 2);\n      win.PostMessageToNativeSDK(\"SDK_StartResetPassword\", {});\n    },\n    //close关闭按钮退SDK\n    close: function close() {\n      console.log(\"返回游戏\");\n      win.PostMessageToNativeSDK(\"backGame\", {});\n    },\n    //退出游戏\n    exitGame: function exitGame() {\n      console.log(\"exit game\");\n      win.PostMessageToNativeSDK(\"exitGame\", {});\n    },\n    ///*取消退出游戏*/\n    exitGameCancel: function exitGameCancel() {\n      console.log(\"exit game cancel\");\n      win.PostMessageToNativeSDK(\"exitGameCancel\", {});\n    },\n    //退出登录\n    exitLogin: function exitLogin() {\n      console.log(\"退出登录\");\n      win.PostMessageToNativeSDK(\"exitLogin\", {});\n    },\n    //验证码界面返回\n    codeBack: function codeBack() {\n      switch (indexStatics.data.codeType) {\n        case 1:\n          indexMethods.display('phone-login-container'); //返回主界面登录行为\n\n          break;\n\n        default:\n          indexMethods.display('phone-bind');\n        //返回绑定手机界面\n      }\n    },\n    //绑定手机\n    bind: function bind() {\n      indexMethods.display('phone-bind', 3);\n      console.log('bind indexStatics.data.way' + indexStatics.data.way);\n\n      if (indexStatics.data.way) {\n        $('#phone-bind-close,#verification-code-close').show();\n      } else {\n        $('#phone-bind-close,#verification-code-close').hide();\n      }\n    },\n    //绑定手机返回按钮\n    phoneBindback: function phoneBindback() {\n      if (indexStatics.data.way) {\n        indexMethods.display('prompt-bind-information');\n      } else {\n        indexMethods.display('prompt-bind-visitor');\n      }\n    },\n    //忘记密码返回\n    goBackFromForget: function goBackFromForget() {\n      indexMethods.display('account-login', 2);\n      win.PostMessageToNativeSDK(\"goBackFromForget\", {});\n    },\n    //\n    forgetPasswordNotBindBtn: function forgetPasswordNotBindBtn() {\n      win.PostMessageToNativeSDK(\"forgetPasswordNotBindBtn\", {\n        game: $('#forget-password-notBind-game').val(),\n        account: $('#forget-password-notBind-account').val(),\n        role: $('#forget-password-notBind-role').val(),\n        name: $('#forget-password-notBind-district').html(),\n        service_id: $('#forget-password-notBind-district').attr(\"data-serviceID\"),\n        ip: $('#forget-password-notBind-ip').val(),\n        phone: $('#forget-password-notBind-phone').val(),\n        psd: $('#forget-password-notBind-psd').val()\n      });\n    },\n    //进入账号申诉页面\n    accountComplaint: function accountComplaint() {\n      indexMethods.display('forget-password-notBind');\n      win.PostMessageToNativeSDK(\"accountComplaint\", {});\n    }\n  };\n\n  win.display = function (name) {\n    indexMethods.display(name);\n  };\n\n  win.showcloseBtn = function (show) {\n    if (show) {\n      $('.close').show();\n    } else {\n      $(\".close\").hide();\n    }\n  };\n\n  win.showBindBtn = function (show) {\n    if (show) {\n      $('.showBindBtn').show();\n    } else {\n      $(\".showBindBtn\").hide();\n    }\n  }; //选择游戏\n\n\n  win.chooseGame = function (name) {\n    $('#forget-password-notBind-game').val(name);\n  }; //返回手机号\n\n\n  win.forgetPasswordNumber = function (number) {\n    $(\"#forget-password-number\").html(number);\n  };\n  /*页面加载获取账号信息*/\n\n\n  win.accoutGroup = function (str) {\n    //  var obj= [\n    //      {\"uuid\":\"1111\",\"usName\":\"55555\",\"time\":'1209-555'},\n    //      {\"uuid\":\"1111\",\"usName\":\"55555\",\"time\":'1209-555'},\n    //      {\"uuid\":\"1111\",\"usName\":\"55555\",\"time\":'1209-555'},\n    //      {\"uuid\":\"1111\",\"usName\":\"55555\",\"time\":'1209-555'},\n    //      {\"uuid\":\"1111\",\"usName\":\"55555\",\"time\":'1209-555'}]\n    $('#accoutGroup1 li,#accoutGroup2 li').remove();\n    var obj = JSON.parse(str);\n    var h = \"\";\n\n    for (var i = 0; i < obj.length; i++) {\n      if (i === 0) {\n        h += '  <li><img class=\"avatar\" src=\"static/images/avatar.png\"><div class=\"account\"><span  class=\"accoutGroupInput\" data-uuid=\"' + obj[i].uuid + '\">' + obj[i].usName + '</span><p>上次登录&nbsp;&nbsp;<code class=\"time\">' + obj[i].time + '</code></p></div> <img class=\"down downBtn\" src=\"static/images/accoutGroupDown.png\" ></li>';\n      } else {\n        h += ' <li><img class=\"avatar\" src=\"static/images/avatar.png\"><div class=\"account\"> <span class=\"accoutGroupInput\" data-uuid=\"' + obj[i].uuid + '\">' + obj[i].usName + '</span><p>上次登录&nbsp;&nbsp;<code class=\"time\">' + obj[i].time + '</code></p> </div>  <img class=\"down accountClose\" src=\"static/images/close.png\" > </li>';\n      }\n    }\n\n    $(\"#accoutGroup1\").append(h);\n    $(\"#accoutGroup2\").append(h);\n    /*切换账号下拉*/\n\n    var flag = true;\n    $(\".downBtn\").click(function () {\n      if (flag) {\n        $(\"#accoutGroup1\").hide();\n        $(\"#accoutGroup2\").show();\n      } else {\n        $(\"#accoutGroup1\").show();\n        $(\"#accoutGroup2\").hide();\n      }\n\n      flag = !flag;\n    });\n    /*具体账号*/\n\n    $(\"#accoutGroup2 li .account\").click(function () {\n      $(\"#accoutGroup1\").show();\n      $(\"#accoutGroup2\").hide();\n      var $span = $(this).children('span');\n      var $account = $(\"#accoutGroup1 li .account\");\n      $account.children(\"span\").html($span.html()).attr(\"data-uuid\", $span.attr(\"data-uuid\"));\n      $account.children().find(\"code\").html($(this).children().find(\"code\").html());\n    }); //点击关闭\n\n    $(\".accountClose\").click(function () {\n      $(this).parent().remove();\n      console.log('删除账号');\n      var $ac = $(this).prev().children(\"span\");\n      window.PostMessageToNativeSDK(\"deletAccount\", {\n        uuid: $ac.attr(\"data-uuid\"),\n        accountName: $ac.html()\n      });\n    });\n    $(\"#enterGame\").click(function () {\n      console.log($(\"#accoutGroup1 li .account\").children(\"span\").attr(\"data-uuid\") + \"uuid\");\n      console.log($(\"#accoutGroup1 li .account\").children(\"span\").html() + \"account\");\n      var $acc = $(\"#accoutGroup1 li .account\");\n      win.PostMessageToNativeSDK(\"enterGame\", {\n        uuid: $acc.children(\"span\").attr(\"data-uuid\"),\n        accountName: $acc.children(\"span\").html()\n      });\n    });\n  };\n  /*页面加载游戏角色区服信息*/\n\n\n  win.districtGroup = function (obj) {\n    //  var obj= [\n    //      {\"name\":\"角色1\",\"service_id\":'12088'},\n    //      {\"name\":\"角色14\",\"service_id\":'125855'},\n    //      {\"name\":\"角色154\",\"service_id\":'1565'},\n    //      {\"name\":\"角色12\",\"service_id\":'12025'},\n    //      {\"name\":\"角色13\",\"service_id\":'1001'}]\n    $('#forget-password-notBind-accoutGroup li').remove(); // var obj = JSON.parse(str);\n\n    var h = \"\";\n\n    for (var i = 0; i < obj.length; i++) {\n      h += '<li  class=\"forget-password-notBind-district\" data-serviceID=\"' + obj[i].service_id + '\">' + obj[i].name + '</li>';\n    }\n\n    $(\"#forget-password-notBind-accoutGroup\").append(h);\n    /*具体账号*/\n\n    $(\"#forget-password-notBind-accoutGroup .forget-password-notBind-district\").click(function () {\n      $('#forget-password-notBind-accoutGroup').hide();\n      $('#forget-password-notBind-district').html($(this).html()).attr('data-serviceID', $(this).attr(\"data-serviceID\"));\n    });\n    $('.notBindDown').bind('click', function () {\n      $('#forget-password-notBind-accoutGroup').slideToggle(300);\n    });\n  };\n})(window);\n\n$(function () {\n  //忘记密码确定按钮\n  $(\"#forget-password-btn\").click(function () {\n    indexMethods.forgetPasswordBtn();\n  });\n  $(\".close\").click(function () {\n    indexMethods.close();\n  });\n  indexMethods.displayCheckbox(); // indexMethods.changeCode();\n\n  $('input').blur(function () {\n    $('html,body').stop().animate({\n      scrollTop: 0\n    });\n  });\n  var oHeight = $(document).height(); //浏览器当前的高度\n\n  $(window).resize(function () {\n    if ($(document).height() < oHeight) {\n      $(\".container\").css(\"position\", \"fixed\");\n    } else {\n      $(\".container\").css(\"position\", \"absolute\");\n    }\n  });\n});\n\n//# sourceURL=webpack:///./static/js/index.js?");

/***/ })

/******/ });