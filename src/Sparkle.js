import * as PIXI from 'pixi.js';
import loader from './pixi/loader';
import {ShockwaveFilter} from '@pixi/filter-shockwave';

export default class Sparkle extends PIXI.Sprite {
    static animationRate = 0.015;
    static deathBreakdown = 1;
    dead = false;
    waveShader = null;

    constructor(cityPosition){
        super(loader.resources['sparkle'].texture);

        this.cityPosition = this.position = cityPosition;
        this.anchor.x = this.anchor.y = 0.5;
        this.scale.x = this.scale.y = 0.1;
        this.waveShader = new ShockwaveFilter(cityPosition, {
            wavelength: 100,
            amplitude: 3,
            brightness: 1,
            radius: 50,//194.5,
        }, 0);
    }
    update(delta){
        let animationOffset = delta * Sparkle.animationRate;
        this.waveShader.time += animationOffset / 4;
        this.scale.y += animationOffset;
        this.scale.x += animationOffset;

        if(this.scale.x >= Sparkle.deathBreakdown){
            this.dead = true;
            this.cityPosition.exists = false;

        }
    }
    static setNormalState(){
        Sparkle.animationRate = 0.015;
        Sparkle.deathBreakdown = 1;
    }
    static setMouseMoveState() {
        Sparkle.deathBreakdown = 2;
    }
}