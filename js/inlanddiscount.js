/**
 * Created by Administrator on 2017/3/18.
 */
$(function(){
    var winH=$(window).height();
    var dateNew={};
    var begin=8;
    var end;
    var lastLi;
    var flag=false;
    var bottomHeight=80;
    var liHeight;

    function deepClone ( obj ) {
        var dst = obj instanceof Array ? [] : {}, k;
        for ( k in obj ) {
            // 如果是值类型, 直接赋值, 如果是引用类型, 拷贝以后再赋值
            if ( typeof obj[ k ] === 'object' ) {
                dst[ k ] = deepClone( obj[ k ] );
            } else {
                dst[ k ] = obj[ k ];
            }
        }
        return dst;
    }
    //渲染国内折扣列表数据
    $.ajax ({
        url:"http://mmb.ittun.com/api/getinlanddiscount",
        type:"get",
        dataType:'json',
        success:function(data){
            console.log(data);
            //对象克隆进行深度克隆
            dateNew=deepClone(data);
            dateNew.result.length=begin;
            //    做假的懒加载，其实数据已经全部请求回来了
            var html=template("cont_top",dateNew);
            $(".listall").html(html);
            //console.log(begin);//8
            lastLi=$(".listall li").last();
            //console.log(lastLi)
            liHeight=lastLi.height();
            //console.log(liHeight);
            //触底条件很关键

            $(window).scroll(function(){
                //console.log(lastLi.offset().top,$(window).scrollTop(),$(window).height());
                //console.log($(window).scrollTop(),$(document).height(),$(window).height());
              if(lastLi.offset().top+liHeight<=$(window).scrollTop()+winH){
                  //此处判断条件有问题，因为继续向下滚动的时候，依然会满足条件而去添加定时器，多次添加了定时器，多次触发，以至于begin很快的变化
                  //所以配合节流阀来做
                  //所以写成类似$(window).scrollTop()>=$(document).height()-$(window).height();
                //不过可以配合节流阀做，

              //if($(window).scrollTop()>=$(document).height()-$(window).height()-bottomHeight){
                  //不用配合节流阀的写法
                  console.log(1);

                  if(flag==false){
                      if(begin>=20){
                          $(".listall").siblings(".spinnerbottom").hide();
                          return;
                      }
                      $(".listall").siblings(".spinnerbottom").show();
                      var timer=setTimeout(function () {
                          //console.log(2);
                          var newfour=data.result.slice(begin,begin+=4);
                          //console.log(newfour);
                          //console.log(newfour);
                          var newobj={result:newfour}
                          var html_four=template("cont_top",newobj);
                          //console.log(html_four);
                          $(".listall").siblings(".spinnerbottom").hide();
                          $(".listall").append(html_four);
                          lastLi=$(".listall li").last();
                          console.log(lastLi);
                          flag=false;
                      },1000)
                  }
                  flag=true;
              }

            })

        }
    })


})
