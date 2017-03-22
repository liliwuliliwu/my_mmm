/**
 * Created by Administrator on 2017/3/16.
 */
$(function(){
    var Id=/\d+/.exec(location.search)[0];

    //请求数据
    function ajax_c(){
        $.ajax ({
            url:"http://mmb.ittun.com/api/getproductlist",
            data:{categoryid:Id,pageid:pageid},
            type:"get",
            dataType:'json',
            success:function(data){
                console.log(data);
                var html=template("listcat",data);
                $("#menu_list").html(html);
                $("html,body").animate({scrollTop:0},0);

                //第一次请求将数据存储
                sessionStorage.setItem("pageid"+pageid,JSON.stringify(data));
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


    //根据categoryid选择渲染标题名字
    $.ajax({

        url:'http://mmb.ittun.com/api/getcategorybyid',
        data:{categoryid:Id},
        type:"get",
        dataType:'json',
        success:function(data){
            console.log(data);
            var html=template("listtit",data);
            $(".top_head_con").html(html);
            localStorage.setItem("category",data.result[0].category);
        }
    })


    //清理缓存
    sessionStorage.clear();

    var pageid=1;
    var totalpage;


    //根据分类categoryid和pageid获取数据
    $.ajax ({
        url:"http://mmb.ittun.com/api/getproductlist",
        data:{categoryid:Id,pageid:pageid},
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
            var html=template("listcat",data);
            $("#menu_list").html(html);
            //$('#select')[0].selectedIndex=-1;//默认为其他空

            //第一次请求将数据存储
            //注意需要转成字符串
            sessionStorage.setItem("pageid"+pageid,JSON.stringify(data));

        }
    })

    //
    changecolor();
    //改变select选项
    $('#select').change(function(){
          var value=$('#select').val();
        pageid=/(\d+)/.exec(value)[0];
        changecolor();
        if(sessionStorage.getItem("pageid"+pageid)){
            data=JSON.parse(sessionStorage.getItem("pageid"+pageid));
            var html=template("listcat",data);
            $("#menu_list").html(html);
            return;
        }
        ajax_c();
    })

    //向前点击
    $("#pre").click(function(){
        pageid--;
        changecolor();
        if(pageid<=0){
            pageid=1;
            alert("已经是第一页了哦")
            return;
        }
        $('#select')[0].selectedIndex = pageid-1;
        if(sessionStorage.getItem("pageid"+pageid)){
            //获取数据后需要转成json对象
            data=JSON.parse(sessionStorage.getItem("pageid"+pageid));
            var html=template("listcat",data);
            $("#menu_list").html(html);
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
        if(sessionStorage.getItem("pageid"+pageid)){
            data=JSON.parse(sessionStorage.getItem("pageid"+pageid));
            var html=template("listcat",data);
            $("#menu_list").html(html);
            return;
        }
        ajax_c();
    })


})