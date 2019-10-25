import * as PIXI from 'pixi.js';
import random from 'random';
import {ShockwaveFilter} from '@pixi/filter-shockwave';

import app from './pixi/pixiapp';
import loader, { loadResourses } from './pixi/loader';
import cityPositions, { findFreeCity } from './cityPositions';
import Sparkle from './Sparkle';
import Mouse from './utils/Mouse';

//будет вызвана, когда pixi загрузит все ассеты
const onLoad = () => {
    let sparkles = [];
    const sparkleSpawnRate = { max: 3, min: 1 };
    let spawnDelta = 10;
    let currentSpawnDeltaTime = 0;

    const container = new PIXI.Container();
    container.filters = [];
    container.addChild(new PIXI.Sprite(loader.resources['map'].texture));
    app.stage.addChild(container);


    // const filter = new ShockwaveFilter([app.view.width/2 + 200, app.view.height/2], {
    //     wavelength: 37,
    //     amplitude: 16,
    //     brightness: 1,
    //     radius: 194.5,
    // }, 0.2);

    //container.filters.push(filter);

    const updateSparkles = (delta) => {
        for (let i in sparkles) {
            sparkles[i].update(delta);
        };

        sparkles = sparkles.filter((sparkle) => {
            if(sparkle.dead){
                container.filters.filter((filter)=> filter != sparkle.waveShader) //удаляю фильтр спаркла с контейнера
                container.removeChild(sparkle) //удаляю сам спаркл
                return false;
            }
            return true;
            
        });
    }

    const spawnSparkles = () => {
        for (let i = 0; i < random.int(sparkleSpawnRate.min, sparkleSpawnRate.max); i++) {
            let sparkle;
            try {
                sparkle = new Sparkle(findFreeCity());
            } catch (err) { // если все города заняты, findFreeCity выкинет исключение
                return;
            }
            sparkles.push(sparkle);

            container.addChild(sparkle);
            container.filters.push(sparkle.waveShader);
        }
    }

    const setOnMouseMoveMode = ()=>{
        Sparkle.animationRate = 0.04;
        Sparkle.deathBreakdown = 2.5;
    }

    const setNormalMode = ()=>{
        Sparkle.animationRate = 0.02;
        Sparkle.deathBreakdown = 1;
    }

    

    // const container = new PIXI.Container();
    // app.stage.addChild(container);

    // let filter = new PIXI.filters.DisplacementFilter(mapSprite);
    // filter.
    // container.filters = [filter];



    app.ticker.add((delta) => {
        currentSpawnDeltaTime += delta;

        Mouse.update(delta);
        
        if(Mouse.isMoving) {
            setOnMouseMoveMode();
        }
        else{
            setNormalMode();
        }

        updateSparkles(delta);
        
        if (currentSpawnDeltaTime >= spawnDelta) {
            spawnSparkles();
            currentSpawnDeltaTime = 0;
        }
    })
}

loadResourses(onLoad);




