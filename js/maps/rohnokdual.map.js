var Map = {
    asteroids:[
        {x: 134, y: 62},
        {x: 100,  y: 83},
        {x: 66,  y: 122},
        {x: 52,  y: 161}
    ],
    
    spawns:[
        {x: 182, y: 186, miners: [
            {x: 158, y: 124},
            {x: 141, y: 134},
            {x: 124, y: 154},
            {x: 117, y: 173}
        ]}
    ],
    
    background: ''+
        '<div style="position: relative; width: 500px; height: 500px; background-image: url(\'images/maps/planet.jpg\'); left: 125px; top: 125px"></div>',

    miscellaneous:{
        maxPopulation: 100,
        width: 2500,
        height: 1000
    }
    
}