<template>
  <div class="card">
    <div class="list-header">
      <h2>🧾 Recent Expenses</h2>
      <select v-model="filter">
        <option value="">All categories</option>
        <option>Food</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Other</option>
      </select>
    </div>
    <div v-if="filtered.length === 0" class="empty">No expenses yet — add one above!</div>
    <div class="expense-item" v-for="exp in filtered" :key="exp.id">
      <div class="exp-left">
        <div class="exp-icon" :style="{ background: catColor(exp.category) + '22' }">
          {{ catIcon(exp.category) }}
        </div>
        <div>
          <div class="exp-name">{{ exp.title }}</div>
          <div class="exp-date">{{ exp.date?.slice(0, 10) }}</div>
        </div>
      </div>
      <div class="exp-right">
        <span class="tag">{{ exp.category }}</span>
        <span class="exp-amount">₹{{ parseFloat(exp.amount).toFixed(2) }}</span>
        <button class="del" @click="$emit('deleted', exp.id); deleteExp(exp.id)">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const props = defineProps(['expenses'])
const emit = defineEmits(['deleted'])
const filter = ref('')

const filtered = computed(() =>
  filter.value ? props.expenses.filter(e => e.category === filter.value) : props.expenses
)

const colors = { Food: '#7F77DD', Transport: '#1D9E75', Shopping: '#D85A30', Bills: '#378ADD', Other: '#D4537E' }
const icons = { Food: '🍔', Transport: '🚗', Shopping: '🛍️', Bills: '💡', Other: '📦' }

function catColor(cat) { return colors[cat] || '#888' }
function catIcon(cat) { return icons[cat] || '📦' }

async function deleteExp(id) {
  await axios.delete(`http://localhost:5000/expenses/${id}`)
  emit('deleted')
}
</script>

<style scoped>
.card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
h2 { font-size: 16px; font-weight: 600; color: #444; }
select { font-size: 12px; padding: 5px 8px; border: 1px solid #e0e0e0; border-radius: 8px; color: #555; }
.empty { text-align: center; padding: 2rem; color: #bbb; font-size: 13px; }
.expense-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f5f5f5; }
.expense-item:last-child { border-bottom: none; }
.exp-left { display: flex; align-items: center; gap: 10px; }
.exp-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
.exp-name { font-size: 13px; font-weight: 600; color: #333; }
.exp-date { font-size: 11px; color: #bbb; }
.exp-right { display: flex; align-items: center; gap: 10px; }
.tag { font-size: 10px; padding: 2px 8px; border-radius: 20px; background: #EEEDFE; color: #534AB7; }
.exp-amount { font-size: 13px; font-weight: 600; color: #333; }
.del { background: none; border: none; color: #ccc; cursor: pointer; font-size: 13px; padding: 2px 6px; border-radius: 4px; }
.del:hover { color: #E24B4A; background: #fff0f0; }
</style>