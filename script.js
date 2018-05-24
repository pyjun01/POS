function log(e) {
  console.log(e);
}
let t=new Date();
let code = "";
let before=t.getMinutes();
code+= (10 > (t.getHours()+12)%12 ? "0" : "") + (t.getHours()+12)%12 + ":";
code+= (10 > t.getMinutes() ? "0" : "") + t.getMinutes() + " ";
code+= t.getHours() >= 12 ? "pm" : "am";
$('#time_box').text(code);
setInterval(()=>{
  t=new Date();
  if(before!=t.getMinutes()){
  	code= "";
  	code+= (10 > (t.getHours()+12)%12 ? "0" : "") + (t.getHours()+12)%12 + ":";
  	code+= (10 > t.getMinutes() ? "0" : "") + t.getMinutes() + " ";
  	code+= t.getHours() >= 12 ? "pm" : "am";
  	$('#time_box').text(code);
		before= t.getMinutes();
  }
},2000);
let already= [true, true, true, true, true, true, true];
$('.modal').on('click',function() {
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
    $('main').append(modal).children(".modal_pop").draggable({scroll: false });
    already[$(this).index()]=false;
  }
});
