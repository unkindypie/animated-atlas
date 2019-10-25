import * as PIXI from 'pixi.js';
import loader from './pixi/loader';
import {ShockwaveFilter} from '@pixi/filter-shockwave';

export default class Sparkle extends PIXI.Sprite {
    static animationRate = 0.008;
    static deathBreakdown = 1;
    static useShader = false;
    dead = false;
    animationProgress = 0;
    waveShader = null;
    

    constructor(cityPosition){
        super(loader.resources['sparkle'].texture);

        this.cityPosition = this.position = cityPosition;
        this.anchor.x = this.anchor.y = 0.4;
        this.scale.x = this.scale.y = 0.1;
        if(Sparkle.useShader){
            this.waveShader = new ShockwaveFilter(cityPosition, {
                wavelength: 70,
                amplitude: 3,
                brightness: 1,
                radius: 50,//194.5,
            }, 0.05);
        }
        
    }
    update(delta){
        let animationOffset = delta * Sparkle.animationRate;
        if(this.waveShader) {
            this.waveShader.time += animationOffset / 8;
        }
        this.animationProgress += animationOffset;
        if(this.animationProgress >= Sparkle.deathBreakdown) {
            animationOffset *= -1;
        }
        this.scale.y += animationOffset;
        this.scale.x += animationOffset;

        if(this.animationProgress >= Sparkle.deathBreakdown * 1.6){
            this.dead = true;
            this.cityPosition.exists = false;

        }
    }
    static setNormalState(){
        Sparkle.animationRate = 0.008;
        Sparkle.deathBreakdown = 1;
        Sparkle.useShader = false;
    }
    static setMouseMoveState() {
        Sparkle.deathBreakdown = 1.5;
        Sparkle.useShader = true;
    }
}