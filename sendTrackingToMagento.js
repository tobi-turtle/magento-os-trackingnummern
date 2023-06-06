import "dotenv/config";
export default async function (entity_id, trackingObject) {
    try {
        const url = `${process.env.MAGENTO_SHOP_URL}/rest/V1/order/${entity_id}/ship`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: process.env.MAGENTO_API_KEY,
            },
            body: JSON.stringify(trackingObject),
        });
        const data = await response.json();
        //console.log(data);
    } catch (err) {
        console.log(err);
    }
}
