<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

withDefaults(defineProps<{
  variant?: 'menu' | 'profile'
}>(), {
  variant: 'menu',
})

const PANEL_CLASSES = {
  menu: 'min-w-44 py-2 bg-surface-island border border-line rounded-panel',
  profile: 'w-[min(276px,calc(100vw-48px))] overflow-hidden bg-surface-island border-2 border-primary rounded-island',
} as const

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div class="relative" ref="dropdownRef">
    <div @click="toggle" class="cursor-pointer">
      <slot name="trigger" />
    </div>

    <div
        v-if="isOpen"
        class="absolute right-0 mt-2 z-50 shadow-popover"
        :class="PANEL_CLASSES[variant]"
    >
      <slot :close="close" />
    </div>
  </div>
</template>
