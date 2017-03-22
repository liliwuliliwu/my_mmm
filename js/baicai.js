/**
 * Created by Administrator on 2017/3/19.
 */
//获取tab标题
$(function () {
    var titleid = 0;
    var arr={};
        arr.length=0;
    //通过titleid获取数据
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
                //请求过的数据不用再次请求，小于十条存在内存中，就是变量数组保存起来，大于十条的保存在本地，也就是硬盘中，离开页面后删除本地缓存，sessionstorage是关闭浏览器后清除
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

    //给顶部设置滚动事件
    function topSwipe() {
        /*通过封装的swipe插件来实现*/
        swipe.iScroll({
            swipeDom: document.querySelector('.tab'), /*父容器对象*/
            swipeType: 'x', /*滑动的方向*/
            swipeDistance: 100/*缓冲的距离*/
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
            //创建ul的宽度
            $(".tab_cont li").each(function (i, v) {
                ulWidth += $(v).width();
            })
            $(".tab li:eq(0) a").addClass("active");
            //console.log(ulWidth);
            $(".tab .tab_cont").width(ulWidth);

            console.log(data);
            topSwipe();
            //点击tab栏
            $(".tab_cont li").click(function () {
                var index = $(this).index();

                //点击同一个不用请求数据了,这些都写复杂了，后续这些东西都可以写在自定义属性中
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
                // 会先获取当前页面的hash值而此时hash值还没有因为点击而改变,可以用监听事件
                // console.log(titleid);
                //if(  titleid == data.result[index].titleId){
                //    return
                //}
                //getdata(titleid);

                //头部的滚动特效
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
//顶部通栏的滚动导致文字部分问题
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
//    获取商品具体内容
    getdata(titleid);


//    点击回到顶部的效果
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

    //当页面离开的时候清理缓存
    window.onunload=function(){
      sessionStorage.clear();
    };

})


