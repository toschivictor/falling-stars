import * as PIXI from 'pixi.js';

// Create the application
const app = new PIXI.Application();

// Initialize the application
await app.init({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000033,
    antialias: true,
});

// Add the canvas to the DOM
document.body.appendChild(app.canvas);

// Handle window resize
window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

// Define star type
interface Star extends PIXI.Graphics {
    speed: number;
}

// Game state
const stars: Star[] = [];

// Create a star
function createStar(): Star {
    const star = new PIXI.Graphics() as Star;
    star.beginFill(0xFFFFFF);
    star.drawCircle(0, 0, 2);
    star.endFill();
    
    // Random position at the top of the screen
    star.x = Math.random() * app.screen.width;
    star.y = -10;
    
    // Random speed
    star.speed = 2 + Math.random() * 3;
    
    app.stage.addChild(star);
    stars.push(star);
    return star;
}

// Game loop
app.ticker.add(() => {
    // Create new stars
    if (Math.random() < 0.1) {
        createStar();
    }
    
    // Update stars
    for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];
        star.y += star.speed;
        
        // Remove stars that are off screen
        if (star.y > app.screen.height) {
            app.stage.removeChild(star);
            stars.splice(i, 1);
        }
    }
});
