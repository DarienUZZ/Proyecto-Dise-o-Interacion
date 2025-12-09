<template>
  <div class="stats-card">
    <div class="stats-icon" :style="{ backgroundColor: iconColor + '20' }">
      <i v-if="icon === 'money'" class="fa-solid fa-money-bill-wave" :style="{ color: iconColor }"></i>
      <i v-else-if="icon === 'receipt'" class="fa-solid fa-receipt" :style="{ color: iconColor }"></i>
      <i v-else-if="icon === 'user'" class="fa-solid fa-user" :style="{ color: iconColor }"></i>
      <i v-else-if="icon === 'refund'" class="fa-solid fa-hand-holding-dollar" :style="{ color: iconColor }"></i>
    </div>
    <div class="stats-content">
      <div class="stats-title">{{ title }}</div>
      <div class="stats-value">
        {{ value }}
        <span v-if="subtitle" class="stats-subtitle">{{ subtitle }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    required: true
  },
  iconColor: {
    type: String,
    default: '#6366f1'
  }
});
</script>

<style scoped>
.stats-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stats-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stats-icon i {
  font-size: 1.75rem;
}

.stats-content {
  flex: 1;
  min-width: 0;
}

.stats-title {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.stats-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.stats-subtitle {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
}

@media (max-width: 576px) {
  .stats-card {
    padding: 1rem;
    gap: 1rem;
  }

  .stats-icon {
    width: 56px;
    height: 56px;
  }

  .stats-icon i {
    font-size: 1.5rem;
  }

  .stats-value {
    font-size: 1.75rem;
  }

  .stats-title {
    font-size: 0.875rem;
  }
}
</style>