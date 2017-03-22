/**
 * Created by Administrator on 2017/3/20.
 */
$(function(){
    $.ajax({
        url:"http://mmb.ittun.com/api/getsitenav",
        dataType:"json",
        success:function(data){
            console.log(data);
            var html=template("links",data);
            $(".cont").html(html);
        }

    })
})