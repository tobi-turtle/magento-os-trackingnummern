import "dotenv/config";
export default async function (qtyObject) {
    try {
        const url = `${process.env.MAGENTO_SHOP_URL}/rest/default/V1/inventory/source-items`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: process.env.MAGENTO_API_KEY,
            },
            body: JSON.stringify(qtyObject),
        });
        const data = await response.json();
    } catch (err) {
        console.log(err);
    }
}
