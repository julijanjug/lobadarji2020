const geoArea = require('geo-area')(/*options*/{x: 'lng', y: 'lat'});

exports.getAream2 = (polygon) => {
    return geoArea(polygon)
}