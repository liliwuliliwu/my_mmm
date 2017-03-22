/**
 * Created by Administrator on 2017/3/16.
 */
//获取列表数据
$(function () {
    //请求标题八个数据
    $.ajax({
        url: "http://mmb.ittun.com/api/getcategorytitle",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var html = template("cat_menu", data);
            $("#accordion").html(html);
            //给每个添加点击事件
            $('#accordion .panel-title a').on('click', function () {
              var index=$('#accordion .panel-title a').index(this);
                console.log(index);
               $(".panel-group .panel").eq(index).toggleClass("on").siblings(".panel").removeClass("on");
                //$(".panel-group .panel").eq(index).toggleClass("on")
                //对箭头标签的处理，以下方法过去复杂,唉这都是几行挤破脑浆的代码啊
                //if($(this).next("span").prop("className")=="glyphicon glyphicon-menu-up"){
                //    $(".panel span").each(function(){
                //        $(this).removeClass().addClass('glyphicon glyphicon-menu-down');
                //    })
                //    $(this).next("span").removeClass().addClass('glyphicon glyphicon-menu-down');
                //}else if($(this).next("span").prop("className")=="glyphicon glyphicon-menu-down"){
                //    $(".panel span").each(function(){
                //        $(this).removeClass().addClass('glyphicon glyphicon-menu-down');
                //    })
                //    $(this).next("span").removeClass().addClass('glyphicon glyphicon-menu-up');
                //}

                var index = $('#accordion .panel-title a').index(this);
                var titleid = data.result[index].titleId;
                    //性能优化，如果有点击获取过数据则不在请求数据
                    if($("#collapse" + index + " table").children().html()){
                        return;
                    }
                    $.ajax({
                        url: "http://mmb.ittun.com/api/getcategory",
                        data: {'titleid': titleid},
                        dataType: 'json',
                        success: function (data) {
                            var html = template("listcat", data);
                            $("#collapse" + index + " table").html(html);
                            console.log(data);
                        }
                    })

            })
            //保证点击小箭头也有效果
            $("#accordion span").click(function(){
                //console.log(this);
                   $(this).prev().click();
            })
        }

    })
})
