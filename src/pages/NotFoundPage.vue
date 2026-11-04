<script setup lang="ts">
import AppIsland from '../components/ui/AppIsland.vue'
import AppSectionLabel from '../components/ui/AppSectionLabel.vue'
import AppButton from '../components/ui/AppButton.vue'
</script>

<template>
  <AppIsland>
    <AppSectionLabel class="mb-3.5">Ошибка 404</AppSectionLabel>
    <h1 class="mb-7 text-[34px] font-extrabold leading-none tracking-[-0.035em] text-fg md:text-[44px]">
      Страница не найдена
    </h1>
    <AppButton to="/">На главную</AppButton>
  </AppIsland>
</template>
