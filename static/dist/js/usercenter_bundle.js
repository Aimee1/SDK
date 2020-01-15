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
/******/ 	return __webpack_require__(__webpack_require__.s = "./static/js/usercenter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./static/js/usercenter.js":
/*!*********************************!*\
  !*** ./static/js/usercenter.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n(function (win) {\n  win.userStatics = {\n    msgId: '-1'\n  };\n  win.userMethods = {\n    /*****/\n    deleteBugWarnRequest: function deleteBugWarnRequest() {\n      var _statics$urlCode = statics.urlCode,\n          uuid = _statics$urlCode.uuid,\n          game_id = _statics$urlCode.game_id;\n      $.post(statics.base + \"user_messages/del_bug_warn\", {\n        uuid: uuid,\n        game_id: game_id\n      }, function (result) {\n        console.log(result);\n        var res = $.parseJSON(result);\n        console.log(res);\n\n        if (res.error_code == 0) {\n          $(\"#new-mgs\").hide();\n        }\n      }).fail(function (result) {// alert(result.error_reason);\n      });\n    },\n    // 个人中心消息红点\n    rash: function rash() {\n      // 我的消息和客服反馈红点\n      var _statics$getRequest = statics.getRequest(),\n          uuid = _statics$getRequest.uuid,\n          game_id = _statics$getRequest.game_id;\n\n      var message_data = {\n        //  game_id=FF000001CL01&uuid=ff_zceviN8Jx24F9L0UIk\n        game_id: game_id,\n        uuid: uuid\n      };\n      $.post(statics.base + \"user_messages/red_point\", message_data, function (result) {\n        console.log(result);\n        var res = $.parseJSON(result);\n        console.log(res);\n\n        if (res.error_code == 0) {\n          console.log(res.error_code);\n          console.log(\"111\" + res.data.user_message);\n\n          if (res.data.user_message == true) {\n            console.log(res.data.user_message);\n            $(\".message span\").addClass(\"active\");\n            $(\".customer_service span\").addClass(\"active\");\n          }\n\n          if (res.data.bug_list == true) {\n            $(\"#new-mgs\").show();\n          }\n        }\n      });\n    },\n    resizeElements: function resizeElements() {\n      var _statics$urlCode2 = statics.urlCode,\n          uname = _statics$urlCode2.uname,\n          change_phone_show = _statics$urlCode2.change_phone_show;\n      $(\".personal span\").text(uname);\n\n      if (change_phone_show == \"false\") {\n        $(\".lister ul li:first\").hide();\n      }\n    },\n    // 消息列表\n    post_list: function post_list() {\n      $.post(statics.base + \"user_messages/data\", {\n        uuid: statics.urlCode.uuid\n      }, function (result) {\n        var res = JSON.parse(result);\n        var html = \"\";\n        $(\".lister ul\").html(\"\");\n        $.each(res.messages, function (i, val) {\n          if (val.is_read) {\n            html += '<li><a href=\"javascript:;\" onclick=\"userMethods.goToDetail(' + val.id + ')\">' + val.title + '</a></li>';\n          } else {\n            html += '<li><a href=\"javascript:;\"  onclick=\"userMethods.goToDetail(' + val.id + ')\" class=\"active\">' + val.title + '</a></li>';\n          }\n\n          $(\".lister ul\").html(html);\n        });\n      }).fail(function (result) {});\n    },\n    // 删除个人消息\n    post_delete: function post_delete() {\n      $.post(statics.base + \"user_messages/del\", {\n        id: userStatics.msgId,\n        uuid: statics.urlCode.uuid\n      }, function (result) {\n        console.log(result);\n        var res = $.parseJSON(result);\n        console.log(res);\n\n        if (res.error_code == 0) {\n          methods.display('lister_message');\n          userMethods.post_list();\n        }\n      });\n    },\n    // 消息详情\n    goToDetail: function goToDetail(id) {\n      $('.user-message').show();\n      $('.lister_message').hide();\n      userStatics.msgId = id;\n      $('.user-message .center').html('');\n      var html = '';\n      $.post(statics.base + \"user_messages/detail\", {\n        uuid: statics.urlCode.uuid,\n        user_message_id: id\n      }, function (result) {\n        console.log(result);\n        var res = $.parseJSON(result);\n\n        if (res.error_code == 0) {\n          html += \"<h2>\".concat(res.detail.title, \"</h2>\\n                    <p>\").concat(res.detail.content, \"</p>\\n                    <a href=\\\"javascript:;\\\">\\u5220\\u9664\\u90AE\\u4EF6</a>\");\n          $('.user-message .center').append(html);\n        }\n      });\n    },\n    //绑定手机\n    bind: function bind() {\n      console.log('personal center bind btn');\n      win.PostMessageToNativeSDK(\"personalCenterBindBtn\", {});\n    },\n    //点击下一步\n    clickNext: function clickNext(phoneNumber) {\n      win.statics.data.phoneNumber = phoneNumber; //把下步里面的电话号码修改\n\n      $(\"#verification-code-number\").html(phoneNumber);\n      console.log(phoneNumber); //调接口需要开始倒计时\n\n      win.PostMessageToNativeSDK('sendBindCode', {\n        //调接口需要开始倒计时\n        phone_number: win.statics.data.phoneNumber\n      });\n      $(\"#authCode\").val(\"\");\n      $(\".phone-code li i\").html(\"\"); // win.indexMethods.display(\"verification-code\");\n    },\n    //绑定手机返回按钮\n    phoneBindback: function phoneBindback() {\n      console.log('返回提示绑定页面');\n      win.PostMessageToNativeSDK(\"personalCenterBindBack\", {});\n    },\n    //短信验证码验证\n    phoneLoginBind: function phoneLoginBind(authCode) {\n      console.log(authCode + win.statics.data.phoneNumber);\n      win.PostMessageToNativeSDK('phone_login_bind', {\n        phone: win.statics.data.phoneNumber,\n        authCode: authCode\n      });\n    },\n    //验证码界面返回\n    codeBack: function codeBack() {\n      console.log('返回绑定手机');\n      win.PostMessageToNativeSDK('backbindPhone', {});\n    },\n    //重新发送短信验证码\n    resend: function resend() {\n      win.PostMessageToNativeSDK('reSendBindCode', {\n        //调接口需要开始倒计时\n        phone_number: win.statics.data.phoneNumber\n      });\n    }\n  }; //个人中心客户端传递url参数    \n\n  win.setupRequestParams = function (data) {\n    var res = JSON.parse(data);\n    statics.urlCode = Object.assign(res);\n    userMethods.resizeElements();\n    userMethods.deleteBugWarnRequest(); // 我的消息\n\n    userMethods.post_list(); //获取验证码\n\n    $(\".change span\").html(statics.urlCode.iphone);\n  }; // 公共头部\n\n\n  win.disdplayHeader = function (title, help) {\n    $(\"div\").hide();\n    $(\".customer\").show();\n    $(\"#title span\").html(title);\n    var height = $('.header').outerHeight(true);\n    PostMessageToNativeSDK('headerHeight', {\n      headerHeight: height\n    });\n    var html = '';\n    var headerClass = help == \"show\" ? \"header help\" : \"header\";\n    html += '<div class=\"' + headerClass + '\">';\n    html += '<a href=\\\"javascript:;\\\" id=\\\"title\\\"><img src=\\\"static/images/l-back.png\\\" alt=\\\"\\\"> <span>' + title + '</span></a>';\n\n    if (help == \"show\") {\n      html += '<span id=\\\"help\\\">使用帮助</span>';\n    }\n\n    html += '</div>';\n    $(\".customer\").html('');\n    $(\".customer\").append(html);\n  };\n\n  win.isIPhoneX = function (Callable, number) {\n    if (Callable == \"ture\") {\n      $(\".header\").css({\n        \"padding-left\": number,\n        \"padding-right\": number\n      });\n      $(\".header img\").css(\"margin\", \".2rem .2rem .1rem 0rem\");\n      $(\".l-iphonex\").addClass(\"style-iphonex\");\n      $(\".style-iphonex\").css({\n        \"padding-left\": number,\n        \"padding-right\": number\n      });\n      $(\".style-iphonex div\").addClass(\"iphonex\");\n      $(\".container .header\").css({\n        \"padding-left\": \"0\",\n        \"padding-right\": \"0\"\n      });\n    }\n\n    var height = $('.header').outerHeight(true);\n    PostMessageToNativeSDK('headerHeight', {\n      headerHeight: height\n    });\n  }; // 清除数据\n\n\n  win.isClear = function () {\n    clearInterval(statics.data.time);\n    $(\".getCodes\").text(\"获取验证码\").removeAttr(\"disabled\");\n    $(\"input\").val(\"\");\n  };\n})(window);\n\n$(function () {\n  //个人中心\n  $(\"#switch\").click(function () {\n    PostMessageToNativeSDK('switchAccount');\n  }); // 返回游戏\n\n  $(\".backGame\").click(function () {\n    PostMessageToNativeSDK('backGame');\n  }); // 返回游戏iphoneX\n\n  $(\".backGames\").click(function () {\n    PostMessageToNativeSDK('backGames');\n  }); // 返回个人中心\n\n  $(\".backs\").click(function () {\n    methods.display('user-box');\n  }); // 确认解绑\n\n  $(\".input-ok\").click(function () {\n    var iphone = $(\"#iphone\").val();\n    var old = $(\"#old-pw\").val();\n    var new_pw = $(\"#new-pw\").val();\n    var new_pw_ok = $(\"#new-pw-ok\").val();\n    PostMessageToNativeSDK('changePassword', {\n      iphone: iphone,\n      old: old,\n      new_pw: new_pw,\n      new_pw_ok: new_pw_ok\n    });\n  });\n  $('.l_input input').blur(function () {\n    $('html,body').stop().animate({\n      scrollTop: 0\n    });\n  }); // 点击修改密码\n\n  $(\".change_password\").click(function () {\n    PostMessageToNativeSDK(\"resertPassword\");\n  }); // 点击更换手机绑定\n\n  $(\".iphone-d\").click(function () {\n    PostMessageToNativeSDK(\"resetPhone\");\n  }); // 解绑验证码\n\n  $(\"#oldCode\").click(function () {\n    PostMessageToNativeSDK(\"sendUnbindCode\");\n  }); //更换绑定修改\n\n  $(\".next\").click(function () {\n    var oldCode = $(\"#old_code\").val();\n    PostMessageToNativeSDK(\"unbindPhone\", {\n      oldCode: oldCode\n    });\n  }); // 更换绑定获取手机号\n\n  $(\"#newCode\").click(function () {\n    var iphone = $(\"#iphone\").val();\n    PostMessageToNativeSDK(\"sendBindNewPhoneCode\", {\n      iphone: iphone //更换的手机号\n\n    });\n  }); // 更换绑定确认按钮传递验证码y\n\n  $(\".news-replace\").click(function () {\n    var iphone = $(\"#iphone\").val();\n    var new_code = $(\"#new_code\").val();\n    PostMessageToNativeSDK(\"bindNewPhone\", {\n      new_code: new_code,\n      //更换的手机号验证码\n      iphone: iphone //更换的手机号\n\n    });\n  }); // 修改密码返回键\n\n  $(\".l_back\").click(function () {\n    methods.display('user-box');\n  }); // 修改密码获取验证码\n\n  $(\"#getCodes\").click(function () {\n    var pw_iphone = $(\"#forget-password-number\").val();\n    PostMessageToNativeSDK(\"snedChangepsCode\", {\n      pw_iphone: pw_iphone\n    });\n  }); // 确认修改\n\n  $(\"#forget-password-btn\").click(function () {\n    var pw_iphone = $(\"#forget-password-number\").val();\n    var forget_password_code = $(\"#forget-password-code\").val();\n    var forget_password_newPsd = $(\"#forget-password-newPsd\").val();\n    var forget_password_psdConfirm = $(\"#forget-password-psdConfirm\").val();\n    PostMessageToNativeSDK(\"okChangePassword\", {\n      pw_iphone: pw_iphone,\n      forget_password_code: forget_password_code,\n      forget_password_newPsd: forget_password_newPsd,\n      forget_password_psdConfirm: forget_password_psdConfirm\n    });\n  }); // 是否删除邮件\n\n  $(document).on('click', '.center a', function () {\n    $(\".mask\").show();\n  }); // 再次确认\n\n  $(\"#l-backs\").click(function () {\n    $(\".mask\").hide();\n  }); // 继续\n\n  $(\"#continues\").click(function () {\n    userMethods.post_delete();\n    $(\".mask\").hide();\n  }); //客服反馈\n\n  $(\".customer_service\").click(function () {\n    PostMessageToNativeSDK(\"customerFeedback\");\n  });\n  $(document).on('click', '.open-page', function () {\n    var urlClass = $(this).attr('data-class');\n\n    if (urlClass) {\n      methods.display(urlClass);\n    }\n  });\n  $('.l_input input').blur(function () {\n    $('html,body').stop().animate({\n      scrollTop: 0\n    });\n  }); // 支付返回\n\n  $(\"#go-back\").click(function () {\n    PostMessageToNativeSDK(\"goBack\");\n  }); // 继续\n\n  $(\"#continue\").click(function () {\n    $(\".mask\").hide();\n  }); // 绑定手机返回\n\n  $(\".l-bindingIphone\").click(function () {\n    PostMessageToNativeSDK(\"l-bindingIphone\");\n  }); // 顶部头部修改title\n\n  $(\"#title\").click(function () {\n    PostMessageToNativeSDK(\"backCenter\");\n  }); //返回清除l-\n\n  $(\"#l-back\").click(function () {\n    isClear();\n  }); // 消息列表返回\n\n  $(\".back_user\").click(function () {\n    methods.display('lister_message');\n    userMethods.post_list();\n  });\n});\n\n//# sourceURL=webpack:///./static/js/usercenter.js?");

/***/ })

/******/ });