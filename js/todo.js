$(function(){    
    var ddayDefaultStorage=localStorage.getItem('ddayDefault');
    if(ddayDefaultStorage==undefined){
        $('[name="ddayDefault"]').prop('checked',true);
    }
// 달력보기===============================================================================================
    $('.sp-common-menu-popup-add-date').click(function(){
        $('.popup').show();
        $('body').append('<div class="popup-bg"></div>');
    });
//오늘 날짜로 입력값 변경 ================================================================================
$('#ddayDate').text(todayIs());

// 상단 취소버튼 클릭===============================================================================================
    $('.btn-cancle').click(function (e) { 
        location.href="main.html";
    });

// 상단 저장버튼 클릭===============================================================================================
    $('.btn-save').click(function (e) { 
        var ddayId=date();//클릭한 시점의 날짜+시간을 저장
        console.log(ddayId);
        var ddayTitle=$('#ddayTitle').val();
        var ddayDate=$('#ddayDate').text();
        var ddayColor=$(':input:radio[name="ddayColor"]:checked').val();
        var ddayDefault=$(':input:checkbox[name="ddayDefault"]').is(':checked');
        var startDay=todayIs();
    
        if(ddayTitle === ""){
            alert('제목을 작성해주세요.')
            $('#ddayTitle').focus();
        }else if(ddayColor === undefined){
            alert('카테고리를 선택하세요.')
        }else{
            console.log(ddayTitle, ddayDate, ddayColor);
            
        // 저장소에 데이터 넣기 
        //1. 저장소에 넣을 데이터 키값 정하기(ddays) 
        //2. dday를 하나로 관리할 객체 이름을 부여 dday
            var dday={
                ddayId:ddayId,
                ddayTitle:ddayTitle,
                ddayDate:ddayDate,
                ddayColor:ddayColor,
                ddayDefault:ddayDefault,
                startDay:startDay,
                todo:[]
            } 
            var ddays = getDdays()
            if(ddays === null){
                ddays = []
            }
            if(ddayDefault){         
                localStorage.setItem('ddayDefault','ok');   
                ddays.forEach(obj => {
                    obj.ddayDefault=false;
                });
            }
            ddays.push(dday)
            setDdays(ddays);
            
            //디폴트 지정을 했다면 기존 데이터목록 불러와서 false로 변경하기
            location.href="main.html";
        }  
    });

// 달력==================================================================================================
    var todoDate;
    $("#calendar")
    .datepicker({   
        dateFormat:"yy/mm/dd",
        showOtherMonths: true,
        selectOtherMonths: false,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        minDate: 0,
        defaultDate: new Date(),
        onSelect: function(dateText) { 
            todoDate=dateText;
            //날짜 선택완료 ----수정
            $('.popup .cal-done').click(function (e) { 
                $('#ddayDate').text(todoDate);
                $('.popup').hide();
                $('.popup-bg').remove();
                console.log(todoDate);  
            });
            
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

    //수정일 때 파라미터 받기
    function getParam(sname) {
        var params = location.search.substr(location.search.indexOf("?") + 1);
        var sval = "";
        params = params.split("&");

        for (var i = 0; i < params.length; i++) {
            temp = params[i].split("=");
           if ([temp[0]] == sname) { sval = temp[1]; }
        }
        return sval;
     }
     var ddayId=decodeURI(getParam("ddayId"));      

     if(ddayId!=""){
        var ddays=getDdays();
        var dday={};
        if(ddays!=null){
            ddays.forEach(obj => {
                if(obj.ddayId==ddayId){
                    dday=obj;
                    $('body').addClass('edit');
                    $('#ddayTitle').val(dday.ddayTitle)
                    console.log(typeof editTitle);
                    console.log(typeof dday.ddayTitle);
                    
                    $('#ddayDate').text(dday.ddayDate);
                    $('input:radio[name=ddayColor][value='+dday.ddayColor+']').attr("checked", true);
                        if(dday.ddayDefault !==false){
                            $('[name="ddayDefault"]').prop('checked',true);
                        }
                }
            });
        }
     }



    //  진짜 수정버튼
    $('.btn-edit').click(function (e) { 
        e.preventDefault();
        var editTitle = $('#ddayTitle').val()
        var editDate=$('#ddayDate').text();
        var editColor=$(':input:radio[name="ddayColor"]:checked').val();
        var editDefault=$(':input:checkbox[name="ddayDefault"]').is(':checked');

        console.log(editTitle ,editDate, editColor, editDefault);
        var dday={
                    ddayId:ddayId,
                    ddayTitle:editTitle,
                    ddayDate:editDate,
                    ddayColor:editColor,
                    ddayDefault:editDefault,
                    startDay:todayIs(),
                    todo:[]
                 } 
        console.log(dday);
        
        var ddays = getDdays()
        for (const i in ddays) {
            if(ddays[i].ddayId==ddayId){
                console.log(ddayId);
                ddays[i].ddayTitle=editTitle;
                ddays[i].ddayDate=editDate;
                ddays[i].ddayColor=editColor;
                ddays[i].ddayDefault=editDefault;
                console.log(editTitle);
               break;
            }         
         }     
        setDdays(ddays);
         $('body').removeClass();
        location.href="main.html";  
    });

});





