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

let target = document.getElementById('game');
let slideContainer;

let size = configuration.size;
//Create a Pixi Application
let app = new Application({width: size.width, height: size.height});

let player;
//Set the game state 
let state = play;

let imageNames = {
   player: 'images/player.json',
   terrain: 'images/terrain.json'
}

//Add the canvas to the document
target.appendChild(app.view);

//load images and call the setup function when done
loader.add([
   imageNames.player,
   imageNames.terrain,
   'images/background/blue.png',
   'images/background/brown.png',
   'images/background/gray.png',
   'images/background/green.png',
   'images/background/pink.png',
   'images/background/purple.png',
   'images/background/yellow.png'
]).load(setup);

function setup(){
   slideContainer = drawSlide(0);
   drawTerrain(slideContainer);
   addPlayer(slideContainer);

   app.stage.addChild(slideContainer);
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

function drawTerrain(container) {
   let slide = configuration.slides[0];
   let terrain = slide.terrain;
   let spriteMap = terrain.sprites;
   let spriteSize = 16; /*expecting a square sprite*/
   let columns = Math.floor(configuration.size.width/spriteSize); /*how many columns there are*/
   for (var i = 0, len = terrain.map.length; i < len; i++) {
      var x = (i % columns) * spriteSize;
      var y = Math.floor(i / columns) * spriteSize;
      var spriteCode = terrain.map[i];
      if(spriteCode !== '') {
         let spriteName = spriteMap[spriteCode];
         var sprite = new Sprite(resources[imageNames.terrain].textures[spriteName]);
         sprite.x = x;
         sprite.y = y;
         container.addChild(sprite);
      }
   }
}

function drawSlide(number) {
   let slide = configuration.slides[number];
   let container = new Container();
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
         container.addChild(tile);
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
      container.addChild(text);
   }
   return container;
}

function addPlayer(container){
   //use https://www.leshylabs.com/apps/sstool/
   let playerSp = resources[imageNames.player].spritesheet;
   player = new Player(playerSp, container);
}

function gameLoop(delta){
   //Update the current game state
   state(delta);
}

function play(delta){
   player.update();
}

