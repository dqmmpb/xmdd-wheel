'use strict';

$(function() {
  FastClick.attach(document.body);
});

var modalTemplate = '' +
  '<section class="modal modal-alert">' +
  '<div class="overlay"></div>' +
  '<div class="modal-table">' +
  '<div class="modal-table-cell">' +
  '<div class="modal-panel">' +
  '<div class="modal-header">' +
  '<div class="modal-close"></div>' +
  '</div>' +
  '<div class="modal-content">' +
  '<div class="modal-text">' +
  '<div class="alert-text">' +
  '<div class="text"></div>' +
  '</div>' +
  '<div class="btn-panel">' +
  '</div>' +
  '</div>' +
  '</div>' +
  '</div>' +
  '</div>' +
  '</div>' +
  '</section>';

var dp = {
  // 背景
  bg: { x: 0, y: 0, w: 640, h: 552 },
  // 转盘
  wheel: {
    x: 117, y: 47, w: 406, h: 406,
    part: 12,
    deg: 360,
    loop: 12,
    start: 0,
    end: 9
  },
  // 中心
  center: { x: 233, y: 163, w: 174, h: 174 },
  // 小马
  xiaoma2: { x: 70, y: 402, w: 87, h: 140 },
  // 礼物
  gifts: { x: 462, y: 422, w: 175, h: 129 }

};

var end = 9;
var score = 88888;
var runing = false;

// 绘制SVG
var draw = new SVG('index').size(dp.bg.w, dp.bg.h).addClass('svg');
draw.viewbox({ x: dp.bg.x, y: dp.bg.y, width: dp.bg.w, height: dp.bg.h });
// 设置背景图 var bg =
draw.image('../images/index/bg.png', dp.bg.w, dp.bg.h);
// 设置幸运大转盘 var wheel =
var wheel = draw.image('../images/index/wheel.png', dp.wheel.w, dp.wheel.h).move(dp.wheel.x, dp.wheel.y);
// 设置幸运大转盘中心 var center =
var center = draw.image('../images/index/wheel-center.png', dp.center.w, dp.center.h).move(dp.center.x, dp.center.y);
var overlay = draw.image('../images/index/wheel-center-overlay.png', dp.center.w, dp.center.h).move(dp.center.x, dp.center.y).hide();
// 设置左侧小马人物 var xiaoma2 =
draw.image('../images/index/xiaoma2.png', dp.xiaoma2.w, dp.xiaoma2.h).move(dp.xiaoma2.x, dp.xiaoma2.y);

// 设置右侧礼物 var gifts =
draw.image('../images/index/gifts.png', dp.gifts.w, dp.gifts.h).move(dp.gifts.x, dp.gifts.y);

// 转盘旋转效果
var wheelAnimate = function(pos) {
  var from = dp.wheel.start;
  // 根据后台抽奖结果，渐变修正转盘转动位置，防止盘面抖动
  var to = dp.wheel.deg * dp.wheel.loop + (dp.wheel.deg / dp.wheel.part / 2) * (2 * (dp.wheel.end + (end - dp.wheel.end) * pos) + 1);
  wheel.rotate(from + (to - from) * pos, dp.wheel.x + dp.wheel.w / 2, dp.wheel.y + dp.wheel.h / 2);/*.move(dp.wheel.x, dp.wheel.y);*/
};

// 抽奖事件
var click = function(event) {
  event.preventDefault();
  if(!runing) {
    if(score < 800) {
      // 显示积分不足，赚积分
      var modalAlert = $(modalTemplate).css('display', 'block');
      modalAlert.find('.text')
        .append('积分不够了<br>先去赚积分吧！');
      modalAlert.find('.btn-panel')
        .append('<button type="button" class="btn btn-default btn-beta active btn-again">猜灯谜</button>');
      modalAlert.appendTo('body');
      modalAlert.find('.modal-close').click(function(){
        modalAlert.remove();
        wheel.rotate(0);
      });
      modalAlert.find('.btn-again').click(function(){
        modalAlert.remove();
        wheel.rotate(0);
      });

    } else {
      score -= 800;
      $('.score').text(score);

      runing = !runing;
      overlay.show();

      // 模拟ajax请求抽奖
      setTimeout(function(){
        end = 0;
      }, 3000);

      wheel.animate(5000, SVG.easing.circOut).during(wheelAnimate).after(function(){
        runing = !runing;
        overlay.hide();
        var res = Math.floor(Math.random() * 2);

        if(res === 0) {
          // 中奖
          modalAlert = $(modalTemplate).css('display', 'block');
          modalAlert.find('.text')
            .append('恭喜你获得<br>10元精洗代金券');
          modalAlert.find('.btn-panel')
            .append('<button type="button" class="btn btn-default btn-beta active btn-again">再抽一次</button>')
            .append('<a href="prize.html" class="btn btn-default btn-beta">查看奖品</a>');
          modalAlert.appendTo('body');
          modalAlert.find('.modal-close').click(function(){
            modalAlert.remove();
            wheel.rotate(0);
          });
          modalAlert.find('.btn-again').click(function(){
            modalAlert.remove();
            wheel.rotate(0);
          });

        } else if(res === 1) {
          // 未中奖
          modalAlert = $(modalTemplate).css('display', 'block');
          modalAlert.find('.text')
            .append('咻的一声<br>大奖擦肩而过，囧rz');
          modalAlert.find('.btn-panel')
            .append('<button type="button" class="btn btn-default btn-beta active btn-again">再抽一次</button>')
            .append('<button type="button" class="btn btn-default btn-beta">猜灯谜</button>');
          modalAlert.appendTo('body');
          modalAlert.find('.modal-close').click(function(){
            modalAlert.remove();
            wheel.rotate(0);
          });
          modalAlert.find('.btn-again').click(function(){
            modalAlert.remove();
            wheel.rotate(0);
          });
        }
      });

    }

  }

};

center.on('click', click);

$('.btn-rule').click(function(){
  $('.modal-rule').css('display', 'block');
});

$('.modal-rule .modal-close').click(function(){
  $('.modal-rule').css('display', 'none');
});

// 初始化积分
$('.score').text(score);

/*document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);*/
