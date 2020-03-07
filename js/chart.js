$(function(){

    $('.tab-nav a').click(function(){
        var id = $(this).attr('href')
        $('.tab-nav a').removeClass();
        $(this).addClass('active');
        $('.tab-contents div').hide();
        // show안에 active넣으면 효과가 달라짐
        $(id).show()

    })

})