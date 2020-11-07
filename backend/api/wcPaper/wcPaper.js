 const got = require('got');
 var getPixels = require("get-pixels")
 const util = require('util');
 const getPixelsAsync = util.promisify(getPixels);


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
     console.log('string', string1)
     const apiString = `403fc28f-678e-4fd5-b629-640bab5faff7?REQUEST=GetMap&CRS=CRS:84&GEOMETRY=POLYGON ((${string1}))&LAYERS=NDVI&WIDTH=512&HEIGHT=453&FORMAT=image/png`
     console.log('apiString: ', apiString);
     let iterator = {}
     let count = 1
     const rgb = []
     const result = await getPixelsAsync(`https://services.sentinel-hub.com/ogc/wms/${apiString}`)
     console.log('`string ', `https://services.sentinel-hub.com/ogc/wms/${apiString}`);
     iterator = result.data.values()
     for (i = 0; i < result.data.length; i+=4) {
         const tmp = [iterator.next().value,iterator.next().value, iterator.next().value, iterator.next().value]
         rgb.push(tmp)
       } 
       console.log('rgb: ');
     return rgb
    /* await getPixels(`https://services.sentinel-hub.com/ogc/wms/${apiString}`, function(err, pixels) {
         if(err) {
             console.log("Bad image path")
            }
            const iterator = pixels.data.values()
            for (i = 0; i < pixels.data.length; i+=4) {
                const tmp = [iterator.next().value,iterator.next().value, iterator.next().value, iterator.next().value]
                rgb.push(tmp)
              } 
              console.log('rgb: ');
            return rgb
      })*/
    //const response = await got(apiString, {prefixUrl: 'https://services.sentinel-hub.com/ogc/wms/'});
 }

 

 const areaCalucation = async (pixels) => {
     console.log('pixels: ', pixels);
    
    let count = 0
     pixels.forEach(pixel => {

        if(pixel[0] > 40 && pixel[0] < 60 && pixel[1] > 200 && pixel[2] > 200) count++;

     })
     console.log('count: ', count);
     return count
 }

exports.getArea = async (req, res) => {
    console.log("request recieved")
    try {
        const response = await requestBuilderWMS(poly)
        console.log('response: ');
        const area = await areaCalucation(response)
        console.log('area: ', area);

        return res.json({'number': area})
    } catch (error) {
        console.log(error)
        return res.status(404).send('Error occured while .', error)
    }
}