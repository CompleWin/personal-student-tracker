<script setup lang="ts">
import AppIsland from './AppIsland.vue'
import AppSectionLabel from './AppSectionLabel.vue'

withDefaults(defineProps<{
  label: string
  title?: string
  tone?: 'muted' | 'danger'
}>(), {
  tone: 'muted',
})

</script>

<template>
  <AppIsland>
    <AppSectionLabel as="h2" :tone="tone" class="mb-4">{{ label }}</AppSectionLabel>

    <p v-if="title" class="text-xl leading-[1.4] max-w-[26ch] text-fg">{{ title }}</p>

    <slot />

    <div v-if="$slots.action" class="mt-7">
      <slot name="action" />
    </div>
  </AppIsland>
</template>
