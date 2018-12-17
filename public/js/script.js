(function (){
    var app= new App();
    var time= new Clock();

    function Clock (){
        this.box;
        this.code= "";
        this.before=0;
        this.t= new Date();
        this.GetTime= function (){
            this.code= "";
            this.code+= this.t.getHours()==12? 12+":": (10 > (this.t.getHours()+12)%12 ? "0" : "") + (this.t.getHours()+12)%12 + ":";
            this.code+= (10 > this.t.getMinutes() ? "0" : "") + this.t.getMinutes() + " ";
            this.code+= this.t.getHours() >= 12 ? "pm" : "am";
            if(this.box!=undefined)
            this.box.innerText= this.code;
        }
        this.init= function (){
            this.box= document.getElementById("time_box");
            var self= this;
            this.GetTime();
            setInterval(function (){
                self.t= new Date();
                if(self.before!=self.t.getMinutes()){
                    self.GetTime();
                    self.before= self.t.getMinutes();
                }
            }, 4000);
        }
    }
    function App (){
        this.z= 0;
        this.parent="";
        this.press= false;
        this.x= 0;
        this.y= 0;

        this.tg= "";
        this.lr= 0;
        this.tb= 0;
        this.resize= false;
        this.tabs= [];

        this.styleset= function (lt,e,w,tf){
            tf
            ? lt>e? this.parent.style.width= (w-(lt-e))+"px": this.parent.style.width= (w+(e-lt))+"px"
            : lt>e? this.parent.style.height= (w-(lt-e))+"px": this.parent.style.height= (w+(e-lt))+"px";;
        }
        this.arrow_resize= function (tg, e, lr, tb){
            var get_width=parseInt(document.defaultView.getComputedStyle(this.parent,null).getPropertyValue('width'));
            var get_height=parseInt(document.defaultView.getComputedStyle(this.parent,null).getPropertyValue('height'));
            var c= tg.className.split(" ")[0];
            switch (c) {
                case "lr-resize":
                    if(e.pageX<tg.parentNode.offsetLeft+250)
                        return this.lr=(tg.parentNode.offsetLeft+250), this.parent.style.width="250px";
                    this.styleset(this.lr, e.pageX, get_width, true);
                    break;
                case "tb-resize":
                    if(e.pageY<tg.parentNode.offsetTop+45)
                        return this.tb=(tg.parentNode.offsetTop+45), this.parent.style.height="45px";
                    this.styleset(this.tb, e.pageY, get_height, false);
                break;
                case "slash-resize":
                    if(e.pageX<tg.parentNode.offsetLeft+250 || e.pageY<tg.parentNode.offsetTop+45){
                        if(e.pageY<tg.parentNode.offsetTop+45)
                            return this.tb=(tg.parentNode.offsetTop+45), this.parent.style.height="45px";
                        if(e.pageX<tg.parentNode.offsetLeft+250)
                            return this.lr=(tg.parentNode.offsetLeft+250), this.parent.style.width="250px";
                    }
                    this.styleset(this.lr, e.pageX, get_width, true);
                    this.styleset(this.tb, e.pageY, get_height, false);
                break;
            }
            return this.tb=e.pageY,this.lr=e.pageX;
        }
        this.init= function (){
            time.init();
            for(var i=0, modal= document.getElementsByClassName('modal'); i<modal.length; i++)
                this.tabs.push([false, modal[i].getAttribute("href").substring(1, modal[i].length)]);
            this.ev();
        }
        this.ev= function (){
            window.oncontextmenu= function (e){e.preventDefault();}
            var self= this;
            document.addEventListener("mousedown", function (e){ // mousedown
                var c= e.target.className.split(" ");
                if(c[0].indexOf("modal_")==0 && self.parent != e.target.parentNode){
                    self.parent= e.target.parentNode;
                    self.parent.style.zIndex= ++self.z;
                }
                if(c[0]=="modal_head"){
                    self.press= true;
                    self.x= e.offsetX;
                    self.y= e.offsetY;
                }
                if(c[1]=="resize"){
                    self.tg= e.target;
                    self.lr= e.pageX;
                    self.tb= e.pageY;
                    self.resize= true;
                }
            });
            document.addEventListener("mousemove", function (e){ // mousemove
                if(self.press){
                    var l= e.pageX;
                    var t= e.pageY;
                    self.parent.style.left= (l-self.x)+'px';
                    self.parent.style.top= (t-self.y)+'px';
                }
                if(self.resize)
                    self.arrow_resize(self.tg, e, self.lr, self.tb);
            });
            document.addEventListener("mouseup", function (){ // mouseup
                self.press=false;
                self.resize=false;
            });
            document.addEventListener("click", function (e){ // close tab
                if(e.target.classList[0]=="modal_close"){
                    var n= e.target.id[2];
                    self.tabs[n][0]= false;
                    var main= document.getElementsByTagName("main")[0];
                    main.removeChild(document.getElementsByClassName("t_"+n)[0]);
                }
            });

            var modal=document.getElementsByClassName("modal");
            function add(n){
                modal[n].ondragstart= function (e){
                    e.preventDefault();
                }
                modal[n].addEventListener('click', function (){
                    if(self.tabs[n][0] == false){
                        var tab = document.createElement('div');
                        tab.className= "modal_pop t_"+n;
                        tab.id= self.tabs[n][1];
                        tab.style.zIndex= ++self.z;
                        tab.innerHTML = '<div class="modal_head"><span class="modal_close" id="c_'+n+'">X</span></div><div class="lr-resize resize"></div><div class="modal_main"></div><div class="tb-resize resize"></div><div class="slash-resize resize"></div>';
                        var main=document.getElementsByTagName('main')[0];
                        main.prepend(tab);
                        self.tabs[n][0]= true;
                    }
                }, false);
            }
            for (var i = 0; i < modal.length; i++)
                add(i);
        }
    }        
    window.onload= function (){
        app.init();
    }
})()