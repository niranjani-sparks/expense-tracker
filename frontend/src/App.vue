<template>
  <div class="app">
    <div class="header">
      <h1>💰 Expense Tracker</h1>
      <span class="month">{{ currentMonth }}</span>
    </div>

    <div class="stats">
      <div class="stat">
        <div class="stat-label">💸 Total Spent</div>
        <div class="stat-value purple">₹{{ total }}</div>
      </div>
      <div class="stat">
        <div class="stat-label">📋 Transactions</div>
        <div class="stat-value">{{ expenses.length }}</div>
      </div>
      <div class="stat">
        <div class="stat-label">🏆 Top Category</div>
        <div class="stat-value small">{{ topCategory }}</div>
      </div>
      <div class="stat">
        <div class="stat-label">📊 Avg Expense</div>
        <div class="stat-value purple">₹{{ avg }}</div>
      </div>
    </div>

    <div class="main-grid">
      <AddExpense @added="fetchExpenses" />
      <PieChart :expenses="expenses" />
    </div>

    <ExpenseList :expenses="expenses" @deleted="fetchExpenses" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import AddExpense from './components/AddExpense.vue'
import ExpenseList from './components/ExpenseList.vue'
import PieChart from './components/PieChart.vue'

const expenses = ref([])

async function fetchExpenses() {
  const res = await axios.get('http://localhost:5000/expenses')
  expenses.value = res.data
}

const total = computed(() =>
  expenses.value.reduce((s, e) => s + parseFloat(e.amount), 0).toFixed(2)
)

const avg = computed(() =>
  expenses.value.length
    ? (expenses.value.reduce((s, e) => s + parseFloat(e.amount), 0) / expenses.value.length).toFixed(2)
    : '0.00'
)

const topCategory = computed(() => {
  if (!expenses.value.length) return '—'
  const cats = {}
  expenses.value.forEach(e => {
    cats[e.category] = (cats[e.category] || 0) + parseFloat(e.amount)
  })
  return Object.entries(cats).sort((a, b) => b[1] - a[1])[0][0]
})

const currentMonth = computed(() =>
  new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
)

onMounted(fetchExpenses)
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; font-family: sans-serif; }
body { background: #f0f2f5; padding: 20px; }
.app { max-width: 800px; margin: auto; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.header h1 { font-size: 24px; color: #333; }
.month { font-size: 13px; color: #999; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
.stat { background: white; border-radius: 12px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.stat-label { font-size: 12px; color: #999; margin-bottom: 8px; }
.stat-value { font-size: 22px; font-weight: bold; color: #333; }
.stat-value.purple { color: #7F77DD; }
.stat-value.small { font-size: 16px; }
.main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
</style>