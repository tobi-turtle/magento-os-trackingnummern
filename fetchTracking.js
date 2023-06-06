import X2JS from "x2js";
const soapRequestXml = new X2JS();

export default async function (order_id) {
    try {
        const response = await fetch(
            "http://remote.wsmfunsport.de:8080/soap/IProducts",
            {
                method: "POST",
                headers: { "Content-Type": "text/xml" },
                body: `<Envelope xmlns=\"http://schemas.xmlsoap.org/soap/envelope/\">\r\n    <Body>\r\n        <getTrackingInfo xmlns=\"http://tempuri.org/                           \">\r\n                                  <webOrderNo>${order_id}</webOrderNo>\r\n        </getTrackingInfo>\r\n    </Body>\r\n</Envelope>`,
                redirect: "follow",
            }
        );
        const result = await response.text();
        const trackingToConvert = soapRequestXml.xml2js(result);
        const tracking =
            trackingToConvert.Envelope.Body.getTrackingInfoResponse.return.item;
        return tracking;
    } catch (err) {
        console.log(err);
    }
}
