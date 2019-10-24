const mouse = {
    isMoving: false,
    updateCounter: 0,
    update(delta){
        this.updateCounter += delta;
        if(this.updateCounter > 30){
            this.isMoving = false;
        }
    }
};
document.body.onmousemove = () => { 
  mouse.isMoving = true;
  mouse.updateCounter = 0;
}

export default mouse;