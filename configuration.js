export const configuration = {
   size: {
      width: 640, 
      height: 480
   },
   slides: [
      {
         background: 'images/background/brown.png', /*select anyone in the images/background/ folder*/
         terrain: {
            /* 896/16 = 56 columnas? */
            map: [
               4,0,0,0,0,0,0,0,5
            ],
            sprites: [
               'rock-t',
               'rock-b',
               'rock-l',
               'rock-r',
               'rock-tl',
               'rock-tr',
               'rock-br',
               'rock-lr'
            ]
         },
         lines: [
            {content: "Top left", size: 20, color: 'white'},
            {content: "Bottom Right", size: 32, x: 700, y: 550, color: 'red'},
            {content: "Line 3", size: 32, x: 20, y: 140},
            {content: "Line 4", size: 32, x: 20, y: 160},
            {content: "Line 5", size: 32, x: 20, y: 180},
         ]
      }
   ]
};
