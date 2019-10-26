import * as PIXI from 'pixi.js';
import loader from './pixi/loader';
import {ShockwaveFilter} from '@pixi/filter-shockwave';

export default class Sparkle extends PIXI.Sprite {
    animationRate = 0.008;
    deathBreakdown = 1;
    dead = false;
    animationProgress = 0;
    waveShader = null;
    
    //fromMouse - sparkle с шейдером и другой анимацией
    constructor(cityPosition, fromMouse){
        super(loader.resources['sparkle'].texture);

        this.cityPosition = this.position = cityPosition;
        this.anchor.x = this.anchor.y = 0.4;
        this.scale.x = this.scale.y = 0.1;
        if(fromMouse){
         
            this.setMouseMoveState();
        }
        //else {
            this.waveShader = new ShockwaveFilter(cityPosition, {
                wavelength: 20,
                amplitude: 1,
                brightness: 1.1,
                radius: 40,//194.5,
            }, 0.01);
        //}
    }
    update(delta){
        let animationOffset = delta * this.animationRate;
        if(this.waveShader) {
            this.waveShader.time += animationOffset / 15;
        }
        this.animationProgress += animationOffset;
        if(this.animationProgress >= this.deathBreakdown) {
            animationOffset *= -1;
        }
        this.scale.y += animationOffset;
        this.scale.x += animationOffset;
        console.log(this.animationProgress);
        if(this.animationProgress >= this.deathBreakdown * 1.6){

            this.dead = true;
            this.cityPosition.exists = false;

        }
    }
    setNormalState(){
        this.animationRate = 0.008;
        this.deathBreakdown = 1;
    }
    setMouseMoveState() {
        this.deathBreakdown = 1.5;
        this.animationRate = 0.015;
    }
}