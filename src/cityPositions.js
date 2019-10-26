import * as PIXI from 'pixi.js';
import random from 'random';
import loader from './pixi/loader';

class CityPosition extends PIXI.Point {
    constructor(x, y) {
        super(x, y);
        this.exists = false;
    }
};

const cityPositions = [];

export const loadCityPositions = () => {
    const cities = loader.resources['cities'].data;
    for (let i in cities.points) {
        cityPositions.push(new CityPosition(cities.points[i][0], cities.points[i][1]));
    }
}

//возвращает координату рандомного незанятого города, если такого нет, кинет исключение
export const findFreeCity = () => {
    let freeCities = []
    for (let i in cityPositions) {
        if (!cityPositions[i].exists) {
            freeCities.push(cityPositions[i]);
        }
    }
    if (freeCities.length > 1) {
        let pos = random.int(0, freeCities.length);
        freeCities[pos].exists = true;
        return freeCities[pos];
    }
    else if (freeCities.length === 1) {
        freeCities[0].exists = true;
        return freeCities[0];
    }
    throw new Error('All cities are taken :c');
}

export const findCitiesAroundMouse = (mousePostion, radius) => {
    let accessableCities = [];

    for (let i in cityPositions) {
        if (!cityPositions[i].exists &&
            Math.sqrt(Math.pow(mousePostion.x - cityPositions[i].x, 2) + Math.pow(mousePostion.y - cityPositions[i].y, 2)) <= radius) {
            cityPositions[i].exists = true;
            accessableCities.push(cityPositions[i]);
        }
    }
    //if(accessableCities.length === 0) throw new Error('All cities are taken :c');
    return accessableCities;
}

export default cityPositions;