export const configuration = {
   size: {
      width: 640, 
      height: 480
   },
   slides: [
      {
         background: 'images/background/brown.png', /*select anyone in the images/background/ folder*/
         terrain: {
            map: 'aggggggggggggggggggggggggggggggggggggggb' +
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
                 'jooooooooooooooooooooooooooooooooooooook' 
            ,
            sprites: {
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
            }
         },
         lines: [
            {content: "Top left", size: 20, color: 'white',x:18, y:20},
            {content: "Bottom Right", size: 32, x: 440, y: 420, color: 'red'},
            {content: "Line 3", size: 32, x: 20, y: 140},
            {content: "Line 4", size: 32, x: 20, y: 160},
            {content: "Line 5", size: 32, x: 20, y: 180},
         ]
      }
   ]
};
