import app from './pixiapp'

const loader = app.loader;

const loadResourses = (callback)=>{
    app.loader
        .add('map', 'assets/map_bg_sparkl.png')
        .add('sparkle', 'assets/sparkle.png')
        .add('cities', 'assets/cities.json')
        .load(callback);
}

export { loadResourses, loader as default }