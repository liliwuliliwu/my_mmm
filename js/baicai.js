/**
 * Created by Administrator on 2017/3/19.
 */
//��ȡtab����
$(function () {
    var titleid = 0;
    var arr={};
        arr.length=0;
    //ͨ��titleid��ȡ����
    sessionStorage.clear();
    function getdata(titleid) {
        $.ajax({
            //url: 'http://127.0.0.1:3000/api/getbaicaijiaproduct',
            url: 'http://mmb.ittun.com/api/getbaicaijiaproduct',
            data: {titleid: titleid},
            dataType: "json",
            success: function (data) {
                var htmlcont = template('cont_mai', data);
                $('.cont').html(htmlcont);
                //����������ݲ����ٴ�����С��ʮ�������ڴ��У����Ǳ������鱣������������ʮ���ı����ڱ��أ�Ҳ����Ӳ���У��뿪ҳ���ɾ�����ػ��棬sessionstorage�ǹر�����������
                console.log(data);
                if(arr.length<10){
                    arr['titleid'+titleid]=data.result;
                    arr.length++;
                    console.log(arr);
                }else{
                    sessionStorage.setItem('titleid'+titleid,JSON.stringify(data.result))
                }

            }
        })
    }

    //���������ù����¼�
    function topSwipe() {
        /*ͨ����װ��swipe�����ʵ��*/
        swipe.iScroll({
            swipeDom: document.querySelector('.tab'), /*����������*/
            swipeType: 'x', /*�����ķ���*/
            swipeDistance: 100/*����ľ���*/
        });
    }

    $.ajax({
        //url: 'http://127.0.0.1:3000/api/getbaicaijiatitle',
        url: 'http://mmb.ittun.com/api/getbaicaijiatitle',
        dataType: "json",
        success: function (data) {
            //var ulWidth=data.result.length*$(".tab li").width();
            //   $(".tab ul").width(ulWidth);
            var htmlTab = template('tabul', data);
            $('.tab_cont').html(htmlTab);
            var ulWidth = 0;
            //����ul�Ŀ��
            $(".tab_cont li").each(function (i, v) {
                ulWidth += $(v).width();
            })
            $(".tab li:eq(0) a").addClass("active");
            //console.log(ulWidth);
            $(".tab .tab_cont").width(ulWidth);

            console.log(data);
            topSwipe();
            //���tab��
            $(".tab_cont li").click(function () {
                var index = $(this).index();

                //���ͬһ����������������,��Щ��д�����ˣ�������Щ����������д���Զ���������
                //console.log(titleid);
                if(  titleid == data.result[index].titleId){
                    console.log(2)
                    return;
                }
                titleid = data.result[index].titleId;//
                if(arr['titleid'+titleid]||sessionStorage.getItem('titleid'+titleid)){
                    var newdata={};
                    newdata.result=arr['titleid'+titleid]||JSON.parse(sessionStorage.getItem('titleid'+titleid));
                    //console.log(data.result);
                    var htmlcont = template('cont_mai', newdata);
                    $('.cont').html(htmlcont);
                }else{
                    getdata(titleid);
                }

                $(".tab li:eq(" + index + ") a").addClass("active").parent("li").siblings("li").find("a").removeClass("active");
                // ���Ȼ�ȡ��ǰҳ���hashֵ����ʱhashֵ��û����Ϊ������ı�,�����ü����¼�
                // console.log(titleid);
                //if(  titleid == data.result[index].titleId){
                //    return
                //}
                //getdata(titleid);

                //ͷ���Ĺ�����Ч
                //console.log($(this).parent("ul").get(0).style.transform);
                var ulTranlateX = $(this).parent("ul").get(0).style.transform ? /\d+/.exec($(this).parent("ul").get(0).style.transform)[0] : 0;
                var liOffsetLeft = this.offsetLeft;
                //
                //console.log(liOffsetLeft);
                //console.log(ulTranlateX);
                //console.log(ulTranlateX-0 + parseInt($(window).width()));
                //console.log(liOffsetLeft + this.offsetWidth);

                if (ulTranlateX > liOffsetLeft) {
                    console.log(2)
//����ͨ���Ĺ����������ֲ�������
                    $(this).parent("ul").css(
                        {"transform": "translateX(-" + liOffsetLeft + "px)", "transition": "all 1s"}
                    )
                } else if (ulTranlateX-0 + parseInt($(window).width()) < liOffsetLeft + this.offsetWidth) {
                    var trans=liOffsetLeft-0 + this.offsetWidth-0 - parseInt($(window).width());
                    //console.log(trans);
                    $(this).parent("ul").css(
                        {
                            "transform":"translateX(-" + trans + "px)",
                            "transition": "all 1s"
                        }
                    )
                }

            })
        }
    })
//    ��ȡ��Ʒ��������
    getdata(titleid);


//    ����ص�������Ч��
    $(window).scroll(function () {
        if ($(window).scrollTop() > 500) {
            $(".fixed span").fadeIn(100);
        } else {
            $(".fixed span ").fadeOut(100);
        }
    })
    $('.fixed span').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
        return false;
    })

    //��ҳ���뿪��ʱ��������
    window.onunload=function(){
      sessionStorage.clear();
    };

})


