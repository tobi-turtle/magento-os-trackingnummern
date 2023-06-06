export default async function (qtyObject) {
    try {
        const url =
            "https://www.online-surfshop.de/rest/default/V1/inventory/source-items";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer fyc5i5n9t7odji8k7zv52xokx6gabq2m",
            },
            body: JSON.stringify(qtyObject),
        });
        const data = await response.json();
    } catch (err) {
        console.log(err);
    }
}
