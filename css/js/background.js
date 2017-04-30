var canvas=document.createElement('canvas');
var context=canvas.getContext('2d');
var target = document.getElementsByClassName('page-content')[0];

var lineWidth = 60,height=1000,width=1920,txtArr;
var maxWord;
var MARGIN_TOP = 20;
var config = [{
	txt : "云想衣裳花想容春风拂槛露华浓\n\
若非群玉山头见会向瑶台月下逢\n\
一枝红艳露凝香云雨巫山枉断肠\n\
借问汉宫谁得似可怜飞燕倚新妆\n\
名花倾国两相欢长得君王带笑看\n\
解释春风无限恨沉香亭北倚阑干\n",
	url : "http://haiwera.oss-cn-shanghai.aliyuncs.com/assets/mp3/qingpingdiao.mp3"
},{
	txt : "红藕香残玉簟秋\n\
轻解罗裳独上兰舟\n\
云中谁寄锦书来雁字回时月满西楼\n\
花自飘零水自流\n\
一种相思两处闲愁\n\
此情无计可消除才下眉头却上心头\n",
	url : "http://haiwera.oss-cn-shanghai.aliyuncs.com/assets/mp3/yuemanxilou.mp3"
},{
	txt : "采薇采薇 薇亦作止\n\
曰归曰归 岁亦莫止\n\
靡室靡家 玁狁之故\n\
不遑启居 玁狁之故\n\
采薇采薇 薇亦柔止\n\
曰归曰归 心亦忧止\n\
忧心烈烈 载饥载渴\n\
我戍未定 靡使归聘\n\
采薇采薇 薇亦刚止\n\
曰归曰归 岁亦阳止\n\
王事靡盬 不遑启处\n\
忧心孔疚 我行不来\n\
彼尔维何 维常之华\n\
彼路斯何 君子之车\n\
戎车既驾 四牡业业\n\
岂敢定居 一月三捷\n\
驾彼四牡 四牡骙骙\n\
君子所依 小人所腓\n\
四牡翼翼 象弭鱼服\n\
岂不日戒 玁狁孔棘\n\
昔我往矣 杨柳依依\n\
今我来思 雨雪霏霏\n\
行道迟迟 载渴载饥\n\
我心伤悲 莫知我哀",
	url : "http://haiwera.oss-cn-shanghai.aliyuncs.com/assets/mp3/caiwei.mp3"
},{

	txt : "经始灵台，经之营之\n\
庶民攻之，不日成之\n\
经始勿亟，庶民子来\n\
王在灵囿麀鹿攸伏\n\
麀鹿濯濯白鸟翯翯\n\
王在灵沼于牣鱼跃\n\
虡业维枞贲鼓维镛\n\
于论鼓钟于乐辟雍\n\
于论鼓钟于乐辟雍\n\
鼍鼓逢逢\n\
矇瞍奏公",
	url : "http://haiwera.oss-cn-shanghai.aliyuncs.com/assets/mp3/lingtai.mp3",
},{
	txt : "呦呦鹿鸣食野之苹\n\
我有嘉宾鼓瑟吹笙\n\
吹笙鼓簧承筐是将\n\
人之好我示我周行\n\
呦呦鹿鸣食野之蒿\n\
我有嘉宾德音孔昭\n\
视民不恌君子是则是效\n\
我有旨酒嘉宾式燕以敖\n\
呦呦鹿鸣食野之芩\n\
我有嘉宾鼓瑟鼓琴\n\
鼓瑟鼓琴和乐且湛\n\
我有旨酒以燕乐嘉宾之心\n",
	url :"http://haiwera.oss-cn-shanghai.aliyuncs.com/assets/mp3/luming.mp3"
},{
	txt : "花褪残红青杏小\n\
燕子飞时 绿水人家绕\n\
枝上柳绵吹又少\n\
天涯何处无芳草\n\
墙里秋千墙外道\n\
墙外行人 墙里佳人笑\n\
笑渐不闻声渐悄\n\
多情却被无情恼\n",
	url : "http://haiwera.oss-cn-shanghai.aliyuncs.com/assets/mp3/dielianhua.mp3"
},{
	txt : "花谢花飞花满天红消香断有谁怜\n\
游丝软系飘春榭落絮轻沾扑绣帘\n\
闺中女儿惜春暮愁绪满怀无释处\n\
手把花锄出绣帘忍踏落花来复去\n\
柳丝榆荚自芳菲不管桃飘与李飞\n\
桃李明年能再发明年闺中知有谁\n\
三月香巢已垒成梁间燕子太无情\n\
明年花发虽可啄却不道人去梁空巢也倾\n\
一年三百六十日风刀霜剑严相逼\n\
明媚鲜妍能几时一朝漂泊难寻觅\n\
花开易见落难寻阶前愁杀葬花人\n\
独倚花锄泪暗洒洒上空枝见血痕\n\
杜鹃无语正黄昏荷锄归去掩重门\n\
青灯照壁人初睡冷雨敲窗被未温\n\
怪奴底事倍伤神半为怜春半恼春\n\
怜春忽至恼忽去至又无言去未闻\n\
昨宵庭外悲歌发知是花魂与鸟魂\n\
花魂鸟魂总难留鸟自无言花自羞\n\
愿侬此日生双翼随花飞到天尽头\n\
天尽头何处有香丘",
	url : "http://haiwera.oss-cn-shanghai.aliyuncs.com/assets/mp3/zanghuayin.mp3"
},{
	txt : "青青子衿 悠悠我心\n\
纵我不往 子宁不嗣音\n\
青青子佩 悠悠我思\n\
纵我不往 子宁不来\n\
挑兮达兮 在城阙兮\n\
一日不见 如三月兮",
	url : "http://haiwera.oss-cn-shanghai.aliyuncs.com/assets/mp3/zijin.mp3"
}

];

var bgShi = function(config){
	
	this.txtArr = config.txt.split("\n");
}

function drawGrid(){

	context.strokeStyle = "rgba(0,0,0,0.1)";
	for(var i = width - lineWidth;i > 0; i -= lineWidth){
		context.beginPath();
		context.moveTo(i + 0.5,MARGIN_TOP);
		context.lineTo(i + 0.5,height);
		context.stroke();
	}	

}

bgShi.prototype.draw = function(){

	var fontHeight = 50;
	context.fillStyle = "rgba(0,0,0,0.2)";
	context.font = "30px STXingkai";
	for(var x = 0;x < width / lineWidth;x ++)
	{
		i = x % this.txtArr.length;
		console.log(this.txtArr[i]);
	//	MARGIN_TOP = (height - this.txtArr[i].length * fontHeight) / 2;
		for(var j = 0;j < this.txtArr[i].length;j ++){
			if(this.txtArr[i].charAt(j) != "\t" && this.txtArr[i].charAt(j) != "\r"){
				
				context.fillText(this.txtArr[i].charAt(j),width - lineWidth - x * lineWidth + 15,(j + 1) * fontHeight + MARGIN_TOP);
			}
		}
	}


}

window.onload = function(){
	var audio = document.getElementsByTagName('audio')[0];
	var target = document.getElementsByClassName('page-content')[0];
	var index = Math.round(Math.random() * config.length);
	console.log(index);
	width = target.offsetWidth || target.width;
   	height = target.offsetHeight || target.height;
	shi = new bgShi(config[index]);
	audio.src = config[index].url;
	context.globalAlpha = 0.2;
	canvas.height = height;
	canvas.width = width;
	drawGrid();
	shi.draw();

	target.style.background = "url(" + canvas.toDataURL() + ")";
	audio.volume = 0.2;
	audio.play();

}
