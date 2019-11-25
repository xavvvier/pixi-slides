import {Player} from './player.js';
import {keyboard} from './keyboard.js';
import {configuration} from './configuration.js';

//Aliases
let Application = PIXI.Application,
   loader = PIXI.Loader.shared,
   Text = PIXI.Text,
   resources = loader.resources,
   Sprite = PIXI.Sprite,
   Rectangle = PIXI.Rectangle,
   Texture = PIXI.Texture,
   TextureCache = PIXI.utils.TextureCache;

let target = document.getElementById('game');

let size = configuration.size;
//Create a Pixi Application
let app = new Application({width: size.width, height: size.height});

let player;
//Set the game state 
let state = play;

let imageNames = {
   player: 'images/player.json'
}

//Add the canvas to the document
target.appendChild(app.view);

//load images and call the setup function when done
loader.add([
   imageNames.player,
   'images/background/blue.png',
   'images/background/brown.png',
   'images/background/gray.png',
   'images/background/green.png',
   'images/background/pink.png',
   'images/background/purple.png',
   'images/background/yellow.png'
]).load(setup);

function setup(){
   drawSlide();
   addPlayer();

   app.ticker.add(delta => gameLoop(delta));
   let left = keyboard("ArrowLeft"),
      up = keyboard("ArrowUp"),
      right = keyboard("ArrowRight"),
      down = keyboard("ArrowDown");
   right.press = () => { player.moveRight(); }
   right.release = () => { player.stopMoving(); }
   left.press = () => { player.moveLeft(); }
   left.release = () => { player.stopMoving(); }
}

function drawSlide() {
   let slide = configuration.slides[0];
   //draw the background
   let backgroundTexture = resources[slide.background].texture;
   let tileHeight = backgroundTexture.baseTexture.height,
      tileWidth = backgroundTexture.baseTexture.width;
   let rows = Math.floor(size.height / tileHeight);
   let cols = Math.floor(size.width / tileWidth);
   for (var row = 0; row <= rows; row++) {
      for (var col = 0; col <= cols; col++) {
         let tile = new Sprite(backgroundTexture);
         tile.y = row * tileHeight;
         tile.x = col * tileWidth;
         app.stage.addChild(tile);
      }
   }
   //draw all the lines
   let lines = slide.lines;
   for (const line of lines) {
      let text = new Text(line.content, {
         fontFamily: 'pixellari', 
         fontSize: line.size || 16, 
         fill: line.color || 'black',
      });
      text.x = line.x || 0;
      text.y = line.y || 0;
      app.stage.addChild(text);
   }
}

function addPlayer(){
   //use https://www.leshylabs.com/apps/sstool/
   let playerSp = resources[imageNames.player].spritesheet;
   player = new Player(playerSp, app.stage);
}

function gameLoop(delta){
   //Update the current game state
   state(delta);
}

function play(delta){
   player.update();
}

