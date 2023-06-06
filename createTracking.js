import fs from "fs/promises";
import sendTrackingToMagento from "./sendTrackingToMagento.js";
import sendQtyToMagento from "./sendQtyToMagento.js";

export default async function (shipments) {
    const log = [];
    try {
        for (const shipment of shipments) {
            if (shipment.tracking !== "nicht gefunden") {
                for (const item of shipment.items) {
                    if (
                        shipment.tracking[
                            shipment.tracking.findIndex((i) => i === item.sku) -
                                1
                        ] !== undefined
                    ) {
                        const trackingNumber =
                            shipment.tracking[
                                shipment.tracking.findIndex(
                                    (i) => i === item.sku
                                ) - 1
                            ];
                        const trackingQty =
                            shipment.tracking[
                                shipment.tracking.findIndex(
                                    (i) => i === item.sku
                                ) + 1
                            ];
                        const trackingCarrierCode =
                            shipment.tracking[
                                shipment.tracking.findIndex(
                                    (i) => i === item.sku
                                ) + 2
                            ];
                        const trackingCarrierTitel =
                            shipment.tracking[
                                shipment.tracking.findIndex(
                                    (i) => i === item.sku
                                ) + 2
                            ];

                        const trackingObject = {
                            items: [
                                {
                                    order_item_id: item.item_id,
                                    qty: Number(trackingQty), // aus Tracking
                                },
                            ],
                            notify: true,
                            tracks: [
                                {
                                    track_number:
                                        trackingNumber === ""
                                            ? "nicht gefunden"
                                            : trackingNumber,
                                    title: trackingCarrierTitel,
                                    carrier_code: trackingCarrierCode,
                                },
                            ],
                            arguments: {
                                extension_attributes: {
                                    source_code: "wareneingangslager-00120",
                                },
                            },
                        };
                        const qtyObject = {
                            sourceItems: [
                                {
                                    sku: item.sku,
                                    source_code: "wareneingangslager-00120",
                                    quantity: Number(trackingQty),
                                    status: 0,
                                },
                            ],
                        };

                        await sendQtyToMagento(qtyObject);

                        console.log(
                            shipment.entity_id,
                            " ID ",
                            shipment.increment_id,
                            " ",
                            trackingObject
                        );
                        await sendTrackingToMagento(
                            shipment.entity_id,
                            trackingObject
                        );

                        log.push(shipment.increment_id);
                    }
                }
            }
        }
    } catch (err) {
        console.log(err);
    }

    await fs.writeFile("tracking.json", JSON.stringify(log));
    console.log("Finished createTracking - Total ", log.length);
}
