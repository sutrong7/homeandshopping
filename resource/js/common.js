$(function () {
    var btn = $('.familySite button');
    var list = $('.familySite ul');

    btn.on('click', function () {

        if (!$(this).hasClass('on')) {
            $(this).addClass('on');
            list.slideToggle('fast');
            return false;
        } else {
            $(this).removeClass('on');
            list.slideToggle('fast');
            return false;
        }
    });


    $('.main>li').mouseover(function () {
        $(this).children(".sub").slideDown(250);
        $(this).stop().addClass('hover');
    });
    $('.main>li').mouseleave(function () {
        $(this).children(".sub").slideUp(250);
        $(this).stop().removeClass('hover');
    });


    tab('.tab', 0);


    function tab(e, num) {
        var num = num || 0;
        var menu = $(e).children();
        var con = $(e + '_con').children();
        var select = $(menu).eq(num);
        var i = num;

        select.addClass('on');
        con.eq(num).show();

        menu.click(function () {
            if (select !== null) {
                select.removeClass("on");
                con.eq(i).hide();
            }
            select = $(this);
            i = $(this).index();
            select.addClass('on');
            con.eq(i).show();
        });
    }

    /* 팝업 탭 */

    $('#tab-1').show();
    $('.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('.tabs li').removeClass('on');
        $('.categoryTab .table_con').hide();

        $(this).addClass('on');
        $("#" + tab_id).show();
    });


    $(function () {
        var $price = $(".price");
        $price.on('keyup', function () {
            // 입력 값 알아내기
            var _this = this;
            numberFormat(_this)
        })

    });

    // 콤마 찍기
    function comma(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }

    // 콤마 풀기
    function uncomma(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    }

    function numberFormat(obj) {
        obj.value = comma(uncomma(obj.value));
    }


    /* FAQ */

    $("dt").click(function () {
        $(this).toggleClass("on").next().toggleClass("on");
        $("dt").not(this).removeClass("on").next().removeClass("on");
        return false;
    });

    /* 달력 */
    $(function () {
        $(".datepicker").datepicker({
            dateFormat: 'yy-mm-dd',
            prevText: '이전 달',
            nextText: '다음 달',
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            dayNames: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            showMonthAfterYear: true,
            changeMonth: false,
            changeYear: false,
            yearSuffix: '년'
        });
    });


    /* 하루 동안 팝업창 열지 않기 */

 



});
