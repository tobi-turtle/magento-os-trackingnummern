import fetchMagentoOrders from "./fetchMagentoOrders.js";
import createShipments from "./createShipments.js";
import createTracking from "./createTracking.js";

// Process Flow of the script
// 1. fetchMagentoOrders
// 2. createShipments
// 2a. fetchTracking
// 3. createTracking
// 4. sendTrackingToMagento
// 4a. sendQtyToMagento
// 4b. sendTrackingToMagento

(async () => {
    try {
        //fetch all orders from Magento last month till today
        const data = await fetchMagentoOrders();
        //create new shipments array. Validating the data before sending it to the API. Array has only not shipped orders.
        const shipments = await createShipments(data);
        //create Tracking and send Tracking to API
        await createTracking(shipments);
    } catch (err) {
        console.log(err);
    }
})();
