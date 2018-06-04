let mm = document.querySelectorAll("a[href='#memo']");
mm[0].addEventListener("click",function(){
    $.ajax({
        url: "./mm.php",
        type: "get",
        dataType: "json",
        success: function(data){
            if(document.querySelector("#memo>.modal_main")!=null && document.querySelector("#memo>.modal_main").innerHTML == ""){
                for(i=0;i<data.length;i++){document.querySelector("#memo>.modal_main").innerHTML+=`<a class="memo_link" href="#content">${data[i][0]}. ${data[i][1]}</a>`;}//for
                for(i=0;i<data.length;i++){
                    let send_data=data[i][0];
                    let tg=document.querySelectorAll("#memo>.modal_main>a")[i];
                    tg.addEventListener("click",function () {
                        $.ajax({
                            type : "POST",
                            url : "/get_content.php",
                            data : {num: send_data},
                            dataType: 'text',
                            success: function(data){
                              console.log(data);
                            }//success
                        });//ajax
                    });//addEventListener
                }//for
            }//if
        }//success
    });//ajax
}, false);
