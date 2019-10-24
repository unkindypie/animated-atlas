import * as PIXI from 'pixi.js';
import loader from './pixi/loader';

export default class Sparkle extends PIXI.Sprite {
    static animationRate = 0.02;
    static deathBreakdown = 1;
    dead = false;
    

    constructor(cityPosition){
        super(loader.resources['sparkle'].texture);

        this.cityPosition = this.position = cityPosition;
        this.anchor.x = this.anchor.y = 0.5;
        this.scale.x = this.scale.y = 0.1;
    }
    update(delta){
        let scaleOffset = delta * Sparkle.animationRate;
        this.scale.y += scaleOffset;
        this.scale.x += scaleOffset;

        if(this.scale.x >= Sparkle.deathBreakdown){
            this.dead = true;
            this.cityPosition.exists = false;

        }
    }
}