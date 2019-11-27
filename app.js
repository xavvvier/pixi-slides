import {Player} from './player.js';
import {keyboard} from './keyboard.js';
import {configuration} from './configuration.js';

//Aliases
let Application = PIXI.Application,
   loader = PIXI.Loader.shared,
   Text = PIXI.Text,
   resources = loader.resources,
   Sprite = PIXI.Sprite,
   Container = PIXI.Container,
   Rectangle = PIXI.Rectangle,
   Texture = PIXI.Texture,
   TextureCache = PIXI.utils.TextureCache;

class App {


   constructor(targetElement){
      //HTML element to inject the PIXI Application
      this.targetElement = targetElement;
      this.configuration = configuration;
      this.init();
   }

   init(){
      //Holds the reference to the current slide container
      this.slideContainer=null;
      //Holds the current slide configuration
      this.slide=null;
      //Which slide index is selected
      this.slideIndex=null;
      //The PIXI application
      this.app=null;
      //size of canvas element
      this.size=null;
      this.player=null;
      this.targets = [];
      this.size = this.configuration.size;
      //Create the PIXI Application
      this.app = new Application({width: this.size.width, height: this.size.height});
      //atlas resources to load
      this.imageNames = {
         player: 'images/player.json',
         terrain: 'images/terrain.json',
         targets: 'images/targets.json',
         flag: 'images/flag-optimized.json'
      };

      //Add the canvas to the document
      this.targetElement.appendChild(this.app.view);

      //load images and call the setup function when done
      loader.add([
         this.imageNames.player,
         this.imageNames.terrain,
         this.imageNames.targets,
         this.imageNames.flag,
         'images/background/blue.png',
         'images/background/brown.png',
         'images/background/gray.png',
         'images/background/green.png',
         'images/background/pink.png',
         'images/background/purple.png',
         'images/background/yellow.png'
      ]).load(() => this.setup());

   }

   setup(){
      //Draw the first slide
      this.drawSlide(0);
      this.app.ticker.add(delta => this.gameLoop(delta));
      let left = keyboard("ArrowLeft"),
         up = keyboard("ArrowUp"),
         right = keyboard("ArrowRight"),
         down = keyboard("ArrowDown");
      right.press = () => { this.player.moveRight(); }
      right.release = () => { this.player.stopMoving(); }
      left.press = () => { this.player.moveLeft(); }
      left.release = () => { this.player.stopMoving(); }
      keyboard("n").press = () => { this.nextSlide();}
      keyboard("p").press = () => { this.previousSlide();}
   }

   previousSlide(){
      //Move to the previous slide if in 1 or above
      if(this.slideIndex > 0) {
         this.slideContainer.visible = false;
         this.slideContainer.destroy();
         this.drawSlide(this.slideIndex-1);
      }
   }

   nextSlide() {
      //Move to the next slide if there are more
      let total = this.configuration.slides.length;
      if(this.slideIndex < total-1){
         this.slideContainer.visible = false;
         this.slideContainer.destroy();
         this.drawSlide(this.slideIndex+1);
      }
   }

   drawSlide(number) {
      this.slide = this.configuration.slides[number];
      this.slideIndex = number;
      this.slideContainer = new Container();
      this.slideContainer.interactive = true;
      this.slideContainer.click = (e) => console.log('clicked at', e.data.global);
      this.drawBackground();
      this.drawTargets();
      this.drawTerrain();
      this.addPlayer();
      //Add it to the app stage
      this.app.stage.addChild(this.slideContainer);
   }

   drawTargets(){
      let lines = this.slide.lines;
      this.currentLine = -1;
      //total of lines to draw == total number of targets
      let totalTargets = lines.length;
      //Start with new targets for each slide
      this.targets = [];
      let spacing = (this.size.width-100)/totalTargets;
      let targetSpritesheet = resources[this.imageNames.targets].spritesheet;
      let animationNames = Object.keys(targetSpritesheet.animations);
      animationNames.splice(animationNames.indexOf('collected'),1);
      for (var i = 0; i < totalTargets; i++) {
         let animationName = animationNames[this.randomInt(0, animationNames.length-1)];
         let targetSprite = new PIXI.AnimatedSprite(
            targetSpritesheet.animations[animationName]
         );
         targetSprite.y = 420;
         targetSprite.x = spacing * (i+1);
         this.slideContainer.addChild(targetSprite);
         targetSprite.animationSpeed = 0.2;
         if(i == 0){
            targetSprite.play();
         } else {
            targetSprite.visible = false;
         }
         this.targets.push(targetSprite);
      }
      //Create the collected target sprite animation
      this.targetCollectedSprite = new PIXI.AnimatedSprite(
         targetSpritesheet.animations['collected']
      );
      this.targetCollectedSprite.x = 200;
      this.targetCollectedSprite.y = 200;
      this.targetCollectedSprite.animationSpeed = 0.2;
      this.slideContainer.addChild(this.targetCollectedSprite);
      this.targetCollectedSprite.visible = false;
      this.targetCollectedSprite.onLoop = () => {
         this.targetCollectedSprite.stop();
         this.targetCollectedSprite.visible = false;
      }
      //Draw checkpoint flag to advance to the next slide
      this.checkpointFlag = new PIXI.AnimatedSprite(
         resources[this.imageNames.flag].spritesheet.animations['flag']
      );
      this.checkpointFlag.y = 414;
      this.checkpointFlag.x = 592;
      this.checkpointFlag.animationSpeed = 0.2;
      this.slideContainer.addChild(this.checkpointFlag);
      this.checkpointFlag.play();
   }

   drawNextLine(){
      this.currentLine = this.currentLine + 1;
      let line = this.slide.lines[this.currentLine];
      let text = new Text(line.content, {
         fontFamily: 'pixellari', 
         fontSize: line.size || 16, 
         fill: line.color || 'black',
      });
      text.x = line.x || 0;
      text.y = line.y || 0;
      this.slideContainer.addChild(text);
   }

   drawBackground() {
      //draw the background
      let backgroundTexture = resources[this.slide.background].texture;
      let tileHeight = backgroundTexture.baseTexture.height,
         tileWidth = backgroundTexture.baseTexture.width;
      let rows = Math.floor(this.size.height / tileHeight);
      let cols = Math.floor(this.size.width / tileWidth);
      for (var row = 0; row <= rows; row++) {
         for (var col = 0; col <= cols; col++) {
            let tile = new Sprite(backgroundTexture);
            tile.y = row * tileHeight;
            tile.x = col * tileWidth;
            this.slideContainer.addChild(tile);
         }
      }
   }

   drawTerrain() {
      let terrain = this.slide.terrain;
      let spriteMap = terrain.sprites;
      let spriteSize = 16; /*expecting a square sprite*/
      let columns = Math.floor(this.size.width/spriteSize); /*how many columns there are*/
      for (var i = 0, len = terrain.map.length; i < len; i++) {
         var x = (i % columns) * spriteSize;
         var y = Math.floor(i / columns) * spriteSize;
         var spriteCode = terrain.map[i];
         if(spriteCode !== '') {
            let spriteName = spriteMap[spriteCode];
            var sprite = new Sprite(resources[this.imageNames.terrain].textures[spriteName]);
            sprite.x = x;
            sprite.y = y;
            this.slideContainer.addChild(sprite);
         }
      }
   }

   updateTargets(){
      for (var i = 0; i < this.targets.length; i++) {
         let target = this.targets[i];
         if(target.visible){
            //detect a collision between the player and the current visible target
            if(this.hitRectangle(this.player.sprite, target)){
               target.stop();
               target.visible = false;
               this.drawNextLine();
               //Locate and play the collected target animation
               this.targetCollectedSprite.visible = true;
               this.targetCollectedSprite.play();
               this.targetCollectedSprite.x = target.x;
               this.targetCollectedSprite.y = target.y;
               //Show and play the next target, if there is such
               if(i < this.targets.length-1){
                  this.targets[i+1].visible = true;
                  this.targets[i+1].play();
               }
            }
         }
      }
      if(this.hitRectangle(this.player.sprite, this.checkpointFlag)){
         this.nextSlide();
      }
   }

   addPlayer(){
      //use https://www.leshylabs.com/apps/sstool/
      let playerSp = resources[this.imageNames.player].spritesheet;
      this.player = new Player(playerSp, this.slideContainer);
   }

   gameLoop(delta){
      //Update the current game state
      this.player.update();
      //Detect target collision
      this.updateTargets();
   }

   hitRectangle(r1, r2) {
      let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
      //hit will determine whether there's a collision
      hit = false;
      //Find the center points of each sprite
      r1.centerX = r1.x + r1.width / 2;
      r1.centerY = r1.y + r1.height / 2;
      r2.centerX = r2.x + r2.width / 2;
      r2.centerY = r2.y + r2.height / 2;
      //Find the half-widths and half-heights of each sprite
      r1.halfWidth = r1.width / 2;
      r1.halfHeight = r1.height / 2;
      r2.halfWidth = r2.width / 2;
      r2.halfHeight = r2.height / 2;
      //Calculate the distance vector between the sprites
      vx = r1.centerX - r2.centerX;
      vy = r1.centerY - r2.centerY;
      combinedHalfWidths = r1.halfWidth + r2.halfWidth;
      combinedHalfHeights = r1.halfHeight + r2.halfHeight;
      //Check for a collision on the x axis
      if (Math.abs(vx-20) < combinedHalfWidths) {
         //A collision might be occurring. Check for a collision on the y axis
         if (Math.abs(vy) < combinedHalfHeights) {
            //There's definitely a collision happening
            hit = true;
         } else {
            //There's no collision on the y axis
            hit = false;
         }
      } else {
         //There's no collision on the x axis
         hit = false;
      }
      //`hit` will be either `true` or `false`
      return hit;
   }

   randomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
   }
}


new App(document.getElementById('game'), configuration);


