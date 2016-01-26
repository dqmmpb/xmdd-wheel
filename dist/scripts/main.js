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
  xiaoma2: { x: 96, y: 368, w: 87, h: 140 },
  // 礼物
  gifts: { x: 430, y: 397, w: 175, h: 129 }

};

var end = 9;
var score = 88888;
var runing = false;

var wheel = $('#wheel');
var overlay = $('#overlay').hide();
var center = $('#wheel-center');

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
        wheel.css({
          '-webkit-transform': 'rotate(' + 0 + 'deg)',
          'transform': 'rotate(' + 0 + 'deg)'
        });
      });
      modalAlert.find('.btn-again').click(function(){
        modalAlert.remove();
        wheel.css({
          '-webkit-transform': 'rotate(' + 0 + 'deg)',
          'transform': 'rotate(' + 0 + 'deg)'
        });
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


      wheel.animate({
          '-webkit-transform': 1,
          'transform': 1
        },
        {
          duration: 5000,
          step: function(pos){
            var to = 0 + (dp.wheel.deg * dp.wheel.loop - 0) * pos + (dp.wheel.deg / dp.wheel.part / 2) * (2 * (dp.wheel.end + (end - dp.wheel.end) * pos) + 1);
            wheel.css({
              '-webkit-transform': 'rotate(' + to + 'deg)',
              'transform': 'rotate(' + to + 'deg)'
            });
          },
          easing: 'easeOutCirc',
          complete: function() {

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
                wheel.css({
                  '-webkit-transform': 'rotate(' + 0 + 'deg)',
                  'transform': 'rotate(' + 0 + 'deg)'
                });
              });
              modalAlert.find('.btn-again').click(function(){
                modalAlert.remove();
                wheel.css({
                  '-webkit-transform': 'rotate(' + 0 + 'deg)',
                  'transform': 'rotate(' + 0 + 'deg)'
                });
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
                wheel.css({
                  '-webkit-transform': 'rotate(' + 0 + 'deg)',
                  'transform': 'rotate(' + 0 + 'deg)'
                });
              });
              modalAlert.find('.btn-again').click(function(){
                modalAlert.remove();
                wheel.css({
                  '-webkit-transform': 'rotate(' + 0 + 'deg)',
                  'transform': 'rotate(' + 0 + 'deg)'
                });
              });
            }
          }
      });
    }
  }

};

center.click(click);

$('.btn-rule').click(function(){
  $('.modal-rule').css('display', 'block');
});

$('.modal-rule .modal-close').click(function(){
  $('.modal-rule').css('display', 'none');
});

// 初始化积分
$('.score').text(score);

/*document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);*/


console.log('Hello world');
