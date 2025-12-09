<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Registrar componentes
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// Datos del gráfico (quemados)
const chartData = {
labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],  datasets: [
    {
      label: '2020',
      data: [20, 50, 90, 95, 65, 10, 85, 10, 25, 50, 10, 70],
      backgroundColor: '#8b5cf6',
      borderRadius: 4,
      barThickness: 12
    },
    {
      label: '2021',
      data: [55, 10, 85, 10, 70, 35, 40, 50, 10, 100, 20, 60],
      backgroundColor: '#f87171',
      borderRadius: 4,
      barThickness: 12
    },
    {
      label: '2022',
      data: [95, 90, 65, 10, 10, 100, 50, 30, 105, 55, 60, 70],
      backgroundColor: '#06b6d4',
      borderRadius: 4,
      barThickness: 12
    }
  ]
}

// Opciones del gráfico
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 15,
        font: {
          size: 12,
          family: "'Inter', sans-serif"
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: {
        size: 13
      },
      bodyFont: {
        size: 12
      },
      cornerRadius: 8
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 11
        },
        maxRotation: 45,
        minRotation: 45
      }
    },
    y: {
      beginAtZero: true,
      max: 120,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      },
      ticks: {
        font: {
          size: 11
        },
        stepSize: 20
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}
</style>