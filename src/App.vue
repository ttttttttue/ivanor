<template>
  <div id="app">
    <h1 v-once class="main-title">Система управления заказами</h1>
    <OrderList />
  </div>
</template>

<script setup></script>

<style>
#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 auto;
  padding: 20px;
}

.main-title {
  text-align: center;
  color: #ea5800;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-bottom: 3px solid #ea5800;
  padding-bottom: 10px;
}

button {
  background-color: #ea5800;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #813600;
}

input,
select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
