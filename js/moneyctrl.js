/**
 * Created by Administrator on 2017/3/18.
 */
$(function(){
    var pageid=1;
    var totalpage;
    //封装多次调用
    function ajax_c(){
        $.ajax ({
            url:"http://mmb.ittun.com/api/getmoneyctrl",
            data:{pageid:pageid},
            type:"get",
            dataType:'json',
            success:function(data){
                console.log(data);
                //console.log(2);
                var html=template("tem_cont",data);
                $(".cont").html(html);
                sessionStorage.setItem("moneyctrlpageid"+pageid,JSON.stringify(data));

                //动画回到顶部
                $("html,body").animate({scrollTop:0},0);
            }
        })
    }

    //button图标改变
    function changecolor(){
        if(pageid<=1){
            $("#pre").css({'background':'-webkit-gradient(linear, 0 0, 0 100%, from(red), to(blue))'})
        }else{
            $("#pre").removeAttr('style');
        }
        if(pageid>=totalpage){
            $("#next").css({'background':'-webkit-gradient(linear, 0 0, 0 100%, from(red), to(blue))'})
        }else{
            $("#next").removeAttr('style');
        }
    }

    //第一次请求主体数据
    sessionStorage.clear();
    $.ajax({
        url:'http://mmb.ittun.com/api/getmoneyctrl',
        data:{pageid:1},
        type:"get",
        dataType:'json',
        success:function(data){
            console.log(data);
            totalpage=Math.ceil(data.totalCount/data.pagesize);
            var str='';
            for(var i=0;i<totalpage;i++){
                var option='<option>'+(i+1)+'&nbsp;/&nbsp;'+totalpage+'</option>';
                str+=option;
            }
            $('#select').html(str);
            var html=template("tem_cont",data);
            $(".cont").html(html);


            //第一次请求将数据存储
            //注意需要转成字符串
            sessionStorage.setItem("moneyctrlpageid"+pageid,JSON.stringify(data));
        }
    })



    changecolor();
    //点击select选项
    $('#select').change(function(){
        var value=$('#select').val();
        pageid=/(\d+)/.exec(value)[0];
        changecolor();
        //判断是否请求过
        if(sessionStorage.getItem("moneyctrlpageid"+pageid)){
            data=JSON.parse(sessionStorage.getItem("moneyctrlpageid"+pageid));
            var html=template("tem_cont",data);
            $(".cont").html(html);
            //动画回到顶部
            $("html,body").animate({scrollTop:0},0);
            return;
        }
        ajax_c();
    })

//    向前点击效果
    $("#pre").click(function(){
        pageid--;
        changecolor();
        if(pageid<=0){
            pageid=1;
            alert("已经是第一页了哦")
            return;
        }
        $('#select')[0].selectedIndex = pageid-1;
        if(sessionStorage.getItem("moneyctrlpageid"+pageid)){
            data=JSON.parse(sessionStorage.getItem("moneyctrlpageid"+pageid));
            var html=template("tem_cont",data);
            $(".cont").html(html);
            //动画回到顶部
            $("html,body").animate({scrollTop:0},0);
            return;
        }
        ajax_c();
    })

    //向后点击
    $("#next").click(function(){
        pageid++;
        changecolor();
        if(pageid>=totalpage+1){
            pageid=totalpage;
            alert("已经是最后一页了哦")
            return;
        }
        $('#select')[0].selectedIndex = pageid-1;
        if(sessionStorage.getItem("moneyctrlpageid"+pageid)){
            data=JSON.parse(sessionStorage.getItem("moneyctrlpageid"+pageid));
            var html=template("tem_cont",data);
            $(".cont").html(html);
            //动画回到顶部
            $("html,body").animate({scrollTop:0},0);
            return;
        }
        ajax_c();
    })
})