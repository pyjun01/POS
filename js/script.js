const tb= document.getElementById("time_box");//clock
let code;//clock
let t=new Date();//clock
let before=t.getMinutes();//clock
function Clock() {
  GetTime();
  setInterval(()=>{
    t=new Date();
    if(before!=t.getMinutes()){
    	GetTime();
  		before= t.getMinutes();
    }
  },2000);
}
function GetTime() {
  code= "";
  code+= t.getHours()==12? 12+":": (10 > (t.getHours()+12)%12 ? "0" : "") + (t.getHours()+12)%12 + ":";
  code+= (10 > t.getMinutes() ? "0" : "") + t.getMinutes() + " ";
  code+= t.getHours() >= 12 ? "pm" : "am";
  tb.textContent= code;
}
Clock();

let parent;//general
let z=1;//modal_zIndex
let press=false;//modal_move
let x=0;//modal_move
let y=0;//modal_move
let resize=false;//modal_resize
let resizelr=0;//modal_resize
let resizetb=0;//modal_resize
let tg;//modal_resize
const already= [true, true, true, true, true, true, true];//modal_open
const name= ["project", "duty", "memo", "github", "mine", "ttt", "card"];//modal_close
function modal_zIndex() {
  document.addEventListener("mousedown",(e) =>{
    parent=e.target.parentNode;
    if(e.target.classList[0]=="modal_main")parent.style.zIndex=++z;
  });
}
function modal_move() {
  document.addEventListener("mousedown",(e) =>{
    if(e.target.classList[0]=="modal_head"){
      parent=e.target.parentNode;
      parent.style.zIndex= ++z;
      press=true;
      x=e.offsetX;
      y=e.offsetY;
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
}
function modal_resize() {
  document.addEventListener("mousedown",(e) =>{
    parent=e.target.parentNode;
    if(e.target.classList[1]=="resize"){
      tg=e.target;
      resizelr= e.pageX;
      resizetb= e.pageY;
      resize= true;
    }
  });
  document.addEventListener("mousemove",(e) =>{
    if(resize)
      arrow_resize(tg,e,resizelr,resizetb);
  });
  document.addEventListener("mouseup",() =>{press=false;resize=false;});
}
  function arrow_resize(tg,eve,lr,tb) {
    let get_width=parseInt(document.defaultView.getComputedStyle(parent,null).getPropertyValue('width'));
    let get_height=parseInt(document.defaultView.getComputedStyle(parent,null).getPropertyValue('height'));
    switch (tg.classList[0]) {
      case "lr-resize":
        if(eve.pageX<tg.parentNode.offsetLeft+250)
          return resizelr=(tg.parentNode.offsetLeft+250),parent.style.width="250px";
        styleset(lr,eve.pageX,get_width,true);
        break;
      case "tb-resize":
        if(eve.pageY<tg.parentNode.offsetTop+45)
          return resizetb=(tg.parentNode.offsetTop+45),parent.style.height="45px";
        styleset(tb,eve.pageY,get_height,false);
        break;
      case "slash-resize":
        if(eve.pageX<tg.parentNode.offsetLeft+250 || eve.pageY<tg.parentNode.offsetTop+45){
          if(eve.pageY<tg.parentNode.offsetTop+45)
            return resizetb=(tg.parentNode.offsetTop+45),parent.style.height="45px";
          if(eve.pageX<tg.parentNode.offsetLeft+250)
            return resizelr=(tg.parentNode.offsetLeft+250),parent.style.width="250px";
        }
        styleset(lr,eve.pageX,get_width,true);
        styleset(tb,eve.pageY,get_height,false);
        break;
    }
    return resizetb=eve.pageY,resizelr=eve.pageX;
  }
  function styleset(lt,ep,w,tf) {
    tf
    ? lt>ep
      ? parent.style.width= (w-(lt-ep))+"px"
      : parent.style.width= (w+(ep-lt))+"px"
    : lt>ep
      ? parent.style.height= (w-(lt-ep))+"px"
      : parent.style.height= (w+(ep-lt))+"px";;
  }
function modal_open() {
  let modal=document.getElementsByClassName("modal");
  for (var i = 0; i < modal.length; i++) {
    let n=i;
    modal[i].addEventListener('click',function () {
      if(already[n]){
        let name=this.getAttribute('href').split("#")[1];
        let z = document.createElement('div');
        z.classList.add("modal_pop");z.id=name;
        z.innerHTML = `
        <div class="modal_head">
          ${name}
          <span class="modal_close ${name}">X
          </span>
        </div>
        <div class="lr-resize resize"></div>
        <div class="modal_main">
        </div>
        <div class="tb-resize resize"></div>
        <div class="slash-resize resize"></div>`;
        let main=document.getElementsByTagName('main')[0];
        main.appendChild(z);
        already[n]=false;
      }
    }, false);
  }
}
function modal_close() {
  document.addEventListener("click",(e) =>{
    if(e.target.classList[0]=="modal_close"){
      let target_parent=e.target.classList[1];
      let main= document.getElementsByTagName("main")[0];
      let num= name.findIndex((ele) =>{
        return ele==target_parent;
      });
      already[num]=true;
      main.removeChild(document.getElementById(target_parent));
    }
  });
}
modal_zIndex();
modal_move();
modal_resize();
modal_open();
modal_close();
