const canvas=document.getElementById("canvas");
const width=canvas.width=window.innerWidth;
const height=canvas.height=window.innerHeight;
const tool=canvas.getContext("2d");
let coinData=[];

const coin=new Image();
coin.src="coin.png";

coin.onload=()=>{
    tool.drawImage(coin, 0,0,16,16,100,200,16,16);
        

}
class Coins{
    constructor(image,sx,sy,sw,sh,dx,dy,dw,dh,speedX,speedY,alpha){
        this.image=image;
        this.sx=sx;
        this.sy=sy;
        this.sw=sw;
        this.sh=sh;
        this.dx=dx;
        this.dy=dy;
        this.dw=dw;
        this.dh=dh;
        this.speedX=speedX;
        this.speedY=speedY;
        this.alpha=alpha;

    }
    move(){
        if(this.dx>=width*0.999) this.dx=-10;
        this.dx+=this.speedX;

    }
    draw(){
        tool.save();
        tool.shadowColor = 'rgba(255, 223, 0, 0.7)';
        tool.shadowBlur = 20;  // Soft glow around the coins
        tool.shadowOffsetX = 0;
        tool.shadowOffsetY = 0;
        tool.translate(this.dx + this.dw / 2, this.dy + this.dh / 2);  // Move origin to center of coin
        tool.rotate(this.rotation); 
        tool.globalAlpha=this.alpha; 
        tool.drawImage(this.image,this.sx,this.sy,this.sw,this.sh,this.dx,this.dy,this.dw,this.dh);
        tool.restore();
    }
}

canvas.addEventListener('mousemove', function(event){
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    coinData.forEach(coin => {
        let distX = coin.dx - mouseX;
        let distY = coin.dy - mouseY;
        let distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < 100) {
            coin.speedX += 0.1 * (distX / distance);  // Coins move away from the mouse
            coin.speedY += 0.1 * (distY / distance);
        }
    });
});
//! Generate 1000coins data
function coinDataGenerate(){
    for(let i=0;i<500;i++){
        coinData.push(new Coins(coin,0,0,16,16,Math.random()*width*0.99,Math.random()*height*0.99,16,16,Math.random()*1,1,Math.random()));
    }
};

//! Draw the coins on the screen
function coinDrawing(){
    for(let i=0;i<coinData.length;i++){
        coinData[i].move();
        coinData[i].draw();
    }
}

//! Function that is called only once
function static(){
    coinDataGenerate()
}
static();
console.log(coinData);




//! Update function that calls itself infintely
function update(){
    tool.clearRect(0, 0, width, height);

    coinDrawing();
    
    requestAnimationFrame(update);
}
update();

