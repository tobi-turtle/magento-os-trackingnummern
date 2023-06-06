import fetchTracking from "./fetchTracking.js";
import createItems from "./createItems.js";
import fs from "fs/promises";

export default async function (data) {
    try {
        const orders = [];
        for (const order of data) {
            const items = createItems(order.items);
            // console.log(items.length, order.increment_id);
            if (items.length > 0 && order.status !== "closed") {
                const buildShipment = {
                    increment_id: order.increment_id,
                    entity_id: order.entity_id,
                    created_at: order.created_at,
                    status: order.status,
                    items: items, // createItems function
                    tracking: await fetchTracking(order.increment_id),
                };
                orders.push(buildShipment);
            }
        }
        // delete fs write file for production
        await fs.writeFile("shipments.json", JSON.stringify(orders));
        console.log("Finished createShipments - Total ", orders.length);
        return orders;
    } catch (err) {
        console.log(err);
    }
}
