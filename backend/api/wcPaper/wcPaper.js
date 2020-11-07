 const got = require('got');
 var getPixels = require("get-pixels")
 const util = require('util');
 const getPixelsAsync = util.promisify(getPixels);
 const { getAream2 } = require('./helper');


  [
    15.255205,
    46.569955
  ],
  [
    15.284724,
    46.539263
  ]
  46.496974
const poly = [
    {lat: 46.539263, lng: 15.284724},
     {lat: 46.496974, lng: 15.351313},
    {lat: 46.532178, lng: 15.378086},
    {lat: 46.571843, lng: 15.304632},
    {lat: 46.569955, lng: 15.255205},
    {lat: 46.539263, lng: 15.284724},
]

 const requestBuilderWMS = async (polygon) => {
     let string1 = ''
     polygon.forEach(element => {
         string1+= `${element.lng} ${element.lat},`
     });
     string1 = string1.substring(0, string1.length - 1);
     // hardcoded instance id, beacuse im too tired to put it in env, sry whoever is reading this.
     const apiString = `403fc28f-678e-4fd5-b629-640bab5faff7?REQUEST=GetMap&CRS=CRS:84&GEOMETRY=POLYGON ((${string1}))&LAYERS=NDVI&WIDTH=512&HEIGHT=453&FORMAT=image/png`
     let iterator = {}
     const rgb = []
     const result = await getPixelsAsync(`https://services.sentinel-hub.com/ogc/wms/${apiString}`)
     // weird u8array, spent wayy too much time on this that im willing to admin.
     iterator = result.data.values()
     // create something readable for my fried brains.
     for (i = 0; i < result.data.length; i+=4) {
         const tmp = [iterator.next().value,iterator.next().value, iterator.next().value, iterator.next().value]
         rgb.push(tmp)
       } 
     return {rgb, apiString: `https://services.sentinel-hub.com/ogc/wms/${apiString}`}
 }

 

 const areaCalucation = async (pixels, area) => {
    let forestPixel = 0
    let all = 0
    let notPoligon = 0
     pixels.forEach(pixel => {

        if(pixel[0] > 40 && pixel[0] < 60 && pixel[1] > 200 && pixel[2] > 200) forestPixel++;
        if(pixel[0] < 60 && pixel[1] > 85 && pixel[1] < 140 && pixel[2] > 85 && pixel[2] < 140) forestPixel++;
        all++
        // find white and black pixels.
        if((pixel[0] === 255 && pixel[2] === 255 && pixel[1] === 255)
        || (pixel[2] < 10 && pixel[1] < 10)) {
            notPoligon++;
        }
     })
     const ration = forestPixel/(1-notPoligon)
     return forestPixel*area
 }

exports.getArea = async (req, res) => {
   
    try {

        const {rgb, apiString} = await requestBuilderWMS(poly)
        const allArea = getAream2(poly)

        const area = await areaCalucation(rgb, allArea)
        
        return res.json({'m2': area, 'uri': apiString})
    } catch (error) {
        console.log(error)
        return res.status(404).send('Error occured while .', error)
    }
}