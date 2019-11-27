let defaultMap =  'aggggggggggggggggggggggggggggggggggggggb' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'e                                      f' +
           'hnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnni' +
           'jooooooooooooooooooooooooooooooooooooook';
let defaultSprites = {
               a: 'wood-a1',
               b: 'wood-a2',
               c: 'wood-a3',
               d: 'wood-a4',
               e: 'wood-r',
               f: 'wood-l',
               g: 'shingle-b',
               h: 'grassg-tl',
               i: 'grassg-tr',
               j: 'grassg-bl',
               k: 'grassg-br',
               l: 'grassg-r',
               m: 'grassg-l',
               n: 'grassg-t',
               o: 'grassg-b',
               p: 'grassg-c'
            };

export const configuration = {
   size: {
      width: 640, 
      height: 480
   },
   slides: [
      {
         lines: [
            {x: 175, y: 50,  content: "Javier Gonzalez", size: 40, color: 'black'},
            {x: 70, y: 140, content: "NSCC 2nd-year student", size: 25, color: 'blue'},
            {x: 70, y: 220, content: "IT Web Development", size: 25},
            {x: 70 , y: 290, content: "Why NSCC?", size: 25 },
            {x: 70 , y: 360, content: "Canada...", size: 25, color: 'red' },
            {x: 170 , y: 360, content: " and $$$ off course", size: 25, color: 'green' }
         ],
         background: 'images/background/brown.png', /*select anyone in the images/background/ folder*/
         terrain: {
            map: defaultMap,
            sprites: defaultSprites
         }
      },
      {
         lines: [
            {x: 182, y: 57, content: "Educational Goals", size: 40},
            {x: 50, y: 120, content: "Problem Solving", size: 22, color: 'green'},
            {x: 50, y: 150, content: "It is not just about writing code... \nIt is about creating solutions", size: 16, color: 'green'},
            {x: 50, y: 230, content: "Teamwork", size: 22, color: 'blue'},
            {x: 50, y: 260, content: "Coordinate efforts with different people to achieve a common cause", size: 16, color: 'blue'},
            {x: 50, y: 330, content: "Adaptability", size: 22, color: 'purple'},
            {x: 50, y: 360, content: "Adjust to an ever changing environment", size: 16, color: 'purple'}
         ],
         background: 'images/background/yellow.png', /*select anyone in the images/background/ folder*/
         terrain: {
            map: defaultMap,
            sprites: defaultSprites
         }
      },
      {
         lines: [
            {x: 180, y: 57, content: "Career goals", size: 40, color: 'black'},
            {x: 60, y: 160, content: "Functional programming", size: 32},
            {x: 60, y: 220, content: "Fault-tolerant systems", size: 32},
            {x: 60, y: 280, content: "Scalable applications", size: 32},
            {x: 60, y: 340, content: "Postgresql", size: 32},
            {x: 340, y: 340, content: "Erlang Developer", size: 32, color: '#a90832'},
         ],
         background: 'images/background/green.png', /*select anyone in the images/background/ folder*/
         terrain: {
            map: defaultMap,
            sprites: defaultSprites
         }
      },
      {
         lines: [
            {x: 180, y: 57, content: "Portfolio artifacts", size: 40, color: 'black'},
            {x: 60, y: 160, content: "Game Jam", size: 32},
            {x: 60, y: 220, content: "WordReference Downloader Plugin", size: 32},
            {x: 60, y: 280, content: "Audiogram (SOS)", size: 32},
         ],
         background: 'images/background/purple.png', /*select anyone in the images/background/ folder*/
         terrain: {
            map: defaultMap,
            sprites: defaultSprites
         }
      },
      {
         lines: [
            {x: 220, y: 200, content: "Questions", size: 50, color: 'black'},
            {x: 300, y: 250, content: "?", size: 70, color: 'green'}
         ],
         background: 'images/background/pink.png', /*select anyone in the images/background/ folder*/
         terrain: {
            map: defaultMap,
            sprites: defaultSprites
         }
      }
   ]
};
