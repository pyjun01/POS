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
