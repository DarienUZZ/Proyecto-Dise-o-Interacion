<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartCanvas = ref(null);
let chartInstance = null;

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d');

  const data = {
    labels: ['Figma', 'Sketch', 'XD', 'PS', 'AI', 'CorelDRAW', 'InDesign', 'Canva', 'Webflow', 'Affinity', 'Marker', 'Figma'],
    datasets: [
      {
        label: '2020',
        data: [15, 90, 95, 105, 60, 45, 95, 55, 45, 50, 95, 65],
        backgroundColor: '#8b5cf6',
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.9
      },
      {
        label: '2021',
        data: [12, 80, 75, 85, 50, 35, 75, 45, 35, 40, 75, 55],
        backgroundColor: '#f59e0b',
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.9
      },
      {
        label: '2022',
        data: [10, 70, 85, 95, 55, 40, 85, 50, 40, 45, 85, 60],
        backgroundColor: '#06b6d4',
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.9
      }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
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
              size: 12
            }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 13
          },
          bodyFont: {
            size: 12
          },
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 120,
          ticks: {
            stepSize: 20,
            font: {
              size: 11
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
            drawBorder: false
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 10
            },
            maxRotation: 45,
            minRotation: 45
          }
        }
      }
    }
  };

  chartInstance = new Chart(ctx, config);
});
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 350px;
  width: 100%;
}

@media (max-width: 768px) {
  .chart-container {
    height: 300px;
  }
}
</style>