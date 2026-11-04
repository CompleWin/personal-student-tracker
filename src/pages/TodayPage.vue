<script setup lang="ts">
import AppIsland from '../components/ui/AppIsland.vue'
import AppEmptyState from '../components/ui/AppEmptyState.vue'
import { formatDayTitle } from '../features/today/utils/formatDayTitle.ts'

const dayTitle = formatDayTitle(new Date())
</script>

<template>
  <AppIsland>
    <h1 class="text-[34px] font-extrabold leading-none tracking-[-0.035em] text-fg md:text-[44px]">
      Сегодня
    </h1>
    <p class="mt-3 text-[17px] leading-[1.55] text-fg-subtle">{{ dayTitle }}</p>
  </AppIsland>

  <AppEmptyState label="Уроки" title="Здесь появятся уроки на сегодня" />
</template>
