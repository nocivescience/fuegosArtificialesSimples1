const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');
let gravity = -0.1;
let fireworks = [];
let subFireworks = [];
let animate = () => {
    draw();
    update();
    requestAnimationFrame(animate);
};
let colors = ['Blue', 'Orange', 'Red', 'Purple', 'Green'];
let initializeCount = 0;
let maximumInitialize = 1;
let initDelay = 500;
let fireworkRadius = 5;
let particleCount = 120;
let speedMultiplier = 5;
class Firework{
    constructor(x, y, radius, velocityX, velocityY, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.color = color;
        this.opacity = 1;
    }
    update = () => {
        this.velocityY -= gravity;
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.opacity -= 0.006;
        if (this.opactiy < 0) this.opacity = 0;
    };
    draw = () => {
        canvasContext.save();
        canvasContext.globalAlpha = this.opacity;
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        canvasContext.fillStyle = this.color;
        canvasContext.fill();
        canvasContext.closePath();
        canvasContext.restore();
    };
}
let createSubFireworks=(x,y,count,color,speedMultiplier)=>{
    let created=0;
    let radians=(Math.PI*2)/count;
    while (created<count){
        let firework=new Firework(
            x,
            y,
            fireworkRadius,
            Math.cos(radians*created)*speedMultiplier*Math.random(),
            Math.sin(radians*created)*speedMultiplier*Math.random(),
            color
        );
        subFireworks.push(firework);
        created++;
    }
};
let update = () => {
    canvasContext.fillStyle = 'rgba(10,0,0,0.1)';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    if (initializeCount < maximumInitialize) {
        let firework=new Firework(
            Math.random() * canvas.width,
            canvas.height+Math.random() * 70,
            fireworkRadius,
            3*(Math.random()),
            -12,
            colors[Math.floor(Math.random() * colors.length)]
        );
        fireworks.push(firework);
        console.log(fireworks);
        setTimeout(() => {
            initializeCount--;
        }, initDelay);
        initializeCount++;
    }
    fireworks.forEach((firework, index)=>{
        if(firework.opacity<=.1){
            fireworks.splice(index, 1);
            createSubFireworks(
                firework.x,
                firework.y,
                particleCount,
                firework.color,
                speedMultiplier
            );
        }else{
            firework.update();
        }
    })
    subFireworks.forEach((subFirework, index)=>{
        if(subFirework.opacity<=0){
            subFireworks.splice(index, 1);
        }else{
            subFirework.update();
        }
    })
    // initializeCount++;
};
let draw = () => {
    fireworks.forEach((firework, index)=>{
        firework.draw();
    })
    subFireworks.forEach((subFirework, index)=>{
        subFirework.draw();
    })
};
animate();