define([], function(){
	var tools = {};

	tools.animationFrame = function(){
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback){
			setTimeout(callback, 1000 / 60);
		}
	}

	tools.fadeInOut = function(id, time){
		var d = document.getElementById(id);
		d.style.opacity = 0;

		var animFrame = this.animationFrame();
		var i = time / 10;
		var opacity = 1 / i;
		var j = 0;
		var op = 0;

		var runAnim = function(time){
			op = opacity * j;
			if(j < i){
				d.style.opacity = op;
				animFrame(runAnim);
				j++;
			}
		};

		animFrame(runAnim);
	}

	tools.parseTxt = function(line){
		 var keyval;
                var a = line.split('&');
                var o = {};
                //console.log(a);
                for (var l = a.length - 1; l >=0; l--) {
                    keyval = a[l].split('=');
                    if (keyval && keyval.length == 2) {
                        o[keyval[0]] = keyval[1];
                    }
                }
             return o ;
	}
	
	tools.cookie = {
		getsec :function(str){
			
			var str1=str.substring(1,str.length)*1;
			   var str2=str.substring(0,1);
			   if (str2=="s")
			   {
			        return str1*1000;
			   }
			   else if (str2=="h")
			   {
			       return str1*60*60*1000;
			   }
			   else if (str2=="d")
			   {
			       return str1*24*60*60*1000;
			   }
			
		},
		
		setCookie: function(name,value ,time){
			
			var Days = 30;
			var exp = new Date();
			exp.setTime(exp.getTime() + Days*24*60*60*1000);
			document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();

			
			var strsec = this.getsec(time);
			var exp = new Date();
			exp.setTime(exp.getTime() + strsec*1);
			document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
			
		},
		
		getCookie: function(name){
			
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			 
		    if(arr=document.cookie.match(reg))
		 
		        return (arr[2]);
		    else
		        return null;
			
		}
	}
	
	tools.addEvt = function(o, e, fn){
		if(o.addEventListener){
			o.addEventListener(e, fn);
		}else if(o.attachEvent){
			o.attachEvent('on' + e, fn);
		}else{
			return false;
		}
	}

	tools.guidGenerator = function(){
		var s4 = function(){
			return(((1+Math.random())*0x10000)|0).toString(16).substring(1);
		}
		return(s4() + s4() +"-" + s4() +"-" + s4() +"-" + s4() +"-" + s4() +"-" + s4()  + s4()  )
	}

	tools.ajax = function(url, type, data, callback){
		if(window.XMLHttpRequest){
			tools.xmlhttp = window.XMLHttpRequest;
			if(tools.xmlhttp.overrideMimeType){
				tools.xmlhttp.overrideMimeType("text/xml");
			}
		}else if(window.ActiveXObject){
			tools.xmlhttp = window.ActiveXObject("Microsoft.XMLHTTP");
		}

		tools.xmlhttp.onreadystatechange = callback;
		tools.xmlhttp.open(type, url + "?" + data, true);
		Tools.xmlhttp.send(null);
	}

	tools.getPageSize = function(){
		var xScroll, yScroll;
		if (window.innerHeight && window.scrollMaxY) {	
			xScroll = window.innerWidth + window.scrollMaxX;
			yScroll = window.innerHeight + window.scrollMaxY;
		} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
			xScroll = document.body.scrollWidth;
			yScroll = document.body.scrollHeight;
		} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
			xScroll = document.body.offsetWidth;
			yScroll = document.body.offsetHeight;
		}
		var windowWidth, windowHeight;
		if (self.innerHeight) {	// all except Explorer
			if(document.documentElement.clientWidth){
				windowWidth = document.documentElement.clientWidth; 
			} else {
				windowWidth = self.innerWidth;
			}
			windowHeight = self.innerHeight;
		} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
		} else if (document.body) { // other Explorers
			windowWidth = document.body.clientWidth;
			windowHeight = document.body.clientHeight;
		}	
		// for small pages with total height less then height of the viewport
		if(yScroll < windowHeight){
			pageHeight = windowHeight;
		} else { 
			pageHeight = yScroll;
		}
		// for small pages with total width less then width of the viewport
		if(xScroll < windowWidth){	
			pageWidth = xScroll;		
		} else {
			pageWidth = windowWidth;
		}
		arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
		return arrayPageSize;
	}

	return tools;
});