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


// 领取
/*var modalAlert = $(modalTemplate).css('display', 'block');
modalAlert.find('.text')
  .append('没有奖品可领取！');
modalAlert.find('.btn-panel')
  .append('<a href="index.html" class="btn btn-default btn-beta active btn-again">去抽奖</a>');
modalAlert.appendTo('body');
modalAlert.find('.modal-close').click(function(){
  modalAlert.remove();
});
modalAlert.find('.btn-again').click(function(){
  modalAlert.remove();
});*/


$('.btn-get').click(function(){
  // 领取
  var modalAlert = $(modalTemplate).css('display', 'block');
  modalAlert.find('.text')
    .append('成功领取！');
  modalAlert.find('.btn-panel')
    .append('<a href="index.html" class="btn btn-default btn-beta active btn-again">去抽奖</a>')
    .append('<button type="button" class="btn btn-default btn-beta">去使用</button>');
  modalAlert.appendTo('body');
  modalAlert.find('.modal-close').click(function(){
    modalAlert.remove();
  });
  modalAlert.find('.btn-again').click(function(){
    modalAlert.remove();
  });
});

$('.btn-share').click(function(){
  $('.modal-share').css('display', 'block');
});

$('.modal-share').click(function(){
  $('.modal-share').css('display', 'none');
});

/*document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);*/
