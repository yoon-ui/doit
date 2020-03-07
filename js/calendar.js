$(function(){
  
      // 리사이즈시 section의 높이 구하기 
      $(window).resize(function(){
            var windowH=$(this).height();
            var headerH=$('header').height();
            $('section').innerHeight(windowH-headerH-40);
      }).resize();
   

         // popup menu
      $('.calendar .sp-common-menu').click(function(){
            $('.menu').show();
            $('body').append('<div class="popup-bg"></div>');
            $('.popup-bg').click(function(){
            $('.menu').hide();
            $(this).remove();
            })
      
      });

      
      $('.dday-box').click(function(){
            $(this).find('ul').css('display','flex')
      })


      $('.calendar .sp-common-option').click(function(){
            $('.option').show()
            $('body').append('<div class="popup-bg"></div>');
            $('.popup-bg').click(function(){
            $('.option').hide();
            $(this).remove();
            })

  });
   
         //터치 이벤트 
   //       function touchEvent() {
   //       $('.todolist-container #todolist li .todolist-content').touch({
   //        trackDocument:false,
   //        trackDocumentNormlize:false,
   //        preventDefault:{
   //           swipe:false,
   //           tap:false
   //        }
   //     }).on('swipeRight',function () {
   //        console.log('수정하기');  
   //        $('#todolist li').removeClass('left right');   
   //        $(this).parent().addClass('right');       
   //     }).on('swipeLeft',function () {
   //        console.log('삭제하기');   
   //        $('#todolist li').removeClass('left right');   
   //        $(this).parent().addClass('left');   
   //     }).on('tap',function () {
   //        console.log('취소하기'); 
   //        $('#todolist li').removeClass('left right');       
   //     })
   //  };
   
   
         // cal-memo
   
         // $('.calendar>.cal-memo').click(function() { 
         //    $(this).css({ 'z-index': '100'})
         //    $(this).addClass('cal-memo-full')
         //    // $(this).toggleClass('cal-memo cal-memo-full');
         //    // $(this).append('<textarea name="" id="" cols="30" rows="10" placeholder="메모를 작성해보세요"></textarea>');
         // //    $('.popup-bg-w').click(function(){
         // //       $('.memo').hide();
         // //       $(this).remove();
         // //   })
         // });
         $('.calendar .cal-memo-text').click(function () { 
            $(this).parents('.cal-api').prev('.cal-memo').toggleClass('show')
            
         });
   


      // 달력 ==================================================================================================================
      var todoDate;
      $("#calendar")
      .datepicker({   
          dateFormat: "yy/mm/dd",
          showOtherMonths: true,
          selectOtherMonths: false,
          dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          onSelect: function(dateText) { 
              todoDate=dateText;
          }
      })
      .swipe({
          swipeRight:function(){
              console.log('오른쪽');        
              $(this).find("[data-handler='prev']").click();
          },
          swipeLeft:function(){
              console.log('왼쪽');
              $(this).find("[data-handler='next']").click();
          }
      })
   
    });