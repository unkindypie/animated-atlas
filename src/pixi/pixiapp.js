import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: 1920,
    height: 595,
    resolution: window.devicePixelRatio
});

document.body.appendChild(app.view);

export default app;