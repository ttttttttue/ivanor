export const statuses = [
  { id: 1, value: "1", label: "Заказ обрабатывается" },
  { id: 2, value: "2", label: "Заказ обработан" },
  { id: 3, value: "3", label: "Не хватило товара для резервирования" },
  { id: 4, value: "4", label: "Заказ выполнен" },
  { id: 5, value: "5", label: "Заказ отменен" },
  { id: 6, value: "6", label: "Заказ зарезервирован" },
];

export const statusInfo = {
  4: { color: "darkgreen", class: "status-completed" },
  6: { color: "green", class: "status-reserved" },
  5: { color: "red", class: "status-cancelled" },
  default: { color: "black", class: "status-processing" },
};

export const getStatusInfo = (statusId) =>
  statusInfo[statusId] || statusInfo.default;

export const getStatusLabel = (statusId) => {
  const status = statuses.find((s) => s.id === parseInt(statusId));
  return status ? status.label : "Неизвестный статус";
};
