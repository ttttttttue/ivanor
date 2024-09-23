import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import OrderList from "./components/OrderList.vue";
import OrderFilter from "./components/OrderFilter.vue";
import OrderTable from "./components/OrderTable.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const OrderDetailModal = defineAsyncComponent(
  () => import("./components/OrderDetailModal.vue"),
);

const app = createApp(App);

app.use(Toast, {
  timeout: 5000,
  position: "top-right",
});

app.component("OrderList", OrderList);
app.component("OrderFilter", OrderFilter);
app.component("OrderTable", OrderTable);
app.component("OrderDetailModal", OrderDetailModal);

app.mount("#app");
