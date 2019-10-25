import * as PIXI from 'pixi.js';
import random from 'random';

import app from './pixi/pixiapp';
import loader, { loadResourses } from './pixi/loader';
import { findFreeCity, loadCityPositions } from './cityPositions';
import Sparkle from './Sparkle';
import Mouse from './utils/Mouse';

//будет вызвана, когда pixi загрузит все ассеты
const onLoad = () => {
    loadCityPositions();

    let sparkles = [];
    const sparkleSpawnRate = { max: 3, min: 1 };
    let spawnDelta = 40;
    let currentSpawnDeltaTime = 0;

    const container = new PIXI.Container();
    container.filters = [];
    container.addChild(new PIXI.Sprite(loader.resources['map'].texture));
    app.stage.addChild(container);

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

    app.ticker.add((delta) => {
        currentSpawnDeltaTime += delta;

        Mouse.update(delta);
        
        if(Mouse.isMoving) {
            Sparkle.setMouseMoveState();
            spawnDelta = 25;
            sparkleSpawnRate.max = 3;
            sparkleSpawnRate.min = 1;
        }
        else{
            Sparkle.setNormalState();
            spawnDelta = 40;
            sparkleSpawnRate.max = 2;
            sparkleSpawnRate.min = 0;
        }

        updateSparkles(delta);
        
        if (currentSpawnDeltaTime >= spawnDelta) {
            spawnSparkles();
            currentSpawnDeltaTime = 0;
        }
    })
}

loadResourses(onLoad);




