let mm = document.querySelectorAll("a[href='#memo']");
var d;
mm[0].addEventListener("click",function(){
    $.ajax({
        url: "./mm.php",
        type: "get",
        data: {

        },
        dataType: "json",
        success: function(data){
            console.log(data);
            console.log(data.length);
            for(i=0;i<data.length;i++){
                document.querySelector("#memo>.modal_main").innerHTML+=`<p>${data[i][0]},${data[i][1]}</p>`;
            }
        }
    });
});