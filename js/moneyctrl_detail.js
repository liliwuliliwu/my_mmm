/**
 * Created by Administrator on 2017/3/18.
 */
$(function(){
    var productid=/\d+/.exec(location.search)[0];
    var hash=location.hash.slice(1);
    console.log(hash);
    var urlId;
    //判断从哪个页面过来，那么拿到具体数据去渲染
    if(hash=='inlanddiscount'){
        urlId='getdiscountproduct';
    }else if(hash=='moneyctrl'){
        urlId='getmoneyctrlproduct';
    }
    //console.log(productid);
    //主体内容发送ajax
    $.ajax({
        url:'http://mmb.ittun.com/api/'+urlId,
        data:{productid:productid},
        dataType:'json',
        success:function(data){
            console.log(data);
            if( urlId=='getdiscountproduct'){
                var html=template("inlanddiscount",data);
            }else if( urlId='getmoneyctrlproduct'){
                var html=template("cont_top",data);
            }
            //console.log(html);
            $(".top_cont").html(html);
            $('.city').html(data.result[0].productCity);
            $('.comment').html(data.result[0].productComment);
            $("title").html(data.result[0].productName);
            $(".arrow").attr('href',hash+'.html');
        }

    })
})