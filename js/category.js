/**
 * Created by Administrator on 2017/3/16.
 */
//��ȡ�б�����
$(function () {
    //�������˸�����
    $.ajax({
        url: "http://mmb.ittun.com/api/getcategorytitle",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var html = template("cat_menu", data);
            $("#accordion").html(html);
            //��ÿ����ӵ���¼�
            $('#accordion .panel-title a').on('click', function () {
              var index=$('#accordion .panel-title a').index(this);
                console.log(index);
               $(".panel-group .panel").eq(index).toggleClass("on").siblings(".panel").removeClass("on");
                //$(".panel-group .panel").eq(index).toggleClass("on")
                //�Լ�ͷ��ǩ�Ĵ������·�����ȥ����,���ⶼ�Ǽ��м����Խ��Ĵ��밡
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
                    //�����Ż�������е����ȡ������������������
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
            //��֤���С��ͷҲ��Ч��
            $("#accordion span").click(function(){
                //console.log(this);
                   $(this).prev().click();
            })
        }

    })
})
