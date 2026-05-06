<template>
  <div class="app">
    <h1>💸 Expense Tracker</h1>
    <AddExpense @added="fetchExpenses" />
    <ExpenseList :expenses="expenses" @deleted="fetchExpenses" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AddExpense from './components/AddExpense.vue'
import ExpenseList from './components/ExpenseList.vue'

const expenses = ref([])

async function fetchExpenses() {
  const res = await axios.get('await axios.post('expense-tracker-production-2f0b.up.railway.app', {')
  expenses.value = res.data
}

onMounted(fetchExpenses)
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; font-family: sans-serif; }
body { background: #f0f2f5; padding: 20px; }
.app { max-width: 600px; margin: auto; }
h1 { text-align: center; margin-bottom: 20px; color: #333; }
.form-card, .list-card { background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
h2 { margin-bottom: 14px; color: #444; }
input, select { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; }
button { width: 100%; padding: 10px; background: #6c63ff; color: white; border: none; border-radius: 8px; font-size: 15px; cursor: pointer; }
button:hover { background: #574fd6; }
.total { font-size: 18px; font-weight: bold; color: #6c63ff; margin-bottom: 12px; }
.expense-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
.tag { background: #ede9ff; color: #6c63ff; font-size: 11px; padding: 2px 8px; border-radius: 20px; margin-left: 8px; }
.right { display: flex; align-items: center; gap: 10px; }
.date { font-size: 12px; color: #999; }
.del { width: auto; padding: 4px 8px; background: #ff4d4f; border-radius: 6px; font-size: 12px; }
</style>