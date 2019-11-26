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

   //HTML element to inject the PIXI Application
   targetElement;

   //Holds the reference to the current slide container
   slideContainer;

   //Holds the current slide configuration
   slide;
   //Which slide index is selected
   slideIndex;

   //The PIXI application
   app;

   //size of canvas element
   size;

   player;

   size = configuration.size;

   constructor(targetElement){
      this.targetElement = targetElement;
      this.init();
   }

   init(){
      this.size = configuration.size;
      //Create the PIXI Application
      this.app = new Application({width: this.size.width, height: this.size.height});
      //atlas resources to load
      this.imageNames = {
         player: 'images/player.json',
         terrain: 'images/terrain.json',
         targets: 'images/targets.json'
      }

      //Add the canvas to the document
      this.targetElement.appendChild(this.app.view);

      //load images and call the setup function when done
      loader.add([
         this.imageNames.player,
         this.imageNames.terrain,
         this.imageNames.targets,
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
      let total = configuration.slides.length;
      if(this.slideIndex < total-1){
         this.slideContainer.visible = false;
         this.slideContainer.destroy();
         this.drawSlide(this.slideIndex+1);
      }
   }

   drawSlide(number) {
      this.slide = configuration.slides[number];
      this.slideIndex = number;
      this.slideContainer = new Container();
      this.drawBackground();
      this.drawTargets();
      this.drawTerrain();
      this.addPlayer();
      //Add it to the app stage
      this.app.stage.addChild(this.slideContainer);
   }

   drawTargets(){
      let lines = this.slide.lines;
      //draw all the lines
      for (const line of lines) {
         let text = new Text(line.content, {
            fontFamily: 'pixellari', 
            fontSize: line.size || 16, 
            fill: line.color || 'black',
         });
         text.x = line.x || 0;
         text.y = line.y || 0;
         this.slideContainer.addChild(text);
      }
      //total of lines to draw == total number of targets
      let totalTargets = lines.length;
      let spacing = (this.size.width-100)/totalTargets;
      let targetSpritesheet = resources[this.imageNames.targets].spritesheet;
      for (var i = 0; i < totalTargets; i++) {
         let targetSprite = new PIXI.AnimatedSprite(
            targetSpritesheet.animations['kiwi']
         );
         targetSprite.y = 420;
         targetSprite.x = spacing * (i+1);
         this.slideContainer.addChild(targetSprite);
         targetSprite.animationSpeed = 0.2;
         targetSprite.play();
      }
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
      this.slide = configuration.slides[0];
      let terrain = this.slide.terrain;
      let spriteMap = terrain.sprites;
      let spriteSize = 16; /*expecting a square sprite*/
      let columns = Math.floor(configuration.size.width/spriteSize); /*how many columns there are*/
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


   addPlayer(){
      //use https://www.leshylabs.com/apps/sstool/
      let playerSp = resources[this.imageNames.player].spritesheet;
      this.player = new Player(playerSp, this.slideContainer);
   }

   gameLoop(delta){
      //Update the current game state
      this.player.update();
   }
}


new App(document.getElementById('game'));


