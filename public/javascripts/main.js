$(document).ready(function(){

	$("#shortenBtn").click(function(){
        // alert($("#htmlText").val());
        $("#htmlText").attr('readonly','true');
        $("#shortenBtn").addClass('disabled');
        $("#shortenBtn").html('Loading...');

        var POSTData = $("#htmlText").serialize();

        $.ajax({
            type: "POST",
            url: "/",
            data: POSTData,
            success: function(body){
                $("#shortenBtn").html('Shorten');
                $("#shortenBtn").removeClass('disabled');
                $("#htmlText").val(body);
                $("#htmlText").removeAttr('readonly');
            }
        });
    });
});