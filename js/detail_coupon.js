///遮罩的效果
$(function(){


    //请求数据
    var couponid=/\d+/.exec(location.search)[0];
    $.ajax({
        url:"http://mmb.ittun.com/api/getcouponproduct",
        data:{couponid:couponid},
        success:function(data){
            console.log(data);
            var html=template("content_cou",data);
            $(".coupon_list").html(html);
            var couponTitle=localStorage.getItem("couponTitle");
            $("title").html(couponTitle+" -- 慢慢买");
            $(".couponname").html(couponTitle);

        //    渲染成功就可以点击
        //    var firstnum;
            $(".coupon_list .maskshow").click(function(e){
                $("#mask").fadeIn(500);
                //   轮播图
                var imgWidth=160;
                var str="";
                var ulWidth=imgWidth;
                $("#mask .slide ul").width(ulWidth*data.result.length);
                 firstnum=$(".coupon_list .maskshow").index(this);
                var firsrimg=data.result[firstnum].couponProductImg;
                $("#mask .slide ul li").html(firsrimg);
                $(".slide img").click(function(e){
                    //点击图片阻止冒泡
                    e.stopPropagation();
                })

            })


            //不能click包含click,容易导致问题，会同时触发，也不是冒泡的原因
            $(".slide .arrow_r").click(function(e){
                console.log(firstnum);
                firstnum++;
                console.log(firstnum)
                if(firstnum>data.result.length-1){
                    alert("最后一张了哦")
                    firstnum=data.result.length-1;
                    return;
                }
                $("#mask .slide ul li").html(data.result[firstnum].couponProductImg);
                e.stopPropagation();
            })

            $(".slide .arrow_l").click(function(e){
                firstnum--;
                if(firstnum<0){
                    alert("第一张了哦")
                    firstnum=0;
                    return;
                }
                $("#mask .slide ul li").html(data.result[firstnum].couponProductImg);
                e.stopPropagation();
            })


            //点击时隐藏
            $("#mask").click(function(){
                $("#mask").hide();
            })




        }
    })
})