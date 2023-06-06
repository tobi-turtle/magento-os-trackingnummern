export default async function (entity_id, trackingObject) {
    try {
        const url = `https://www.online-surfshop.de/rest/V1/order/${entity_id}/ship`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer fyc5i5n9t7odji8k7zv52xokx6gabq2m",
            },
            body: JSON.stringify(trackingObject),
        });
        const data = await response.json();
        //console.log(data);
    } catch (err) {
        console.log(err);
    }
}
