let mine_length;// 지뢰개수
let mx;
let my;
let first=true;// 처음인지 아닌지
let cx;// 클릭한 x좌표
let cy;// 클릭한 x좌표
let rx;// 우클릭 x
let ry;// 우클릭 y
let over=false;// 끝나면
let over_stack=0;// clear 지뢰표시 스택
let starttime;
let endtime;
let left=false;
//inner game

//make board
let len;// 지뢰는 true 지뢰주위는 숫자++
let right;// 우클릭 배열
let already_click;// already_click에서 클릭한곳은 1 클릭 안한곳은 0
//let code='';// html추가하는 코드
let bool;// 몇번째 난이도인지
let b;// 인풋
let mine_x;// 길이
let mine_y;// 길이
function makeplate(b) {// 난이도를 받아와서 크기생성함
  switch (b) {
    case 0:
      pluscode(9,9);
    break;
    case 1:
      pluscode(16,16);
    break;
    case 2:
      pluscode(16,30);
    break;
    default:
    alert('선택해주세요');
    return false;
  }
}
function pluscode(x1,y1) {//생성하고 li크기조정
  mine_x=y1;//30
  mine_y=x1;//16
  len=makearray(mine_y);
  right=makearray(mine_y);
  already_click=makearray(mine_y);
  code=`<ul id="plate" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">`;
  for (var i = 0; i < mine_y; i++) {
    code+=`<li class='b'>`;
    for (var j = 0; j < mine_x; j++) {
      if(j==0)
      code+=` <ul>`;
      code+=`   <li class='c' data-y='${i}' data-x='${j}'></li>`;
      if(j==mine_x-1)
      code+=` </ul>`;
    }
    code+=`</li>`;
  }
  code+=`</ul>`;
  //code
  let form_delete= document.querySelector("#mine>.modal_main>#form");
  form_delete.parentNode.removeChild(form_delete);
  document.querySelector('#mine>.modal_main').innerHTML= code;
  for(var i=0;i<mine_y;i++){//16
      document.querySelectorAll('.b')[i].style.height= `calc( 100% / ${mine_y})`;
      for(var j=0;j<mine_x;j++){//16
          document.querySelectorAll('.c')[(i*mine_x)+j].style.width= `calc( 100% / ${mine_x})`;
      }
  }
}
function makearray(row) {// 배열생성
  var array = [];
  for (var i=0;i<row;i++) {
    array[i]= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  }
  return array;
}
//make board

let tm = document.querySelectorAll("a[href='#mine']")[0];
let mine_start_btn;
tm.addEventListener("click",() => {//mine_btn click
mine_length=0;// 지뢰개수
mx=0;
my=0;
first=true;// 처음인지 아닌지
cx=0;// 클릭한 x좌표
cy=0;// 클릭한 x좌표
rx=0;// 우클릭 x
ry=0;// 우클릭 y
over=false;// 끝나면
over_stack=0;// clear 지뢰표시 스택
starttime=0;
endtime=0;
left=false;
len=0;// 지뢰는 true 지뢰주위는 숫자++
right=0;// 우클릭 배열
already_click=0;// already_click에서 클릭한곳은 1 클릭 안한곳은 0
bool=0;// 몇번째 난이도인지
b=0;// 인풋
mine_x=0;// 길이
mine_y=0;// 길이
    
let mine_tab=document.querySelector("#mine>.modal_main");//main_tab
let mine_code=`
<div id="form">
    <div class="input_wrap">
        <input type="radio" value="1" name="cho" id="b1" checked><label for='b1'>9*9 // 지뢰= 10</label>
    </div>
    <div class="input_wrap">
        <input type="radio" value="2" name="cho" id="b2"><label for='b2'>16*16 // 지뢰= 40</label>
    </div>
    <div class="input_wrap">
        <input type="radio" value="3" name="cho" id="b3"><label for='b3'>30*16 // 지뢰=80</label>
    </div>

    <div class="rel">
        <button id="btn">시작</button>
    </div>
</div>
`;
    mine_tab.innerHTML= mine_code;//main_tab.inner form
    mine_start_btn=document.querySelector("#mine>.modal_main>#form #btn");//start btn
    mine_start_btn.addEventListener("click",function() {//start_btn.click();
        for(var i=0;i<=2;i++){//get num
            b=document.getElementById(`b${i+1}`);
            if(b.checked)
                bool=i;
        }
        makeplate(bool);//make board
        
        let mine_space=document.querySelectorAll(".c");//지뢰 한칸한칸
        for(var i=0;i<mine_space.length;i++){
            //click
            mine_space[i].addEventListener("click",function(){
                cx=this.getAttribute("data-x");//29
                cy=this.getAttribute("data-y");//0
//                console.log(`click= ${cx},${cy}`);
               if(first){//처음
                   first=false;//다음클릭부터는 처음이 아님
                   mine_make(cx,cy);//지뢰 생성29,0
                   starttime=new Date().getTime();
               }
               if(right[cy][cx]==0){//클릭한곳에 지뢰표시가 안돼있으면
                   already_click[cy][cx]=1;//클릭한곳위치 already_click==1
                   click(cx,cy,this);//클릭29,0
                   this.style.background= '#f7f7f7';
               }
            });
            //mousedown
             mine_space[i].addEventListener("mousedown",function(e){
                 rx=this.getAttribute("data-x");
                 ry=this.getAttribute("data-y");
                 if(e.button==0){
                     left=true;
                 }
                 if(e.button==2){
                     if(left&&right[ry][rx] != 1){//좌클릭후 우클릭일
                         for(var i=0;i<x;i++){
                             if(already_click[i].indexOf(1)!= -1){
                                 no(rx,ry);
                                 return false;
                             }
                         }
                     }else{
                         if(already_click[ry][rx]==0){//지뢰표시,지뢰표시제거
                             if(right[ry][rx]==0){
                                 right[ry][rx]=1;
                                 this.style.border='2px solid #000';
                                 this.style.background='rgb(10, 39, 69)';
                             }else{
                                 right[ry][rx]=0;
                                 this.style.border='1px solid #000';
                                 this.style.background='#419de0';
                             }
                         }
                     }
                 }
             });
             mine_space[i].addEventListener("mouseup",(e) =>{
                if(e.button==0)
                left=false;
                for (var i = 0; i < x; mine_i++) {
                    for (var j = 0; j < mine_y; j++){
                        if(right[i][j]==1){
                            over_stack++;
                        }else if(already_click[i][j]===1){
                            over_stack++;
                        }
                    }
                }
                if(over_stack==mine_x*mine_y){
                    endtime= new Date().getTime();
                    alert(`${(endtime - starttime)/1000}초. 클리어`);
                }else{
                    over_stack=0;
                }
             });
        }
    });
});
//firstclick
function mine_make(n, n2) { //29, 0
    switch (mine_x) {//30
    case 9:
        mine_length=10;
        break;
    case 16:
        mine_length=40;
        break;
    case 30:
        mine_length=80;
        break;
    default:
    }
    for (i = 0; i < mine_length; i++) { //지뢰개수만큼 for문을 돌림
        makemine(n,n2,i);//29,0,i
    }
}
function makemine(mmx, mmy,i) {//29, 0, i
    mx = Math.floor(Math.random() * (mine_x)); //랜덤좌표 상하 길이 mine_x=30 0~29
    my = Math.floor(Math.random() * (mine_y)); //랜덤좌표 좌우 길이 mine_y=16 0~15
//    console.log(`${my},${mx}`);
    if(where(mx,my, mmx,mmy)){//0~29, 0~15, 29, 0
        makemine(mmx,mmy,i);//29, 0, i
    }else{
        if(len[my][mx]==true){
            makemine(mmx, mmy,i);// Maximum
        }else{
            return len[my][mx]=true,number(mx,my);
        }
    }
}
function where(wx,wy,cwx,cwy) {//0~29, 0~15, 29, 0 Maximum
    switch (cwx-wx) {
    case -1:
    case 0:
    case 1:
        switch (cwy-wy) {
        case -1:
        case 0:
        case 1:
            return true;
        default:
            return false;
        }
        break;
    default:
        return false;
    }
}
function number(nx,ny) {//x,y 0~29, 0~15
    for(var q= -1;q<= 1;q++){
        for(var w= -1;w<= 1;w++){
            if(nx-q>=0&&nx-q<mine_x){
                if(ny-w>=0&&ny-w<mine_y){
                    if(len[ny-w][nx-q] != true){
                        console.log(`len[${ny-w}][${nx-q}]= ${len[ny-w][nx-q]}`);
                        len[ny-w][nx-q]++;
                        console.log(`len[${ny-w}][${nx-q}]= ${len[ny-w][nx-q]}`);
                    }
                }
            }
        }
    }
}
let ttttt;
//none first
function click(clx,cly,cli) {//29,0
    switch (len[cly][clx]) {//len[0][29]
        case false:
            break;
        case 0://주위에 지뢰없으면
            len[cly][clx]=false;//len[0][29]=false;
            no(clx,cly);//주위 클릭no(29,0);
            break;
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
            cli.innerText= len[cly][clx];//클릭한곳에 주위 지뢰개수만큼 숫자넣음
            break;
        case true://지뢰임
            ttttt=cli;
            ttttt.style.background="black";
//            if(!over){
//                endtime= new Date().getTime();
//                 alert(`${(endtime - starttime)/1000}초. 까비`);
//                over=true;
//                right=0;
//            }
            break;
        default:
            break;
    }
}
//mousedown
function no(nx,ny) {// 29, 0
    nx*= 1;ny*= 1;
    for(var i= -1;i<=1;i++){
        for(var j= -1;j<=1;j++){
            if(nx+i>=0&&nx+i<mine_x){
                if(ny+j>=0&&ny+j<mine_y){
                    if(i!=0||j!=0){
                        if(len[ny+j][nx+i]>=0|| len[ny+j][nx+i]==true)
                            $('#plate>li').eq(ny+j).find('li').eq(nx+i).click();   
                    }
                }
            }
        }
    }
}


