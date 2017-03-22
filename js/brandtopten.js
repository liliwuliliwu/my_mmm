/**
 * Created by Administrator on 2017/3/20.
 */
$(function(){
    var brandtitleid=/\d+/.exec(location.search)[0];
    var brandTitle=localStorage.getItem("brandTitle");
    brandTitle=brandTitle.slice(0,brandTitle.length-4);
    var productid="";
    var productimg="";
    var productName="";
    console.log(brandTitle);
    $.ajax({
        url: "http://mmb.ittun.com/api/getbrand",
        dataType: 'json',
        data:{brandtitleid:brandtitleid},
        success:function(data){
            console.log(data);
            var html = template("cat_menu", data);
            $(".ten").html(html);
            $("title").html(brandTitle+"什么牌子好，"+brandTitle+"十大品牌排行榜");
            $(".midone").html(brandTitle+"哪个牌子好");
            $(".midtwo").html(brandTitle+"产品销量排行");
            $(".midthree").html(brandTitle+"最新评论");
            $(".nav .where").html(brandTitle+"哪个牌子好");

        }
    })
    //获取商品销量数据
    $.ajax({
        url: "http://mmb.ittun.com/api/getbrandproductlist",
        dataType: 'json',
        data:{
            brandtitleid:brandtitleid,
            pagesize:4
        },
        success:function(data){
            console.log(data);
            productid=data.result[0].productId;
            productimg=data.result[0].productImg;
            productName=data.result[0].productName;
            //需要设置跳转后的页面的标题
            localStorage.setItem("category",brandTitle)

            var html = template("saless", data);
            $(".sales ul").html(html);
            $(".comment .sigle .pic").html(productimg);
            $(".comment .sigle .cont").html(productName);
            $(".comment .first").attr("href","bijia.html?id="+data.result[0].productId);

//    获取评论列表
            $.ajax({
                url: "http://mmb.ittun.com/api/getproductcom",
                dataType: 'json',
                data:{
                    productid :productid
                },
                success:function(data){
                    console.log(productid);
                    console.log(data);
                    var html = template("comments", data);
                    $(".comment .allcomt").html(html);

                }
            })
        }
    })


})