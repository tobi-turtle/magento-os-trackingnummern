// Create dynamic date of last month for url
const date = new Date();
const month = date.getMonth();
date.setMonth(date.getMonth() - 1);

// If still in same month, set date to last day of previous month
if (date.getMonth() == month) date.setDate(0);
date.setHours(0, 0, 0, 0);
//format date to YYYY-MM-DD
const formatYmd = (date) => date.toISOString().slice(0, 10);
const urlDate = formatYmd(date); //"2023-05-30"; // formatYmd(date);

export default async function () {
    const url = `https://www.online-surfshop.de/rest/default/V1/orders?searchCriteria[filter_groups][0][filters][0][field]=created_at&searchCriteria[filter_groups][0][filters][0][value]=${urlDate}&searchCriteria[filter_groups][0][filters][0][condition_type]=gt`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer fyc5i5n9t7odji8k7zv52xokx6gabq2m",
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
