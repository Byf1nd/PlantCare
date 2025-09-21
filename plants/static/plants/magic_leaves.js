const canvas = document.getElementById('leavesCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const leaves = [];
const leafCount = 15; // menos hojas

for(let i=0;i<leafCount;i++){
    leaves.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: Math.random()*20+10,
        speed: Math.random()*0.5+0.2, // más lento
        angle: Math.random()*Math.PI*2
    });
}

function drawLeaves(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    leaves.forEach(l=>{
        ctx.save();
        ctx.translate(l.x,l.y);
        ctx.rotate(l.angle);
        // hoja pastel, forma simple y suave
        ctx.fillStyle = 'rgba(144, 238, 144, 0.6)';
        ctx.beginPath();
        ctx.ellipse(0,0,l.size,l.size/2,0,0,Math.PI*2);
        ctx.fill();
        ctx.restore();
        l.y += l.speed;
        l.angle += 0.01;
        if(l.y>canvas.height){
            l.y=-20;
            l.x=Math.random()*canvas.width;
        }
    });
    requestAnimationFrame(drawLeaves);
}
drawLeaves();

window.addEventListener('resize',()=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
});
