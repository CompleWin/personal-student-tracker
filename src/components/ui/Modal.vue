<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

const emit = defineEmits<{
  close: []
}>()

function onKeydown (e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  document.body.classList.add('overflow-hidden')
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.classList.remove('overflow-hidden')
})
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-overlay" />
      <div class="relative z-10">
        <slot />
      </div>
    </div>
  </Teleport>
</template>
