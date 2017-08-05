var data = {
    "images": ["images/spritesheet.png"],
    "frames": [
        [768, 512, 256, 256], //play
        [1280, 512, 256, 256],//play
        [512, 768, 256, 256],//optionsblue
        [2304, 512, 256, 256],//options red
        [3328, 512, 256, 256],//credits blue
        [256, 768, 256, 256],//credits blue
        [3584, 512, 256, 256],//exit blue
        [0, 768, 256, 256]//exit red
    ],

    "animations": {
        "butPlay": { frames: [0], "speed": 2.1 },
        "butPlay2": { frames: [1], "speed": 2.1 },
        "butOptions": { frames: [2, 3], "speed": 2.1 },
        "butCredits": { frames: [4, 5], "speed": 2.1 },
        "butExit": { frames: [6, 7], "speed": 2.1 }
        //"playButton2":[2]
        //"x":0,"y":2176,"w":640,"h":640
    }
};

