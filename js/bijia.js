/**
 * Created by Administrator on 2017/3/16.
 */
$(function(){
    var productId=/\d+/.exec(location.search)[0];
    $.ajax({
        //url: "http://192.168.15.24:3000/api/getcategorytitle",
        //url: "http://192.168.1.106:3000/api/getcategorytitle",
        //url: "http://127.0.0.1:3000/api/getproduct",
        url: "http://mmb.ittun.com/api/getproduct",
        data: {productid :productId},
        dataType: 'json',
        success: function (data) {
           var categoryid=data.result[0].categoryId;
            console.log(categoryid);
            $('.cat').attr("href",'prolist.html?categoryid='+categoryid)
            console.log(data);
           //做本地存储或这url地址栏（利用a的href...?..）传递值
            var category=localStorage.getItem("category")
            console.log(category);
            $(".cat").html(category);
            var html = template("detail", data);
            $("#detail_con").html(html);
            var html2=template("bijia",data);
            $("#price_db").html(html2);
            var titna=data.result[0].productName.split(" ")[0];
            $('.tit_name').html(titna);
            $('title').html(titna+'价格，多少钱');

        }
    })
    $.ajax({
        //url:'http://192.168.15.24:3000/api/getcategorybyid',
        //url:'http://192.168.1.106:3000/api/getcategorybyid',
        //url:'http://127.0.0.1:3000/api/getproductcom',
        url:'http://mmb.ittun.com/api/getproductcom',
        data:{productid :productId},
        //type:"get",
        dataType:'json',
        success:function(data){
            console.log(data)
            var all_con=data.result.length;
            $(".allconlength").html(" 评价("+all_con+")");
            var html = template("comment_all", data);
            $(".comment").html(html);



        }
    })






})