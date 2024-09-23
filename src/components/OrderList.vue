<template>
  <div class="order-list">
    <OrderFilter @filter="handleFilter" @reset="resetFilters" />
    <div class="order-summary search">
      <p v-if="loading">Идет поиск заказов...</p>
      <p v-else>Найдено {{ orders.length }} заказов</p>
    </div>
    <OrderTable :orders="orders" @view-detail="viewOrderDetail" />
    <OrderDetailModal
      v-if="showModal"
      :order="selectedOrder"
      @close="closeModal"
    />
    <div v-if="loading" class="order-summary">
      <p class="loading-message">Загрузка...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useOrders } from "../hooks/useOrders";
import OrderFilter from "./OrderFilter.vue";
import OrderTable from "./OrderTable.vue";

const {
  orders,
  selectedOrder,
  showModal,
  loading,
  fetchOrders,
  viewOrderDetail,
  closeModal,
} = useOrders();

const handleFilter = async (params) => {
  if (params.orderNumber) {
    await viewOrderDetail(params.orderNumber);
  } else {
    await fetchOrders(params);
  }
};

const resetFilters = () => {
  fetchOrders({});
};

onMounted(() => {
  fetchOrders({});
});
</script>

<style scoped>
.order-summary {
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.2em;
  color: #555;
}

.search {
  text-align: left;
}
.loading-message {
  display: inline-block;
  position: relative;
  padding-left: 30px;
  color: #555;
}

.loading-message::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: 2px solid #ff7a15;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: translateY(-50%) rotate(360deg);
  }
}
</style>
