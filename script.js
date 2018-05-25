let t=new Date();
let code = "";
let before=t.getMinutes();
let tb= document.getElementById("time_box");
code+= (10 > (t.getHours()+12)%12 ? "0" : "") + (t.getHours()+12)%12 + ":";
code+= (10 > t.getMinutes() ? "0" : "") + t.getMinutes() + " ";
code+= t.getHours() >= 12 ? "pm" : "am";
tb.textContent= code;
setInterval(()=>{
  t=new Date();
  if(before!=t.getMinutes()){
  	code= "";
  	code+= (10 > (t.getHours()+12)%12 ? "0" : "") + (t.getHours()+12)%12 + ":";
  	code+= (10 > t.getMinutes() ? "0" : "") + t.getMinutes() + " ";
  	code+= t.getHours() >= 12 ? "pm" : "am";
  	tb.textContent= code;
		before= t.getMinutes();
  }
},2000);
let already= [true, true, true, true, true, true, true];
let press=false;
let x=0;
let y=0;
let parent;
let z=1;
document.addEventListener("mousedown",(e) =>{
  if(e.target && e.target.classList[0]== 'modal_head'){
    parent=e.target.parentNode;
    parent.style.zIndex= ++z;
    press=true;
    x=e.offsetX;
    y=e.offsetY;
  }else if(e.target && e.target.classList[0]== 'modal_pop'){
    e.target.style.zIndex= ++z;
  }
});
document.addEventListener("mousemove",(e) =>{
  if(press){
    let l =e.pageX;
    let t =e.pageY;
    parent.style.left= (l-x)+'px';
    parent.style.top= (t-y)+'px';
  }
});
document.addEventListener("mouseup",() =>{press=false;});

let modal=document.getElementsByClassName("modal");
for (var i = 0; i < modal.length; i++) {
  modal[i].addEventListener('click',function () {
    if(already[$(this).index()]){
      let name=$(this).attr('href').split("#")[1];
      let modal = `
      <div class="modal_pop" id="${name}">
        <div class="modal_head">
          ${name}
        </div>
        <div class="modal_main">
        </div>
      </div>`;
      $('main').append(modal);
      already[$(this).index()]=false;
    }
  }, false);
}
