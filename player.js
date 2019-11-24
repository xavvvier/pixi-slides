export class Player {

   vx = 0;
   speed = 2;

   constructor(spriteSheet, stage) {
      this.spriteSheet = spriteSheet;
      this.sprites = {};
      let animations = ['idle', 'run'];
      for (var anim of animations) {
         this.sprites[anim] = new PIXI.AnimatedSprite(
            spriteSheet.animations[anim]
         );
         this.sprites[anim].id = anim;
         this.sprites[anim].anchor.set(0.5);
         this.sprites[anim].visible = false;
         this.sprites[anim].animationSpeed = 0.2;
         stage.addChild(this.sprites[anim]);
      }
      //Create the pixi animated sprite
      this.sprite = this.sprites['idle'];
      this.sprite.x = 200;
      this.sprite.y = 200;
      this.sprite.visible = true;
      this.sprite.play();
   }

   update(){
      this.sprite.x += this.vx;
      if(this.vx == 0){
         this.switchToSprite('idle');
      } else {
         this.switchToSprite('run');
      }
   }

   switchToSprite(key){
      if(this.sprite.id == key) { return; }
      this.sprite.stop();
      this.sprite.visible = false;
      this.previous = this.sprite;
      this.sprite = this.sprites[key];
      this.sprite.x = this.previous.x;
      this.sprite.y = this.previous.y;
      this.sprite.scale.x = this.previous.scale.x;
      this.sprite.visible = true;
      this.sprite.play();
   }

   moveRight() {
      if(this.sprite.scale.x < 0) {
         this.sprite.scale.x *= -1;
      }
      this.vx = this.speed;
   }
   
   moveLeft() {
      if(this.sprite.scale.x > 0) {
         this.sprite.scale.x *= -1;
      }
      this.vx = -this.speed;
   }

   stopMoving(){
      this.vx = 0;
   }

}
