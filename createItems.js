export default function (items) {
    const orderedItems = [];
    for (const item of items) {
        const orderedItem = {
            qty_ordered: item.qty_ordered,
            sku: item.sku,
            item_id: item.item_id,
            name: item.name,
            qty_shipped: item.qty_shipped,
            product_type: item.product_type,
            parent_item: item.parent_item ? true : false,
        };
        if (
            item.qty_ordered !== item.qty_shipped &&
            orderedItem.parent_item === false
        ) {
            orderedItems.push(orderedItem);
        }
    }

    return orderedItems;
}
