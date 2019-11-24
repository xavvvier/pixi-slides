import {Player} from './player.js';
import {keyboard} from './keyboard.js';

//Aliases
let Application = PIXI.Application,
   loader = PIXI.loader,
   resources = PIXI.loader.resources,
   Sprite = PIXI.Sprite,
   Rectangle = PIXI.Rectangle,
   Texture = PIXI.Texture,
   TextureCache = PIXI.utils.TextureCache;

//Create a Pixi Application
let app = new Application(
   {
      width: window.innerWidth, 
      height: window.innerHeight
   }
);

let player;
//Set the game state 
let state = play;

let imageNames = {
   hunterAtlas: 'images/treasureHunter.json',
   player: 'images/player.json'
}

//Add the canvas to the document
document.body.appendChild(app.view);

app.renderer.backgroundColor = 0x061639;

//load images and call the setup function when done
loader.add([
   imageNames.hunterAtlas,
   imageNames.player
]).load(setup);

function setup(){
  //Use TextureCache to create the sprites based on the atlas 
   //This is only one of three ways of making sprites using texture atlas
   //see: https://github.com/kittykatattack/learningPixi#creating-sprites-from-a-loaded-texture-atlas
   let dungeon = new Sprite(
      resources[imageNames.hunterAtlas].textures['dungeon.png']
   );
   app.stage.addChild(dungeon);
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

