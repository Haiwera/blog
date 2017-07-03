'use strict';

history.time = function(t){


	var dizhi = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

	var tiangan = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];

	var yr = [1,32,29,32,31,32,31,32,32,31,32,31,32];
	var isrn = function(n){
		var absn = Math.abs(n);
		if(absn % 400 == 0){
			return 1;
		}
		if(absn % 100 == 0){
			return 0;
		}
		if(absn % 4 == 0){
			return 1;
		}
		return 0;
		
	}
	// var t2gy = function(t){
		

	// }

	var getR = function(n,y){
		var r = 0;
		if(isrn(n))
		{
			yr[2] = 30;
		}
		for(var i = 0;i < y;i ++){
			r += yr[i];
		}
		yr[2] = 29;
		return r;
	}
	var getY = function(t,n){
		var dec = t;
		if(isrn(n)){
			yr[2] = 30;
		}
		for(var i = 0; t >= 0;i ++)
		{
			t -= yr[i];
		}
		yr[2] = 29;
		return i;

	}
	var gy2t = function(n,y,r,s){
		var absn = Math.abs(n);
		var rs = Math.floor((absn - 1) / 4.0) - Math.floor((absn -1) / 100.0) + Math.floor((absn -1) / 400.0); 
		return (n - 1) * (365 + 13) * 13 + rs * 13 + getR(n,y) * 13 + r * 13 + s;
	}


	var t2gy = function(t){
		var nn,yy,rr,ss;
		var n = Math.floor(t / ((365 + 13) * 13));

		var neartop = gy2t(n,12,31,12);
		var nearbottom = gy2t(n,0,0,0);
		while(t > neartop || t < nearbottom)
		{
			if(t > neartop){
				++n;
				neartop = gy2t(n,12,31,12);
				nearbottom = gy2t(n,0,0,0);
			}else{
				--n;
				neartop = gy2t(n,12,31,12);
				nearbottom = gy2t(n,0,0,0);
			}
		}
		nn = n;
		var left = t - nearbottom;
		rr = Math.floor(left / 13);
		if(isrn(nn)){
			yr[2] = 30;
		}
		for(var i=0;;i ++){
			if(rr - yr[i] < 0 || i > 12)
			{
				if(i  > 12)
				{
					console.log('error');
				}
				break;
			}
			left -= yr[i] * 13;
			rr -= yr[i];
		}
		yr[2] = 29;
		yy = i;
		left -= rr * 13
		ss = left;
		return {n:nn,y:yy,r:rr,s:ss};

	}

//	this.gy2t = gy2t;
//	this.t2gy = t2gy;
//	this.now = now;
//
	this.nps = function(ds = 1)
	{
		return new history.time(this.t + ds);
	}
	this.npr = function(dr = 1)
	{
		return new history.time(this.t + (dr * 13));
	
	}
	this.ny = function(){
		if(this.gy.y > 12){
			throw new Exception('no next month error');
		}
		var gy = this.gy;
		if(gy.y == 12)
		{
			gy.y = 1;
			gy.n ++;
		}else{
			gy.y ++;
		}
		return new history.time(gy);
	}
	this.npy = function(n){
		var x = Math.abs(n);
		var t = this;
		while(n -- ){
			if(n > 0){
				t = t.ny();
			}
			else{
				t = t.py();
			}
		}
		return t;
	}
	this.getrs = function(){
		
		return yr[this.gy.y] - 1;
	}
	this.py = function(){
		if(this.gy.y > 12){
			throw new Exception('no next month error');
		}
		var gy = this.gy;
		if(gy.y == 1)
		{
			gy.y = 12;
			gy.n --;
		}else{
			gy.y --;
		}
		return new history.time(gy);
	
	}
	this.npn = function(dn = 1){
		var nn = this.gy;
		nn.n += dn;
		return new history.time(nn);
	}
	this.toString = function(){
		return this.gy.n + '-' + this.gy.y + '-' + this.gy.r + ' ' + this.gy.s;
	}

	if(t instanceof Object)
	{
		this.t = gy2t(t.n,t.y,t.r,t.s);
		this.gy = {n:t.n,y:t.y,r:t.r,s:t.s};
		// this.gz = gy2gz(this.gy);
	}
	else
	{
		this.t = t;
		this.gy = t2gy(t);
		// this.gz = gy2gz(this.gy);
	}


	return this;
}

history.time.now = function()
{
	var d = new Date();
	var gy = {n:d.getFullYear(),y:d.getMonth() + 1,r:d.getDate(),s:Math.floor(d.getHours() / 2) + 1};
	return new history.time(gy);
}

// for(var i = -1000;i < 1000;i += 1)
// {
// 	var t = i - 100008999; 
// 	var a = history.time();
// 	var obj = a.t2gy(t);
// 	//console.log(obj);
// 	var et = a.gy2t(obj.n,obj.y,obj.r,obj.s);
// 	if(et  == t)
// 	{
// 		console.log('pass');
// 		console.log(obj);
// 	}
// 	else
// 	{
// 		console.log('unpass:'+t + ',' + et);
// 		console.log(obj);
// 	}
// }

