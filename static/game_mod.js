window.onload=function() {
    canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
	document.addEventListener("keydown",restart);
    interval = setInterval(game,1000/15);
}
px=py=10;
gs=16;
tc=25;
ax=ay=15;
xv=yv=0;
trail=[];
tail = 5;
function game() {
	console.log("running..!!")
    px+=xv;
    py+=yv;
    if(px<1 || px>tc-2 || py<1 || py>tc-2) {
		trail.push({x:px,y:py});
		while(trail.length>tail) {
			trail.shift();
		}
		ctx.fillStyle="red";
		for(var i=0;i<trail.length;i++) {
			ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
		}
		ctx.font = "40px Arial";
		ctx.fillStyle="white";
		document.removeEventListener("keydown", keyPush);
		ctx.fillText("Game over..!!:(", 70, 100);
		ctx.font = "15px Arial";
		ctx.fillText("Press F5/Hold Escape/refresh page to restart..!!", 40, 200);
		clearInterval(interval);
    }
	else{
		ctx.fillStyle="black";
		ctx.fillRect(0,0,canv.width,canv.height);
		
		ctx.fillStyle="green";
		for (var j=1; j<tc-1;j++){
			//ctx.fillStyle="green";
			ctx.fillRect(385,(j*gs),gs-2,gs-2);
			ctx.fillRect((j*gs),385,gs-2,gs-2);
			ctx.fillRect(0,j*gs,gs-2,gs-2);
			ctx.fillRect(j*gs,0,gs-2,gs-2);
			
		}
		
		ctx.fillStyle="red";
		for(var i=0;i<trail.length;i++) {
			ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
			if(trail[i].x==px && trail[i].y==py) {
				tail = 5;
			}
		}
		trail.push({x:px,y:py});
		while(trail.length>tail) {
		trail.shift();
		}
	 
		if(ax==px && ay==py) {
			//console.log("adding tail and apple")
			tail++;
			ax=Math.floor(Math.random()*(tc-2)+1);
			ay=Math.floor(Math.random()*(tc-2)+1);
			console.log(ax, ay);
		}
		ctx.fillStyle="blue";
		ctx.fillRect(ax*gs,ay*gs,gs,gs);
		
		ctx.fillStyle="white";
		ctx.font = "15px Arial";
		ctx.fillText("Score: "+(tail-5), 300, 50);
	}
}
function keyPush(evt) {
	console.log("arrow keys")
    switch(evt.keyCode) {
        case 37:
            xv=-1;yv=0;
			//console.log(xv, yv);
            break;
        case 38:
            xv=0;yv=-1;
            //console.log(xv, yv);
			break;
        case 39:
            xv=1;yv=0;
			//console.log(xv, yv);
            break;
        case 40:
            xv=0;yv=1;
			//console.log(xv, yv);
            break;
    }
}

function restart(evt){
	console.log("i am here")
	if (evt.keyCode == 27){
		console.log("escape pressed..")
		location.reload(true);
	}
}