<template>
	<section class="order-table">
		<div class="table-container">
			<table>
				<thead v-once>
					<tr>
						<th>Номер заказа</th>
						<th>Дата создания</th>
						<th>Статус заказа</th>
						<th>Тип отгрузки</th>
						<th>Дата отгрузки</th>
						<th>Способ оплаты</th>
						<th>Место отгрузки</th>
						<th>ФИО клиента</th>
						<th>Сумма заказа</th>
						<th>Количество товаров</th>
						<th>Оператор</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="order in orders"
						:key="order.id"
						v-memo="[
							order.uid1c,
							order.status.id,
							order.amount,
							order.quantity,
						]"
						@click="emit('view-detail', order.uid1c)"
					>
						<td>{{ order.uid1c }}</td>
						<td class="text-date">
							<div>{{ order.formattedDate }}</div>
							<div class="time">{{ order.formattedTime }}</div>
						</td>
						<td :class="getStatusInfo(order.status.id).class">
							{{ order.status.title }}
						</td>
						<td>{{ order.shipment.method.title }}</td>
						<td class="text-date">{{ order.formattedShipmentDate }}</td>
						<td>{{ order.payment.method.title }}</td>
						<td>{{ order.shop.title }}</td>
						<td>{{ order.client.firstname }} {{ order.client.lastname }}</td>
						<td>{{ order.amount }}</td>
						<td>{{ order.quantity }}</td>
						<td>{{ order.operator }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { getStatusInfo } from "../utils/orderStatus";

const props = defineProps({
	orders: Array,
});

const emit = defineEmits(["view-detail"]);
</script>

<style scoped>
.order-table {
	width: 100%;
}

.table-container {
	width: 100%;
	overflow-x: auto;
}

.text-date {
	white-space: normal;
	line-height: 1.2;
}

.text-date .time {
	font-size: 0.9em;
	color: #666;
}

table {
	width: 100%;
	border-collapse: collapse;
	margin-bottom: 20px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	overflow: hidden;
}
th,
td {
	padding: 12px;
	text-align: center;
	border: 1px solid #ddd;
	font-size: 16px;
}

th {
	background-color: #ffe06f;
	color: rgb(0, 0, 0);
	font-weight: bold;
	border-bottom: 2px solid #ddd;
}
tr:nth-child(even) {
	background-color: #f9f9f9;
}
tr:hover {
	background-color: #f0f0f0;
	cursor: pointer;
}
td:not(:last-child),
th:not(:last-child) {
	border-right: 1px solid #ddd;
}
tr:not(:last-child) td {
	border-bottom: 1px solid #ddd;
}
@media screen and (max-width: 1400px) {
	th,
	td {
		font-size: 14px;
		padding: 10px;
	}
}
@media screen and (max-width: 1200px) {
	th,
	td {
		font-size: 12px;
		padding: 8px;
	}
}
@media screen and (max-width: 1000px) {
	th,
	td {
		font-size: 11px;
		padding: 6px;
	}
}
@media screen and (max-width: 800px) {
	th,
	td {
		font-size: 10px;
		padding: 5px;
	}
}

.status-completed {
	color: darkgreen;
}
.status-reserved {
	color: green;
}
.status-cancelled {
	color: red;
}
.status-processing {
	color: black;
}
</style>
