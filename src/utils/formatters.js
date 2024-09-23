export const formatOrderDates = (order) => ({
  ...order,
  formattedDate: new Date(order.created).toLocaleDateString("ru-RU"),
  formattedTime: new Date(order.created).toLocaleTimeString("ru-RU"),
  formattedShipmentDate: new Date(order.shipment.date).toLocaleDateString(
    "ru-RU",
  ),
});
