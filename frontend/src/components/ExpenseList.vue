<template>
  <div class="list-card">
    <h2>Expenses</h2>
    <p class="total">Total: ₹{{ total }}</p>
    <div v-if="expenses.length === 0">No expenses yet!</div>
    <div class="expense-item" v-for="exp in expenses" :key="exp.id">
      <div>
        <strong>{{ exp.title }}</strong>
        <span class="tag">{{ exp.category }}</span>
      </div>
      <div class="right">
        <span>₹{{ exp.amount }}</span>
        <span class="date">{{ exp.date?.slice(0, 10) }}</span>
        <button class="del" @click="deleteExpense(exp.id)">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import axios from 'axios'

const props = defineProps(['expenses'])
const emit = defineEmits(['deleted'])

const total = computed(() =>
  props.expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0).toFixed(2)
)

async function deleteExpense(id) {
  await axios.delete(`http://localhost:5000/expenses/${id}`)
  emit('deleted')
}
</script>