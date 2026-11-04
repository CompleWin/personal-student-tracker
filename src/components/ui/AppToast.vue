<script setup lang="ts">
import Toast from './Toast.vue'
import { useToast } from '../../composables/useToast.ts'

const { toasts, hide, pause, resume } = useToast()

</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-5 right-5 z-60 flex flex-col-reverse gap-2.5 pointer-events-none">
      <TransitionGroup
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="translate-y-4 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-4 opacity-0"
      >
        <Toast
            v-for="toast in toasts"
            :key="toast.id"
            :type="toast.type"
            class="pointer-events-auto"
            @close="hide(toast.id)"
            @mouseenter="pause(toast.id)"
            @mouseleave="resume(toast.id)"
        >{{ toast.text }}</Toast>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
