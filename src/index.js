import * as PIXI from 'pixi.js';
import random from 'random';

import app from './pixi/pixiapp';
import loader, { loadResourses } from './pixi/loader';
import { findFreeCity, loadCityPositions, findCitiesAroundMouse } from './cityPositions';
import Sparkle from './Sparkle';
import Mouse from './utils/Mouse';

//будет вызвана, когда pixi загрузит все ассеты
const onLoad = () => {
    loadCityPositions();

    let sparkles = [];
    const sparkleSpawnRate = { max: 3, min: 1 };
    let spawnDelta = 40;
    let elapsedBeforeSpawn = 0;
    let mouseSpawnZoneRadius = 70;

    const container = new PIXI.Container();
    container.filters = [];
    container.addChild(new PIXI.Sprite(loader.resources['map'].texture));
    app.stage.addChild(container);


    const updateSparkles = (delta) => {
        for (let i in sparkles) {
            sparkles[i].update(delta);
        };


        sparkles = sparkles.filter((sparkle) => {
            if (sparkle.dead) {
                //удаляю фильтр спаркла с контейнера
                if (sparkle.waveShader) {
                    container.filters = container.filters.filter((filter) => filter != sparkle.waveShader)
                }
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
            if (sparkle.waveShader) {
                container.filters.push(sparkle.waveShader);
            }
        }
    }

    const spawnSparklesAroundMouse = () => {
        let cities = findCitiesAroundMouse(Mouse.position, mouseSpawnZoneRadius);
        for (let i in cities) {
            const sparkle = new Sparkle(cities[i], true);
            sparkles.push(sparkle);
            container.addChild(sparkle);
            if (sparkle.waveShader) {
                container.filters.push(sparkle.waveShader);
            }
        }
    }

    app.ticker.add((delta) => {
        elapsedBeforeSpawn += delta;

        Mouse.update(delta);

        if (Mouse.isMoving) {
            spawnDelta = 25;
            sparkleSpawnRate.max = 9;
            sparkleSpawnRate.min = 2;
        }
        else {
            spawnDelta = 40;
            sparkleSpawnRate.max = 6;
            sparkleSpawnRate.min = 1;
        }

        updateSparkles(delta);

        spawnSparklesAroundMouse();

        if (elapsedBeforeSpawn >= spawnDelta) {
            spawnSparkles();
            elapsedBeforeSpawn = 0;
        }
    })
}

loadResourses(onLoad);




