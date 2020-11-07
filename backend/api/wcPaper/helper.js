const geoArea = require('geo-area')(/*options*/{x: 'lng', y: 'lat'});

exports.module.getArea = (polygon) => {
    return geoArea(polygon)
}