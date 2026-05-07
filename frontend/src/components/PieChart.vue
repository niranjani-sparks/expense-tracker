<template>
  <div class="card">
    <h2>🥧 Spending by Category</h2>
    <div v-if="!hasData" class="empty">Add expenses to see chart!</div>
    <div v-else class="chart-wrap">
      <canvas ref="chartRef" width="150" height="150"></canvas>
      <div class="legend">
        <div class="leg-item" v-for="(item, i) in legendData" :key="i">
          <span class="dot" :style="{ background: item.color }"></span>
          <span>{{ item.label }} — ₹{{ item.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Chart, ArcElement, DoughnutController, Tooltip, Legend } from 'chart.js'

Chart.register(ArcElement, DoughnutController, Tooltip, Legend)

const props = defineProps(['expenses'])
const chartRef = ref(null)
let chartInstance = null

const colors = { Food: '#7F77DD', Transport: '#1D9E75', Shopping: '#D85A30', Bills: '#378ADD', Other: '#D4537E' }

const catData = computed(() => {
  const cats = {}
  props.expenses.forEach(e => {
    cats[e.category] = (cats[e.category] || 0) + parseFloat(e.amount)
  })
  return cats
})

const hasData = computed(() => Object.keys(catData.value).length > 0)

const legendData = computed(() =>
  Object.entries(catData.value).map(([label, value]) => ({
    label, value: value.toFixed(0), color: colors[label] || '#888'
  }))
)

function renderChart() {
  if (!chartRef.value || !hasData.value) return
  if (chartInstance) chartInstance.destroy()
  chartInstance = new Chart(chartRef.value, {
    type: 'doughnut',
    data: {
      labels: Object.keys(catData.value),
      datasets: [{
        data: Object.values(catData.value),
        backgroundColor: Object.keys(catData.value).map(l => colors[l] || '#888'),
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      cutout: '65%',
      plugins: { legend: { display: false } },
      animation: { duration: 500 }
    }
  })
}

watch(() => props.expenses, renderChart, { deep: true })
onMounted(renderChart)
</script>

<style scoped>
.card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
h2 { font-size: 16px; font-weight: 600; color: #444; margin-bottom: 16px; }
.empty { text-align: center; padding: 2rem; color: #bbb; font-size: 13px; }
.chart-wrap { display: flex; align-items: center; justify-content: center; gap: 1.5rem; }
.legend { display: flex; flex-direction: column; gap: 8px; }
.leg-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #666; }
.dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
</style>