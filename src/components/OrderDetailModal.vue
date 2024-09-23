<template>
  <div v-show="order" class="modal">
    <div class="modal-content">
      <button class="close" @click="closeModal" aria-label="Закрыть">
        &times;
      </button>
      <h2>Детали заказа № {{ order.uid1c }}</h2>
      <div class="order-summary">
        <div class="summary-item">
          <span class="label">Дата создания:</span>
          <span class="value"
            >{{ order.formattedDate }} {{ order.formattedTime }}</span
          >
        </div>
        <div class="summary-item">
          <span class="label">Статус заказа:</span>
          <span
            class="value status"
            :class="getStatusInfo(order.status.id).class"
          >
            {{ order.status.title }}
          </span>
        </div>
      </div>
      <div class="details-grid">
        <div class="details-section">
          <h3>Клиент</h3>
          <div class="detail-item">
            <span class="label">ФИО:</span>
            <span class="value"
              >{{ order.client.firstname }} {{ order.client.lastname }}</span
            >
          </div>
          <div class="detail-item">
            <span class="label">Телефон:</span>
            <span class="value">{{ order.client.phone }}</span>
          </div>
        </div>
        <div class="details-section">
          <h3>Магазин</h3>
          <div class="detail-item">
            <span class="label">Адрес:</span>
            <span class="value">{{ order.shop.title }}</span>
          </div>
        </div>
        <div class="details-section">
          <h3>Способ оплаты</h3>
          <div class="detail-item">
            <span class="label">Метод:</span>
            <span class="value">{{ order.payment.method.title }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Статус:</span>
            <span class="value">{{ order.payment.status.title }}</span>
          </div>
        </div>
      </div>
      <h3>Состав заказа</h3>
      <table class="order-items">
        <thead>
          <tr>
            <th>Наименование</th>
            <th>Количество</th>
            <th>Цена</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.items" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.quantity }} шт.</td>
            <td>{{ item.price }} руб.</td>
            <td>{{ item.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { defineProps, defineEmits } from "vue";
import { getStatusInfo } from "../utils/orderStatus";

const props = defineProps({
  order: Object,
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

const handleEscKey = (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscKey);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscKey);
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 70%;
  max-height: 90%;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close {
  float: right;
  cursor: pointer;
  font-size: 28px;
  color: #aaa;
  background: none;
  border: none;
  padding: 0;
  transition: color 0.3s ease-in-out;
}

.close:hover,
.close:focus {
  color: #333;
  outline: none;
}

h2 {
  margin-top: 0;
  color: #42b983;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

h3 {
  color: #42b983;
  margin-top: 20px;
}

.order-summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
}

.summary-item {
  display: flex;
  flex-direction: column;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.details-section {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
}

.detail-item {
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
  color: #555;
  margin-right: 10px;
}

.value {
  color: #333;
}

.status {
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: bold;
}

.status-completed {
  background-color: #d4edda;
  color: #155724;
}
.status-reserved {
  background-color: #fff3cd;
  color: #856404;
}
.status-cancelled {
  background-color: #f8d7da;
  color: #721c24;
}
.status-processing {
  background-color: #cce5ff;
  color: #004085;
}

.order-items {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.order-items th,
.order-items td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.order-items th {
  background-color: #42b983;
  color: white;
}

.order-items tr:nth-child(even) {
  background-color: #f9f9f9;
}

.order-items tr:hover {
  background-color: #f5f5f5;
}
</style>
