<script setup lang="ts">
import AppHeader from '../components/layout/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <main class="flex justify-center px-3.5 pt-3.5 pb-10 md:px-8 md:pt-8">
    <div class="flex w-full min-w-0 max-w-[1164px] flex-col gap-5">
      <slot />
    </div>
  </main>
</template>
