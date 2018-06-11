//mousedown
            // mine_space[i].addEventListener("mousedown",function(e){
            //     ry=this.getAttribute("data-y");
            //     rx=this.getAttribute("data-x");
            //     if(e.button==0){
            //         left=true;
            //     }
            //     if(e.button==2){
            //         if(left&&right[rx][ry]!=1){
            //             for(var i=0;i<x;i++){
            //                 if(already_click[i].indexOf(1)!= -1){
            //                     no(rx,ry);
            //                     return false;
            //                 }
            //             }
            //         }else{
            //             if(!already_click[rx][ry]){
            //                 if(right[rx][ry]==0){
            //                     right[rx][ry]=1;
            //                     this.style.border='2px solid #000';
            //                     this.style.background='rgb(10, 39, 69)';
            //                 }else{
            //                     right[rx][ry]=0;
            //                     this.style.border='1px solid #fff';
            //                     this.style.background='rgb(45, 136, 231)';
            //                 }
            //             }
            //         }
            //     }
            // });
            // mine_space[i].addEventListener("mouseup",(e) =>{
            //     for (var i = 0; i < x; i++) {
            //         for (var j = 0; j < y; j++){
            //           if(right[i][j]==1){
            //             over_stack++;
            //           }else if(already_click[i][j]===1){
            //             over_stack++;
            //           }
            //         }
            //       }
            //       if(over_stack==x*y){
            //         endtime= new Date().getTime();
            //         // $('body').prepend(`${(endtime - starttime)/1000}초. 클리어`);
            //       }else{
            //         over_stack=0;
            //       }
            //       if(e.button==0)left=false;
            // });

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
  mine_x=x1;
  mine_y=y1;
  len=makearray(x1);
  right=makearray(x1);
  already_click=makearray(x1);
  code=`<ul id="plate">`;
  for (var i = 0; i < x1; i++) {
    code+=`<li class='b'>`;
    for (var j = 0; j < y1; j++) {
      if(j==0)
      code+=` <ul>`;
      code+=`   <li class='c' data-x='${i}' data-y='${j}'></li>`;
      if(j==y1-1)
      code+=` </ul>`;
    }
    code+=`</li>`;
  }
  code+=`</ul>`;
  //code
  let form_delete= document.querySelector("#mine>.modal_main>#form");
  form_delete.parentNode.removeChild(form_delete);
  document.querySelector('#mine>.modal_main').innerHTML= code;

  for(var i=0;i<x1;i++){
      document.querySelectorAll('.b')[i].style.height= `calc( 100% / ${x1})`;
      for(var j=0;j<y1;j++){
          document.querySelectorAll('.c')[(i*y1)+j].style.width= `calc( 100% / ${y1})`;
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
        <input type="radio" value="3" name="cho" id="b3"><label for='b3'>30*16 // 지뢰=99</label>
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
                cx=this.getAttribute("data-x");
                cy=this.getAttribute("data-y");
                console.log(`x: ${cx}, y: ${cy}`);
                console.log(len[cx][cy] +` true=지뢰 `);
                console.log(right[cx][cy]);
                console.log(already_click[cx][cy]);
               if(first){//처음
                   first=false;//다음클릭부터는 처음이 아님
                   mine_make(cx,cy);//지뢰 생성
                   starttime=new Date().getTime();
               }
               if(right[cx][cy]==0){//클릭한곳에 지뢰표시가 안돼있으면
                   already_click[cx][cy]=1;//클릭한곳위치 already_click==1
                   click(cx,cy,this);//클릭
                   this.style.background= '#f7f7f7';
               }
            });
            
        }
    });
});
//firstclick
function mine_make(n, n2) { //x, y
    switch (mine_y) {
    case 9:
        mine_length=10;
        break;
    case 16:
        mine_length=40;
        break;
    case 30:
        mine_length=99;
        break;
    default:
    }
    console.log(`지뢰개수: ${mine_length}`);
    for (i = 0; i < mine_length; i++) { //지뢰개수만큼 for문을 돌림
        makemine(n,n2,i);
    }
}
function makemine(mmx, mmy,i) {//지뢰인곳에 len=true
    mx = Math.floor(Math.random() * (mine_x)); //랜덤좌표
    my = Math.floor(Math.random() * (mine_y)); //랜덤좌표
    if(where(mx,my,mmx,mmy)){//클릭한곳 주위면 다시 제귀
        makemine(mmx,mmy,i);
    }else{
        if(len[mx][my]===true){//클릭한곳 주위면 다시 제귀
            makemine(mmx, mmy,i);
        }else{//클릭한곳 주위아니면
            return len[mx][my]=true,number(mx,my);
        }
    }
}
function where(wx,wy,cwx,cwy) {//클릭한곳주위인지체크
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
        }
        break;
    default:
        return false;
    }
}
function number(nx,ny) {//len에서 지뢰 주위에 ++해줌
    for(var q= -1;q<= 1;q++){
        for(var w= -1;w<= 1;w++){
            if(nx-q>=0&&nx-q<mine_x){
                if(ny-w>=0&&ny-w<mine_y){
                    if(len[nx-q][ny-w]!==true){
                        len[nx-q][ny-w]++;
                    }
                }
            }
        }
    }
}
//클릭
function click(clx,cly,cli) {
    switch (len[clx][cly]) {
        case false:
            break;
        case 0://주위에 지뢰없으면
            console.log("주위클릭해야됨");
            len[clx][cly]=false;//그곳은 false됨
            no(clx,cly);//주위 클릭
            break;
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
            cli.innerText= len[clx][cly];//클릭한곳에 주위 지뢰개수만큼 숫자넣음
            break;
        case true://지뢰임
            cli.style.background= 'black';
            if(!over){
                endtime= new Date().getTime();
                over=true;
                right=0;
                document.querySelector(".c").click();
            }
            break;
        default:
            break;
    }
}
//mousedown
function no(nx,ny) {
    nx *= 1;
    ny *= 1;
    for(var i= -1;i<=1;i++){
        for(var j= -1;j<=1;j++){
            if(nx+i>=0&&nx+i<mine_x){
                if(ny+j>=0&&ny+j<mine_y){
                    if(i!=0||j!=0){
                        $('#plate>li').eq(nx+i).find('li').eq(ny+j).click();   
                    }
                }
            }
        }
    }
}


