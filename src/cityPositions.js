import * as PIXI from 'pixi.js';
import random from 'random';

class CityPosition extends PIXI.Point {
    constructor(x, y){
        super(x, y);
        this.exists = false;
    }
};

//рандомные координаты с материков. Это не реальные города.
const cityPositions = [
    new CityPosition(1186, 313),
    new CityPosition(1135, 230),
    new CityPosition(1076, 300),
    new CityPosition(664, 318),
    new CityPosition(767, 464),
    new CityPosition(996, 266)
];

//возвращает координату рандомного незанятого города, если такого нет, кинет исключение
export const findFreeCity = () => {
    let freeCities = []
    for(let i in cityPositions) {
        if(!cityPositions[i].exists) {
            freeCities.push(cityPositions[i]);
        }
    }
    if(freeCities.length > 1) {
        let pos = random.int(0, freeCities.length);
        freeCities[pos].exists = true;
        return freeCities[pos];
    }
    else if(freeCities.length === 1) {
        freeCities[0].exists = true;
        return freeCities[0];
    }
    throw new Error('All cities are taken :c');
}

export default cityPositions;