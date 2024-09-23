import { ref, computed } from "vue";
import { getOrders, getOrderByOrderNumber } from "../services/api";
import { formatOrderDates } from "../utils/formatters";
import { useToast } from "vue-toastification";

export const useOrders = () => {
  const toast = useToast();
  const orders = ref([]);
  const selectedOrder = ref(null);
  const showModal = ref(false);
  const loading = ref(false);

  const formattedOrders = computed(() => orders.value.map(formatOrderDates));

  const fetchOrders = async (params) => {
    try {
      loading.value = true;
      const data = await getOrders(params);
      orders.value = data.orders.map(formatOrderDates);
    } catch (error) {
      console.warn("Ошибка при получении заказов:", error);
      toast.error("Ошибка при получении заказов.");
    } finally {
      loading.value = false;
    }
  };

  const viewOrderDetail = async (orderNumber) => {
    try {
      const order = orders.value.find((o) => o.uid1c === orderNumber);
      if (!order) {
        throw new Error("Заказ не найден");
      }
      const data = await getOrderByOrderNumber(order.id);
      selectedOrder.value = formatOrderDates(data.order);
      showModal.value = true;
    } catch (error) {
      toast.error(`Ошибка: ${error.message}`);
      console.warn("Ошибка при получении деталей заказа:", error);
    }
  };

  const closeModal = () => {
    showModal.value = false;
    selectedOrder.value = null;
  };

  return {
    orders: formattedOrders,
    selectedOrder,
    showModal,
    loading,
    fetchOrders,
    viewOrderDetail,
    closeModal,
  };
};
