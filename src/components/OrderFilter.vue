<template>
  <div class="order-filter">
    <div class="filter-section">
      <input
        type="text"
        v-model="filterData.orderNumber"
        placeholder="Номер заказа"
      />
      <button @click="searchOrder">Искать</button>
    </div>
    <div class="filter-section">
      <input
        type="date"
        v-model="filterData.dateFrom"
        min="2024-05-01"
        max="2024-06-30"
        v
      />
      <input
        type="date"
        v-model="filterData.dateTo"
        min="2024-05-01"
        max="2024-06-30"
      />
      <select v-model="filterData.selectedStatus">
        <option value="">Все статусы</option>
        <option
          v-for="status in statuses"
          :key="status.value"
          :value="status.value"
        >
          {{ status.label }}
        </option>
      </select>
      <button @click="applyFilter">Применить фильтры</button>
      <button @click="resetFilters">Сбросить фильтры</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { statuses } from "../utils/orderStatus";

const emit = defineEmits(["filter", "reset"]);

const filterData = reactive({
  orderNumber: "",
  dateFrom: "2024-05-01",
  dateTo: "2024-06-30",
  selectedStatus: "",
});

const searchOrder = () => {
  const trimmedOrderNumber = filterData.orderNumber.trim();
  emit("filter", { orderNumber: trimmedOrderNumber });
};

const applyFilter = () => {
  emit("filter", {
    dateFrom: filterData.dateFrom,
    dateTo: filterData.dateTo,
    orderStatus: filterData.selectedStatus,
  });
};

const resetFilters = () => {
  filterData.orderNumber = "";
  filterData.dateFrom = "2024-05-01";
  filterData.dateTo = "2024-06-30";
  filterData.selectedStatus = "";
  emit("reset");
};
</script>

<style scoped>
.order-filter {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 20px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  min-width: 200px;
}
</style>
