/**
 * Created by Administrator on 2017/3/18.
 */
$(function(){

    //��������Ⱦ
    var shopId=0;
    var areaId=0;
    var str="shopId"+shopId+"&"+"areaId"+areaId;
   sessionStorage.clear();
    function getdata(shopId,areaId){
        $.ajax({
            url:"http://mmb.ittun.com/api/getgsproduct",
            data:{shopid:shopId,areaid:areaId},
            dataType:'json',
            success:function(data){
                console.log(data)
                var html=template("allcont",data);
                $(".listall").html(html);
            //    ���������ڱ���
                str="shopId"+shopId+"&"+"areaId"+areaId;
               sessionStorage.setItem(str,JSON.stringify(data));
            }
        })
    }

    getdata(shopId,areaId);

    $(".topbar .tit li").click(function(){
        //��ͷ�仯
        $(this).toggleClass("on").siblings().removeClass("on");
        var index=$(this).index();
        if(index==0){
            $(".top_three .shop").toggle().siblings().hide();;
            if($(".shop_det").children().html()){
                return;
            }
            //�Ż��´ε�����÷�������
            $.ajax ({
                url:"http://mmb.ittun.com/api/getgsshop",
                type:"get",
                dataType:'json',
                success:function(data){
                    console.log(data);
                    var html=template("shop",data);
                    $(".shop_det").html(html);
                    $(".shop_det li").eq(0).addClass("active");

                    //    �������˵����¼�
                    $(".top_three .shop_det li").click(function(){
                        $(this).addClass("active").siblings().removeClass("active");
                        console.log(1);
                        shopId=$(this).attr("shop");
                        $(this).parent().parent().hide();
                        $(".topbar .tit .top_shop strong").html($(this).html());
                            str="shopId"+shopId+"&"+"areaId"+areaId;
                        if(sessionStorage.getItem(str)){
                            var html=template("allcont",JSON.parse(sessionStorage.getItem(str)));
                            $(".listall").html(html);
                            return;
                        }
                    //�������˵��󶨵����ȡ���ݣ���ȡ���Ĳ��ڻ�ȡ
                        getdata(shopId,areaId);
                    })
                }
            })
        }else if(index==1){
            $(".top_three .area").toggle().siblings().hide();
            if($(".area_det").children().html()){
                return;
            }
            $.ajax ({
                url:"http://mmb.ittun.com/api/getgsshoparea",
                type:"get",
                dataType:'json',
                success:function(data){
                    console.log(data);
                    var html=template("area",data);
                    $(".area_det").html(html);
                    $(".area_det li").eq(0).addClass("active");

                    //    �������˵����¼�
                    $(".top_three .area_det li").click(function(){
                        $(this).addClass("active").siblings().removeClass("active");
                        console.log(1);
                        areaId=$(this).attr("area");
                        $(this).parent().parent().hide();
                        $(".topbar .tit .top_area strong").html($(this).html().slice(0,2));

                    //���������ݾ��ڱ�����ȡ
                        str="shopId"+shopId+"&"+"areaId"+areaId;
                        if(sessionStorage.getItem(str)){
                            var html=template("allcont",JSON.parse(sessionStorage.getItem(str)));
                            $(".listall").html(html);
                            return;
                        }

                        //�������˵��󶨵����ȡ���ݣ���ȡ���Ĳ��ڻ�ȡ
                        getdata(shopId,areaId);
                    })

                }
            })
        }
        else if(index==2){
            $(".top_three .detai_price").toggle().siblings().hide();
            //    �������˵����¼�
            $(".top_three .detai_price li").click(function(e){
                e.stopPropagation();
                $(this).addClass("active").siblings().removeClass("active");
                console.log(1);
                $(this).parent().parent().hide();
                $(".topbar .tit .top_price strong").html($(this).html().slice(0,4));

            })

        }
    })




})