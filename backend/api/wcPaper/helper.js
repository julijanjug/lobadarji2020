const geoArea = require('geo-area')(/*options*/{x: 'lng', y: 'lat'});

exports.getAream2 = (polygon) => {
    const newPolygon = [];
    polygon.forEach(element => {
        console.log('element: ', element);
        // mogoče bo treba zamenjat, pri julianu
        newPolygon.push({lat: element[0], lng: element[1]});
    });
    
    return geoArea(newPolygon)
}