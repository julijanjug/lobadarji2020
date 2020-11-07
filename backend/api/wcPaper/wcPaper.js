 const got = require('got');
 var getPixels = require("get-pixels")


const poly = [
    {lat: 46.05809692060124, lng: 14.832648038864138},
     {lat: 46.057858678604, lng: 14.832787513732912},
    {lat: 46.057858678604, lng: 14.832755327224731},
    {lat: 46.05778422776906, lng: 14.832551479339601},
    {lat: 46.05777678268005, lng: 14.832487106323244},
    {lat: 46.0576502160132, lng: 14.832133054733278},
    {lat: 46.05809692060124, lng: 14.832648038864138}
]

 const requestBuilderWMS = async (polygon) => {
     let string1 = ''
     polygon.forEach(element => {
         string1+= `${element.lat} ${element.lat},`
     });
     string1 = string1.substring(0, string1.length - 1);
     console.log('string', string1)
     const apiString = `403fc28f-678e-4fd5-b629-640bab5faff7?REQUEST=GetMap&CRS=CRS:84&GEOMETRY=POLYGON ((${string1}))&LAYERS=NDVI&WIDTH=512&HEIGHT=453&FORMAT=image/png`
     console.log('apiString: ', apiString);
     let iterator = {}
     let count = 1
     const rgb = []
     getPixels(`https://services.sentinel-hub.com/ogc/wms/${apiString}`, function(err, pixels) {
         
         if(err) {
             console.log("Bad image path")
            }
            const iterator = pixels.data.values()
            for (i = 0; i < pixels.data.length; i+=4) {
                const tmp = [iterator.next().value,iterator.next().value, iterator.next().value, iterator.next().value]
                rgb.push(tmp)
              } 
              console.log('rgb: ', rgb);
              return rgb
      })
    //const response = await got(apiString, {prefixUrl: 'https://services.sentinel-hub.com/ogc/wms/'});
 }
 

exports.getArea = async (req, res) => {
    console.log("request recieved")
    try {
        const response = await requestBuilderWMS(poly)
        const area = await areaCalucation(response)
        console.log('response: ', response);

        return res.status(200).send(response)
    } catch (error) {
        console.log(error)
        return res.status(404).send('Error occured while .', error)
    }
}