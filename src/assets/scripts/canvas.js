var canvas = document.querySelector('#canvas'),
    context = canvas.getContext('2d'),
    discs = [
      { 
         x: 150,
         y: 50,
         lastX: 150,
         lastY: 50,
         velocityX: 3.2,
         velocityY: 3.5,
         radius: 25,
         innerColor: 'rgba(0,255,255,0.3)',
         middleColor: 'rgba(0,255,255,0.9)',
         outerColor: 'rgba(0,255,255,0.3)',
         strokeStyle: 'slateblue',
      },
      { 
         x: 75,
         y: 200,
         lastX: 75,
         lastY: 200,
         velocityX: 2.2,
         velocityY: 2.5,
         radius: 25,
         innerColor: 'rgba(225,225,225,0.1)',
         middleColor: 'rgba(225,225,225,0.9)',
         outerColor: 'rgba(225,225,225,0.3)',
         strokeStyle: 'gray'
      },
      { 
         x: 100,
         y: 300,
         lastX: 150,
         lastY: 50,
         velocityX: 1.2,
         velocityY: 1.5,
         radius: 25,
         innerColor: 'orange',
         middleColor: 'yellow',
         outerColor: 'gold',
         shadowColor: 'rgba(255,0,0,0.7)',
         strokeStyle: 'orange'
      },
   ],
   frameCount = 0,
   numDiscs = discs.length,
   lastTime = 0;

function eraseBackground()
{
   context.clearRect(0,0,canvas.width,canvas.height);
}

function update()
{
   var i = numDiscs, disc = null;

   while(i--)
   {
      disc = discs[i];

      if (disc.x + disc.velocityX + disc.radius > context.canvas.width || disc.x + disc.velocityX - disc.radius < 0)
      {
         disc.velocityX = -disc.velocityX;
      }

      if (disc.y + disc.velocityY + disc.radius > context.canvas.height || disc.y + disc.velocityY - disc.radius < 0)
      {
         disc.velocityY= -disc.velocityY;
      }

      disc.x += disc.velocityX;
      disc.y += disc.velocityY;
   }
}

function drawDisc(disc)
{
   var gradient = context.createRadialGradient(disc.x, disc.y, 0, disc.x, disc.y, disc.radius);

   gradient.addColorStop(0.3, disc.innerColor);
   gradient.addColorStop(0.7, disc.middleColor);
   gradient.addColorStop(1.0, disc.outerColor);

   context.save();
   context.beginPath();
   context.arc(disc.x, disc.y, disc.radius, 0, Math.PI*2, false);
   context.clip();

   context.fillStyle = gradient;
   context.strokeStyle = disc.strokeStyle;
   context.lineWidth = 2;
   context.fill();
   context.stroke();

   context.restore();
}

function draw()
{
   var i = numDiscs, disc;

   i = numDiscs;
   while(i--)
   {
      disc = discs[i];
      drawDisc(disc);
      disc.lastX = disc.x;
      disc.lastY = disc.y;
   }

   if (frameCount === 100)
   {
      frameCount = -1;    
   }

   if (frameCount !== -1 && frameCount < 100)
   {
     frameCount++;
   }
}

function animate()
{
   var now = (+new Date);

      eraseBackground();
      update();
      draw();

   if (window.webkitRequestAnimationFrame !== undefined)
   {
      window.webkitRequestAnimationFrame(animate);
   }
   else if (window.mozRequestAnimationFrame !== undefined)
   {
      window.mozRequestAnimationFrame(animate);
   }
}
   
context.font = '48px Helvetica';

if (window.webkitRequestAnimationFrame !== undefined)
{
   window.webkitRequestAnimationFrame(animate);
}
else if (window.mozRequestAnimationFrame !== undefined)
{
   window.mozRequestAnimationFrame(animate);
}
else
{
  setInterval(animate, 1000/60);
}

context.font = '48px Helvetica';
