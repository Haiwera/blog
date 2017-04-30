var canvas=document.createElement('canvas');
var context=canvas.getContext('2d');
var target = document.getElementsByClassName('page-content')[0];

var patternCanvas = document.createElement('canvas');
var patternContext = patternCanvas.getContext('2d');
var lineWidth = 60,height=1000,width=1920,txtArr;
var maxWord,font;
var MARGIN_TOP = 20;
var fontHeight = 50;
var MARGIN_LEFT = 15;

var bgShi = function(config){
	
	this.txtArr = config.txt.split("\n");
}

function drawGrid(){
	context.fillStyle = "rgba(255,255,100,0.1)";
	context.fillRect(0,0,canvas.width,canvas.height);

	context.strokeStyle = "rgba(0,0,0,0.1)";
	for(var i = width - lineWidth;i > 0; i -= lineWidth){
		context.beginPath();
		context.moveTo(i + 0.5,0);
		context.lineTo(i + 0.5,height);
		context.stroke();
	}	

}
function drawPattern(){
	var rnd = Math.round(Math.random() * 50 + 10) 
	patternCanvas.width = 50;
	patternCanvas.height = 50;
	patternContext.fillStyle = "rgba(0,0,0,0.1)";
	patternContext.fillRect(0,0,100,100);
	patternContext.fillStyle = "rgba(255,255,255,1)";
	while(rnd --){
		patternContext.beginPath();
		patternContext.arc(Math.round(Math.random() * patternCanvas.width),Math.round(Math.random() * patternCanvas.height),
			Math.random() * 1 + 1,0,Math.PI * 2);
		patternContext.closePath();
		patternContext.fill();
	}
	
}

bgShi.prototype.draw = function(){

	context.font = font;
	for(var x = 0;x < width / lineWidth;x ++)
	{
		i = x % this.txtArr.length;
	//	MARGIN_TOP = (height - this.txtArr[i].length * fontHeight) / 2;
		for(var j = 0;j < this.txtArr[i].length;j ++){
			if(this.txtArr[i].charAt(j) != "\t" && this.txtArr[i].charAt(j) != "\r"){
				drawPattern();
				context.fillStyle = context.createPattern(patternCanvas,'repeat');
				
				context.fillText(this.txtArr[i].charAt(j),width - lineWidth - x * lineWidth + MARGIN_LEFT,(j + 1) * fontHeight + MARGIN_TOP);
			}
		}
	}


}

window.onload = function(){
	var audio = document.getElementsByTagName('audio')[0];
	var target = document.getElementsByClassName('page-content')[0];
	var index = Math.round(Math.random() * (config.length - 1));
	width = target.offsetWidth || target.width;
	font = "900 30px STXingkai";
	if(width < 800){
		lineWidth = 20;
		fontHeight = 20;
		MARGIN_LEFT = 3;
		font = "bold 14px STXingkai";
	} 
	height = target.offsetHeight || target.height;
	shi = new bgShi(config[index]);
	context.globalAlpha = 0.2;
	canvas.height = height;
	canvas.width = width;
	drawGrid();
	shi.draw();

	target.style.background = "url(" + canvas.toDataURL() + ")";

	if(audio){
		audio.src = config[index].url;
		audio.volume = 0.2;
		audio.play();
	}

}
