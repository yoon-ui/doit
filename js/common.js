// 오늘날짜구하기(초단위)
function date() {
    var date=new Date().toLocaleDateString();
    date=date.slice(0, -1);
    var time=new Date().toLocaleTimeString();
    return date+' '+time;
}
// 오늘날짜(년월일)
function todayIs() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();

    if(dd<10){
        dd = '0'+dd
    }
    if(mm<10){
        mm = '0'+mm
    }
    return yyyy+'/'+mm+'/'+dd;
} 

// dday저장하기
function setDdays(ddays) {
    var ddaysJSON = JSON.stringify(ddays);
    localStorage.setItem("ddays", ddaysJSON);
}
// dday가져오기
function getDdays() {
    var ddaysJSON = localStorage.getItem("ddays");
    return JSON.parse(ddaysJSON);
}

$(function(){
// 팝업 배경 닫기========================================================================================
    // $('.popup-bg').click(function(){
    //     $('.popup').hide();
    //     $(this).remove();
    // });


// 상단 메뉴버튼 클릭====================================================================================
  

 


























});