const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

let particleSize = 1;
        
let offsetX = 0;
let offsetY = 0;

let spacingX = 10;
let spacingY = 10;

let mouse = {
    x: null,
    y: null,
    radius: 50
}

function onMouseMove(evt) {
    const e = (evt.touches && evt.touches[0]) || evt;    
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

function onMouseLeave(evt) {
    mouse.x = null;
    mouse.y = null;
}

const body = document.body;

body.addEventListener('mousemove', onMouseMove);
body.addEventListener('touchmove', function(e) {
    e.preventDefault();
    e.stopPropagation();
    onMouseMove(e);
}, {passive: false});

body.addEventListener('mouseleave', onMouseLeave);
body.addEventListener('touchend', onMouseLeave);
body.addEventListener('touchcancel', onMouseLeave);

function drawImage() {
    let imageWidth = png.width;
    let imageHeight = png.height;
    
    const data = ctx.getImageData(0, 0, imageWidth, imageHeight);
    ctx.clearRect(0, 0, imageWidth, imageHeight);
    
    offsetX = (innerWidth / 2) - ((imageWidth * particleSize) / 2);
    offsetY = (innerHeight / 2) - ((imageHeight * particleSize) / 2);
    
    class Particle {
        constructor(x, y, color, size) {
            this.x = offsetX + x;
            this.y = offsetY + y;
            
            this.color = color;
            this.size = size;
            
            this.baseX = this.x;
            this.baseY = this.y;
            
            this.density = ((Math.random() * 10) + 2);
        }
        
        draw() {
            ctx.beginPath();
            //ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.rect(this.x, this.y, this.size, this.size);
            ctx.closePath();
            ctx.fill();
        }
        
        update() {
            ctx.fillStyle = this.color;
                
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            
            var maxDistance = 50;
            var force = (maxDistance - distance) / maxDistance;
            
            if(force < 0)
                force = 0;
            
            let directionX = (forceDirectionX * force * this.density) * 0.9;
            let directionY = (forceDirectionY * force * this.density) * 0.9;
            
            if((distance < mouse.radius + this.size) && (mouse.x !== null || mouse.y !== null)) {
                this.x -= directionX;
                this.y -= directionY;
            }
            else {
                if(this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 5;
                }
                if(this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 5;
                }
            }
            
            this.draw();
        }
    }
    
    function init() {
        particleArray = [];
        
        for(let y = 0; y < data.height; y++) {
            for(let x = 0; x < data.width; x++) {
                let index = (y * 4 * data.width) + (x * 4);
                let r = data.data[index + 0];
                let g = data.data[index + 1];
                let b = data.data[index + 2];
                let a = data.data[index + 3];
                
                if(a > 128) {
                    let color = "rgb(" + r + ", " + g + ", " + b + ")";
                    particleArray.push(new Particle(x * (particleSize + spacingX), y * (particleSize + spacingY), color, particleSize));
                }
            }
        }
    }
    
    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(0, 0, innerWidth, innerHeight);
        
        if(spacingX > 0 || spacingY > 0) {            
            if(spacingX > 0)
                spacingX--;
            
            if(spacingY > 0)
                spacingY--;
            
            init();
        }
        
        for(let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
        }
    }
    
    init();
    animate();
    
    window.addEventListener('resize', function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    });
}

var png = new Image();

png.addEventListener('load', function() {
    ctx.drawImage(png, 0, 0);
    drawImage();
}, false);

png.src = "./ji.png";