const express = require('express'),
      routes = express.Router(),
      {getDistance} = require('geolib');

routes.route('/:id/location').post((req,res)=>{
    const newLocation = req.body,
    vehicleId = req.params.id,
    newLat = newLocation.la,
    newLong = newLocation.lo;
    console.log(vehicleId,' ',newLat,' ',newLong);
    
    let isHighlighted = false;

    if(req.app.vechiles[vehicleId]){
        const vechileOldLocation = req.app.vechiles[vehicleId],
            lat = vechileOldLocation.lat,
            long = vechileOldLocation.long,
            ts = vechileOldLocation.ts,
            timeDiffInSecs = (ts.getTime()-new Date().getTime())/1000;
        if(timeDiffInSecs<=11){
            const distance = getDistance(
                {latitude:lat, longitude:long},
                {latitude: newLat,longitude:newLong},
                0.01);
                console.log(distance/1000);
        if(distance <1){
            isHighlighted = true;
            req.app.io.emit('vechile-error',{vehicleId});
         }
     }
 }

 console.log(isHighlighted);
    req.app.vechiles[vehicleId]={
        id: vehicleId,
        lat: newLat,
        long: newLong,
        ts: new Date(),
        Highlighted: isHighlighted
    }
    if(!isHighlighted){
        req.app.io.emit('vechile-update',req.app.vechiles[vehicleId]);
    }
    res.send(true);
});

routes.route('/vehicle').get((req,res)=>{
    console.log('called');
    res.json(req.app.vechiles);
});

module.exports  = routes;