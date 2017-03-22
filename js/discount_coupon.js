/**
 * Created by Administrator on 2017/3/14.
 */
//优惠券数据请求
$(function(){

    $.ajax({
        url:"http://mmb.ittun.com/api/getcoupon",
        data:{},
        //jsonp:"cb",
        dataType:'json',
        success:function(data){
            console.log(data);
            var html=template("coupon_template",data);
           $("#coupon_list").html(html);
           $("#coupon_list li a").click(function(){
              var titlename=$(this).attr("titlename");
               localStorage.setItem("couponTitle",titlename)
           })
        }

    })
})