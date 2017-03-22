/**
 * Created by Administrator on 2017/3/20.
 */
$(function(){
    $.ajax({
        url: "http://mmb.ittun.com/api/getbrandtitle",
        dataType: 'json',
        success:function(data){
            console.log(data);
            var html = template("cat_menu", data);
            $("#accordion").html(html);

        //    µã»÷
            $('#accordion a').on('click', function () {
                var index = $('#accordion .panel-title a').index(this);
                var brandTitle = data.result[index].brandTitle;
                localStorage.setItem("brandTitle",brandTitle)
            })
            $("#accordion span").click(function(){
                console.log(this);
                $(this).prev().click();
            })
        }
    })
})