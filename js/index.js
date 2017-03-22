/**
 * Created by Administrator on 2017/3/15.
 */

$(function(){

//九宫格
    $.ajax({
        url: "http:///mmb.ittun.com/api/getindexmenu",
        data:{},
        jsonp:"cb",
        dataType:'json',
        success:function(data){
            console.log(data);
            var html=template("index_menu",data);
            $("#index_ulmenu").html(html);
            $(".mm_content ul li").eq(7).click(function(){
                //切换
                if($(".mm_content ul li").slice(8,12).css('display')=="inline-block"){
                    $(".mm_content ul li").slice(8,12).css({display:"none"})
                }else{
                    $(".mm_content ul li").slice(8,12).css({display:"inline-block"});
                }
            })

        }
    })
//    商品列表
    $.ajax({
        //url:"http://127.0.0.1:3000/api/getmoneyctrl",
        url:"http://mmb.ittun.com/api/getmoneyctrl",
        data:{},
        jsonp:"cb",
        dataType:'json',
        success:function(data){
            console.log(data);
            var html=template("index_menuone",data);
            $("#menu_list").html(html);


        }
    })





})
