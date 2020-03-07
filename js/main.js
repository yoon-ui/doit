$(function(){
   // 기본 dday목록 가져오기 
   var ddays=getDdays();

//    ddays.forEach(obj => {    
//       if(obj.ddayDefault === true){
//        console.log(obj.ddayTitle);
       
       
//       }
//    });

    function ddayList(ddays){
        var ddays = getDdays()
        if(ddays === null){
            ddays=[];
        }
        
        if(ddays.length!=0){
            ddays.forEach(obj => {
                $('.todo-dday').append(`
                <label>
                    <input type="radio" name="dday-item" value="${obj.ddayId}">
                    <span class="color ${obj.ddayColor}">${obj.ddayColor}</span>
                    <span class="ddayid" data-ddayId="${obj.ddayId}">${obj.ddayTitle}</span>
                </label>
                `)                
            });
        }
    }
    ddayList()
      
// header===================================================================================================
    // -------------------------menu팝업
    $('.dday-progressbar').click(function(){
        var ddayId=$('#cont').data('ddayId');        
        var ddays=getDdays();
        var dday={};
        if(ddays!=null){
            ddays.forEach((obj,i) => {
                if(obj.ddayId==ddayId){
                    dday=obj;
                }
            });
        }
        
        // $('.menu .dday-title').text(dday.ddayTitle);
        $('.menu .dday-progressbar span').animate({
            width:dday.percent+'%'
        })        

        $(this).parents('body').find('.menu').show();
        $('body').append('<div class="popup-bg"></div>');
        $('.popup-bg').click(function(){
            $('.menu').hide();
            $(this).remove();
        })    
    });

     // dday 팝업에 뿌리기
     function dddayList(){
        var ddays = getDdays()
        if(ddays === null){
            ddays=[];
        }
        if(ddays.length!=0){
            $('.menu .container').empty();
            ddays.forEach(obj => {
                $('.menu .container').append(`
                <div class="dday-box">
                        <span class="dday-id">${obj.ddayId}</span>
                        <span class="dday-title">${obj.ddayTitle}</span>
                        <div class="dday-progressbar">
                        <span class="back-color ${obj.ddayColor}"></span>
                    </div>
                    <ul>
                        <li><button class="btn-dday-delete sp sp-common-menu-popup-delete"></button></li>
                        <li><button class="btn-dday-edit sp sp-common-menu-popup-re"></button></li>
                    </ul>
                </div>
                    `)                
                    // console.log(obj.ddayId);
            });
            touchEvent();
        
        }
        
    }
    dddayList()

    // ------------------------menu팝업에서 삭제/수정 팝업생성
    $('.dday-box').click(function(){
        $(this).find('ul').css('display','flex')
    })
    //-------------------------------------수정
    $('.btn-dday-edit').click(function (e) { 
        // var ddayId=$('#cont').data('ddayId');
        var ddayId=$(this).parents('.dday-box').find('.dday-id').text();
        var ddays=getDdays();
        if(ddays!=null){
            ddays.forEach((obj,i) => {
                if(obj.ddayId==ddayId){
                    ddayIndex=i;
                }
            });
        }
        location.href="todo.html?ddayId="+ddayId;
    });
    //-------------------------------------삭제
    $('.btn-dday-delete').click(function (e) { 
        var dayid=$(this).parents('.dday-box').find('.dday-id').text();
        // console.log(dayid);
        
        //저장소에서 메모를 가져온다.
        var ddays=getDdays();
        ddays.forEach((obj,i) => {
            if(obj.ddayId==dayid){
                console.log(obj);
                obj.splice(i,1);
                }
            });
        })
        //달라진 메모배열을 저장소에 반영 
        setDdays(ddays) 
        todoList(ddays)
     
        // $('#todolist').on('click', '.btn-delete', function () {
        //     console.log('단일삭제하기');
        //     // 고유아이디값 구하기(date)
        //     var id=$(this).parent().find('.todoTitle').text();
        //     console.log(id);
            
        //     //저장소에서 메모를 가져온다.
        //     var ddays=getDdays();
        //     ddays.forEach(obj => {
        //         obj.todo.forEach((item, i) => {
        //             if(item.todoTitle == id){
        //                 obj.todo.splice(i,1);
        //             }
        //         })
        //     })
        //     //달라진 메모배열을 저장소에 반영 
        //     setDdays(ddays) 
        //     todoList(ddays)
        // });
       
    


    // -------------------------option팝업
    $('header .sp-common-option').click(function(){
        $('.option').show()
        $('body').append('<div class="popup-bg"></div>');
        $('.popup-bg').click(function(){
            $('.option').hide();
            $(this).remove();
        })

    });


    //todolist-popup ===============================================================================
    $('.todolist-popup ul button').click(function () { 
        $('.todolist-popup ul li').removeClass('active');
        $('.todolist-popup-select-popup>ul>li').hide()
        $(this).parent().addClass('active');
        var index = $(this).parent().index();
        // console.log(index);
        $('.todolist-popup-select-popup>ul>li').eq(index).show()
    });    

    // --------------------------------------------------------달력
    var todoDate;
    $("#calendar")
    .datepicker({   
        dateFormat: "yy/mm/dd",
        showOtherMonths: true,
        selectOtherMonths: false,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        minDate: 0,
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

    //----------------------------------------------------------달력 done추가
    $('.popup .cal-done').click(function (e) { 
       if(todoDate==undefined){
           $(this).attr('disabled', false);
       // console.log(todoDate);   
       }else{
           e.preventDefault();
           $('.date').addClass('done');
           $('.popup').hide();
           $('.popup-bg').remove();
           //  console.log(todoDate);  
       } 
    });
 
    // //------------------------------------------------------------반복팝업띄우기
    // $('[name=todoRepeat]').change(function () {
    //     //체크된 value획득 
    //     var checkVal= $('[name=todoRepeat]:checked').val();
    //     // console.log(checkVal);
   
    //     //초기화
    //     $('.check-box input').prop('checked', false)
    //         if('repeat1' == checkVal){
    //             $('.check-box input').prop('disabled', true)
    //         }else{
    //             $('.check-box input').prop('disabled', false)
    //         }
    // });  
    // //-------------------------------------------------------------반복 선택
    // $('.todo-repeat').click(function(){
    //    var checkVal= $('[name="todoRepeat"]:checked').val();
    //    var todoRepeatCheck = $('[name="check"]:checked').length;
      
   
    //    if( checkVal == 'repeat1'){
    //        $('.repeat').addClass('done')
    //    }else if( checkVal == 'repeat2'){
    //        if ( todoRepeatCheck == 0 ) {
    //            $('.repeat').removeClass('done')
    //        }else{
    //            $('.repeat').addClass('done')
    //        }
    //    }else if(checkVal == 'repeat3'){
    //        if ( todoRepeatCheck == 0 ) {
    //            $('.repeat').removeClass('done')
    //        }else{
    //            $('.repeat').addClass('done')
    //        }
    //    }else{
    //        $('.repeat').removeClass('done')
    //    }
    // })

    //카테고리(색상) 선택 
    $('.todo-dday [type=radio]').change(function(){
        $('.dday').addClass('done');
    })
 
    //중요도(별) 선택
    $('.todo-star').click(function(){
        var todoRepeatCheck =  $('[name="todoImportant"]:checked').length;
        // console.log(todoRepeatCheck);
        
        if(todoRepeatCheck == 0){
            $('.star').removeClass('done')
        }else{
            $('.star').addClass('done')
        }
    }) 

    //  todo 저장소에 저장
    $('.input-box .sp-main-todo-add').click(function () {   

        var todoId=date();
        var todoTitle=$('#todoTitle').val();
        var ddayCategory = $('[name="dday-item"]:checked  ~ span.ddayid').data('ddayid')
        var todoImportant=$('[name="todoImportant"]:checked').val();
        var todoTotalTime='0';
        var todoState='notPro';
        // console.log(todoImportant);
        
      
         var dd={
                todoId:todoId,
                todoTitle:todoTitle,
                ddayCategory:ddayCategory,
                todoImportant:todoImportant,
                todoTotalTime:todoTotalTime,
                todoState:todoState,
            }
        
        var ddays=getDdays();

        ddays.forEach(obj => {    
            if(obj.ddayId === dd.ddayCategory){
            //  console.log(dd.ddayCategory);
               obj.todo.push(dd)
            }
        });
        setDdays(ddays) 
        todoList()
        $('.todolist-popup ul li').removeClass('done active');
        $('.main .todolist-popup .todolist-popup-select-popup [type=radio]').prop('checked', false);
        $('.popup-bg-w, .todolist-popup, .todolist-popup-select-popup>ul>li' ).hide();
        $('.input-box input#todoTitle').val('');         
    });
    
    // todo 뿌리기
    function todoList(){
        var ddays = getDdays()
        if(ddays === null){
            ddays=[];
        }
        if(ddays.length!=0){
            $('#todolist').empty();
            ddays.forEach(obj => {
                obj.todo.forEach(item => {
                    $('#todolist').append(`
                    <li>
                        <div class="todolist-content">
                            <div class="todolist-left">
                                <span class="todoId blind">${item.todoId}</span>
                                <span class="todoTitle">${item.todoTitle}</span>
                                <span class="sp sp-main-todolist-not"><span class="blind">${item.todoState}</span></span>
                            </div>
                            <div class="todolist-right">
                                <span class="sp todolist-star ${item.todoImportant}"><span class="blind">${item.todoImportant}</span></span>
                                <span class="todolist-color ${obj.ddayColor}">${obj.ddayColor}</span>
                            </div>
                        </div>
                        <span class="btn-bg btn-delete"><button class="sp sp-main-todolist-swipe-delete"><span class="blind">delete</span></button></span>
                        <span class="btn-bg btn-re"><button class="sp sp-main-todolist-swipe-re"><span class="blind">edit</span></button></span>
                        <span class="btn-done"><button class="sp sp-main-todolist-swipe-done"><span class="blind">done</span></button></span>
                    </li>
                    `)                
                })
            });
            touchEvent();
          
        }
        
    }

    todoList()

  
// 퀵버튼========================================================================================================== 
    //--------------------------------------플러스아이콘
    $('.sp-main-todo-c').click(function () {
        $(this).parents('section').find('.main').children('.todolist-popup').show();
        $('body').append('<div class="popup-bg-w"></div>');
        $('.popup-bg-w').click(function(){
            $('.todolist-popup').hide();
            $(this).remove();
        })
    });

    //--------------------------------------메모아이콘
    $('.sp-main-memo').click(function () {
        $(this).parents('body').find('.memo').show();
        $('body').append('<div class="popup-bg"></div>');
        $('.popup-bg').click(function(){
            $('.memo').hide();
            $(this).remove();
        })
    });

    $('.memo .sp-main-memo-write').click(function () {
        $(this).parents('.memo').next('.fullmemo').show();
    });

    $('.fullmemo-header>.container>button:last-child').click(function(){
        $(this).parents('.fullmemo').hide();
    })

// 수정 : 달력 팝업 ===============================================================================================
    
    $('.main .todolist-popup>ul .date button').click(function(){
        $(this).parents().find('#calendar').show();
        $('body').append('<div class="popup-bg"></div>');

    })

// 디데이=============================================

   
    if(ddays!=null){
        ddays.forEach(obj => {    
        // if(obj.ddayDefault === true){
            
            result = Number(obj.ddayDate.replace(/\//g,'') - todayIs().replace(/\//g,''))
            // console.log( today); //string
            // console.log( result); //number
            // console.log( obj.ddayDate); //string
            allDay = Number(obj.ddayDate.replace(/\//g,'') - obj.startDay.replace(/\//g,''))
            // console.log(Number(result/allDay *100));
            //  총 진행 날짜 / 남은날짜 *100
            percent = Math.floor(Number((allDay - result) / allDay )*100); 
            
            // console.log(percent);
            
            obj.percent=percent;
            obj.result=result;                       
            
            // percentage ------------------------------------------
            var $circle = $('#svg #bar');
            
            if (isNaN(percent)) {
                percent = 0; 
            }else{
                if(obj.ddayDefault){
                    // console.log(obj.ddayId);
                    
                    var r = $circle.attr('r');
                    var c = Math.PI*(r*2);
                    if (percent < 0) { percent = 0;}
                    if (percent > 100) { percent = 100;}
                    
                    var pct = ((100-percent)/100)*c;
                    $circle.css({ strokeDashoffset: pct});
                    
                    $('#cont').attr('data-pct',percent);
                    $('#cont').data('ddayId',obj.ddayId);
                     // console.log(percent);
                    $('.d-day').text('D-'+ obj.result)
                    $('.d-day-title').text(obj.ddayTitle)
                }
            }
        // }
        });
        setDdays(ddays);
    }


 



    //터치 이벤트 
   function touchEvent() {  
        $('.todolist-content').swipe({
            swipeRight:function(){
                $('#todolist li').removeClass('left right');   
                $(this).parent().addClass('right');      
                console.log('오른쪽');        
            },
            swipeLeft:function(){;  
                $('#todolist li').removeClass('left right');   
                $(this).parent().addClass('left');       
                console.log('왼쪽');   
            },
            swipeStatus:function(){;   
                $('#todolist li').removeClass('left right');              
            },

        })
    }
   
    function touchEvent() {  
        $('.todolist-content').swipe({
            swipeRight:function(){
                $('#todolist li').removeClass('left right');   
                $(this).parent().addClass('right');      
                console.log('오른쪽');        
            },
            swipeLeft:function(){;  
                $('#todolist li').removeClass('left right');   
                $(this).parent().addClass('left');       
                console.log('왼쪽');   
            },
            tap:function(){;   
                $('#todolist li').removeClass('left right');              
            },
            swipeDown:function(){;   
                $(this).parents('.todolist-container').removeClass('up down');       
                $(this).parents().find('.todolist-container').addClass('down');       
                console.log('다운');   
            },
            swipeUp:function(){;   
                $(this).parents('.todolist-container').removeClass('up down');       
                $(this).parents('.todolist-container').addClass('up');       
                console.log('업') ;  
    },

        })
    }
   


  

    // 단일삭제 
    $('#todolist').on('click', '.btn-delete', function () {
        console.log('단일삭제하기');
        // 고유아이디값 구하기(date)
        var id=$(this).parent().find('.todoTitle').text();
        console.log(id);
        
        //저장소에서 메모를 가져온다.
        var ddays=getDdays();
        ddays.forEach(obj => {
            obj.todo.forEach((item, i) => {
                if(item.todoTitle == id){
                    obj.todo.splice(i,1);
                }
            })
        })
        //달라진 메모배열을 저장소에 반영 
        setDdays(ddays) 
        todoList(ddays)
    });


    //Update 수정하기 
    //수정하기위한 세팅(준비)
    $('#todolist').on('click','.btn-re',function() {
        editid=$(this).parent().find('.todoId').text();
        editColor=$(this).parent().find('.todolist-color').text();
        console.log(editColor);
        
        var ddays=getDdays();
        ddays.forEach(obj => {
            obj.todo.forEach(item => {
                if(item.todoId == editid){
                    $('.todolist-popup').show();
                    $('input#todoTitle').val(item.todoTitle);

                    $('input[name="dday-item"]:radio[value="'+item.ddayCategory+'"]').prop('checked',true);
                    $('input[name="todoImportant"]:radio[value="'+item.todoImportant+'"]').prop('checked',true);

                    $('.dday').addClass('done active')
                    $('.star').addClass('done')
                    $('.todolist-container').hide();
                    $('.todo-dday').show()
                    $('.sp-main-todo-add').hide();
                    $('.sp-main-todo-edit').show();
                }
            })
        })
    })

    //  진짜 수정버튼
    $('.input-box .sp-main-todo-edit').click(function () {   

        
        var editTitle=$('#todoTitle').val();
        var editCategory = $('[name="dday-item"]:checked').val()
        var editImportant=$('[name="todoImportant"]:checked').val();

        console.log(editid)
        console.log(editTitle)
        console.log(editCategory)
        console.log(editImportant)
        
        var ddays=getDdays();   
        ddays.forEach(obj => {
            obj.ddayColor=editColor;
            obj.todo.forEach(item => {
                if(item.todoId == editid){
                    item.todoTitle=editTitle;
                    item.ddayCategory=editCategory;
                    item.todoImportant=editImportant;
                }
            })
        })
        // setDdays(ddays) 
        // todoList()

        // $('.todolist-container').show();
        // $('.todo-dday').hide();
        // $('.todolist-popup').hide();
    });

});
