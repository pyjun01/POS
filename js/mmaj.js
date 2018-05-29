var dddd;
$.ajax({
    url: "./mm.php",
    type: "get",
    data: {

    },
    dataType: "json",
    success: function(data){
        console.log(data);
        dddd=data;
    }
});
