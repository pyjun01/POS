$.ajax({
    url: "./mm.php",
    type: "get",
    data: {

    },
    dataType: "text",
    done: function(response){
        console.log(response);
    }
});