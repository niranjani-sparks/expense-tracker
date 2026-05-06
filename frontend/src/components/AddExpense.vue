<template>
  <div class="form-card">
    <h2>Add Expense</h2>
    <input v-model="title" placeholder="Title (e.g. Lunch)" />
    <input v-model="amount" type="number" placeholder="Amount (₹)" />
    <select v-model="category">
      <option value="">Select category</option>
      <option>Food</option>
      <option>Transport</option>
      <option>Shopping</option>
      <option>Bills</option>
      <option>Other</option>
    </select>
    <input v-model="date" type="date" />
    <button @click="submitExpense">Add Expense</button>
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
  if (!title.value || !amount.value || !date.value) {
    alert('Please fill all required fields!')
    return
  }
  await axios.post('http://localhost:5000/expenses', {
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