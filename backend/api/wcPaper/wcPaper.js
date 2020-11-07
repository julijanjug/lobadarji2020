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

        console.log("Auth token: " + authToken);

        const layerS2L2A = new S2L2ALayer({
            instanceId: 'b713da99-cb77-4cbd-83d1-632a7c6240c9',
            layerId: 'VEGETACIJA',
            maxCloudCoverPercent: 30,
        });

        //parametri za layer
        const bbox = new BBox(CRS_EPSG4326, 18, 20, 20, 22);
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
            width: 512,
            height: 512,
            format: MimeTypes.JPEG,
        };

        setDebugEnabled(true);
        const imageBlob = await layerS2L2A.getMap(getMapParams, ApiType.WMS);
        setDebugEnabled(false);


        return res.status(200).json({"image": imageBlob})
    } catch (error) {
        console.log(error)
        return res.status(404).send('Error occured while .')
    }
}