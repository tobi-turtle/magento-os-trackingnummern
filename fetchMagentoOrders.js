// Create dynamic date of last month for url
import "dotenv/config";
const date = new Date();
const month = date.getMonth();
date.setMonth(date.getMonth() - 1);

// If still in same month, set date to last day of previous month
if (date.getMonth() == month) date.setDate(0);
date.setHours(0, 0, 0, 0);
//format date to YYYY-MM-DD
const formatYmd = (date) => date.toISOString().slice(0, 10);
const urlDate = "2023-06-06"; //"2023-06-06"; // formatYmd(date);

export default async function () {
    const url = `https://www.online-surfshop.de/rest/default/V1/orders?searchCriteria[filter_groups][0][filters][0][field]=created_at&searchCriteria[filter_groups][0][filters][0][value]=${urlDate}&searchCriteria[filter_groups][0][filters][0][condition_type]=gt`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: process.env.MAGENTO_API_KEY,
            },
        });

        const data = await response.json();
        //await fs.writeFile("orders.json", JSON.stringify(data.items));
        console.log("Finished fetchMagentoOrders - Total ", data.items.length);
        return data.items;
    } catch (err) {
        console.log(err);
    }
}
