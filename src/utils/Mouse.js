import app from '../pixi/pixiapp';

const mouse = {
    position: {x:0, y:0},
    isMoving: false,
    updateCounter: 0,
    update(delta){
        this.updateCounter += delta;
        if(this.updateCounter > 30){
            this.isMoving = false;
        }
    }
};
app.view.onmousemove = (e) => { 
  mouse.isMoving = true;
  mouse.updateCounter = 0;
  mouse.position.x = e.clientX;
  mouse.position.y = e.clientY;
}

export default mouse;