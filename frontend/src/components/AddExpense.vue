<template>
  <div class="card">
    <h2><span class="icon">➕</span> Add Expense</h2>
    <div class="form-group">
      <label>Title</label>
      <input v-model="title" placeholder="e.g. Lunch" />
    </div>
    <div class="form-group">
      <label>Amount (₹)</label>
      <input v-model="amount" type="number" placeholder="0.00" />
    </div>
    <div class="form-group">
      <label>Category</label>
      <select v-model="category">
        <option value="">Select category</option>
        <option>Food</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Other</option>
      </select>
    </div>
    <div class="form-group">
      <label>Date</label>
      <input v-model="date" type="date" />
    </div>
    <button @click="submitExpense">➕ Add Expense</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['added'])
const title = ref('')
const amount = ref('')
const category = ref('')
const date = ref('')

async function submitExpense() {
  if (!title.value || !amount.value || !category.value || !date.value) {
    alert('Please fill all fields!')
    return
  }
  await axios.post('https://expense-tracker-production-2f0b.up.railway.app/expenses', {
    title: title.value,
    amount: amount.value,
    category: category.value,
    date: date.value
  })
  title.value = ''
  amount.value = ''
  category.value = ''
  date.value = ''
  emit('added')
}
</script>

<style scoped>
.card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
h2 { font-size: 16px; font-weight: 600; color: #444; margin-bottom: 16px; }
.icon { margin-right: 6px; }
.form-group { margin-bottom: 12px; }
label { font-size: 12px; color: #999; display: block; margin-bottom: 4px; }
input, select { width: 100%; padding: 9px 12px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 13px; color: #333; background: #fafafa; }
input:focus, select:focus { outline: none; border-color: #7F77DD; background: white; }
button { width: 100%; padding: 10px; background: #7F77DD; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; margin-top: 4px; }
button:hover { background: #534AB7; }
</style>