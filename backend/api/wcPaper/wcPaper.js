 const { setAuthToken, requestAuthToken } = require('@sentinel-hub/sentinelhub-js');
 const { S2L2ALayer } = require('@sentinel-hub/sentinelhub-js');
 const { BBox, CRS_EPSG4326, MimeTypes, ApiType } = require('@sentinel-hub/sentinelhub-js');
 const { setDebugEnabled } =require('@sentinel-hub/sentinelhub-js');

exports.getArea = async (req, res) => {
    console.log("request recieved")
    try {

        //avtentikacija
        const clientId = "6c73b735-f9fe-4d52-8cc6-c06b06e661a2";
        const clientSecret = "q~9!W*_P7p4,QKiTrl(emxxxm^~O}8+FDxufkG&A";
        const authToken = await requestAuthToken(clientId, clientSecret);

        setAuthToken(authToken);

        //console.log("Auth token: " + authToken);

        const layerS2L2A = new S2L2ALayer({
            instanceId: 'b713da99-cb77-4cbd-83d1-632a7c6240c9',
            layerId: 'VEGETACIJA',
            maxCloudCoverPercent: 30,
        });

        //parametri za layer
        const bbox = new BBox(CRS_EPSG4326, 18.0, 18.0, 18.3, 18.3);
        const fromTime = new Date(Date.UTC(2018, 11 - 1, 22, 0, 0, 0));
        const toTime = new Date(Date.UTC(2018, 12 - 1, 22, 23, 59, 59));

        //najdi, kdaj so se slikale slike
        const datesS2L2A = await layerS2L2A.findDatesUTC(bbox, fromTime, toTime);
        //const flyoversS2L2A = await layerS2L2A.findFlyovers(bbox, fromTime, toTime);

        //pridobitev slik
        const getMapParams = {
            bbox: bbox,
            fromTime: new Date(Date.UTC(2018, 11 - 1, 22, 0, 0, 0)),
            toTime: new Date(Date.UTC(2018, 12 - 1, 22, 23, 59, 59)),
            width: 100,
            height: 100,
            format: MimeTypes.JPEG,
            preview: 2,
        };

        const imageBlob = await layerS2L2A.getMap(getMapParams, ApiType.WMS);


        return res.status(200).json({"image": imageBlob})
    } catch (error) {
        console.log(error)
        return res.status(404).send('Error occured while .')
    }
}

exports.getTpQuantity = (req, res) => {
    //input
    var povrsina = req.params['povrsina'];
    var tip_gozda = req.params['tip_gozda'];

    var avg_r_smkreka = 0.4;
    var avg_r_bukev = 0.35;
    var avg_h_smreka = 30;
    var avg_h_bukev = 25;

    //volumen smreke 
    var avg_V_smreka = 3.14 * avg_r_smkreka * avg_r_smkreka * avg_h_smreka;
    var avg_V_bukev = 3.14 * avg_r_bukev * avg_r_bukev * avg_h_bukev;

    //eno drevo na približno 6m2
    var dreves_na_m2 = 1/6;
    var st_dreves = povrsina * dreves_na_m2;

    //volumen gozda glede na tip
    var volumen_gozda = 0;
    if(tip_gozda == tip.bukev) {volumen_gozda = st_dreves * avg_V_bukev;}
    else if (tip_gozda == tip.smreka) {volumen_gozda = st_dreves * avg_V_smreka;}
    else {volumen_gozda = st_dreves * (avg_V_smreka + avg_V_bukev) / 2;}

    //1400 rolic na 
    var rolic_na_m2 = 1400;
    return volumen_gozda * rolic_na_m2;
}