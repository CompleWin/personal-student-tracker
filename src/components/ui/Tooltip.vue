<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  duration?: number
}>(), {
  position: 'top',
  duration: 0
})

const show = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const tooltipStyle = ref({})
let timer: ReturnType<typeof setTimeout> | null = null
const gap = 8

function updatePosition() {
  if (!triggerRef.value) return
  const rect = triggerRef.value.getBoundingClientRect()

  const positions = {
    top: {
      top: `${rect.top - gap}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: 'translate(-50%, -100%)',
    },
    bottom: {
      top: `${rect.bottom + gap}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: 'translateX(-50%)',
    },
    left: {
      top: `${rect.top + rect.height / 2}px`,
      left: `${rect.left - gap}px`,
      transform: 'translate(-100%, -50%)',
    },
    right: {
      top: `${rect.top + rect.height / 2}px`,
      left: `${rect.right + gap}px`,
      transform: 'translateY(-50%)',
    },
  }

  tooltipStyle.value = positions[props.position]
}

function showTooltip() {
  updatePosition()
  if (props.duration > 0) {
    timer = setTimeout(() => {
      show.value = true
    }, props.duration)
  } else {
    show.value = true
  }
}

function hideTooltip() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  show.value = false
}
</script>

<template>
  <span
      ref="triggerRef"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      class="inline-flex"
  >
    <slot />
  </span>

  <Teleport to="body">
    <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div
          v-if="show"
          :style="tooltipStyle"
          class="fixed max-w-64 px-3 py-2 z-100 pointer-events-none
                 bg-surface-inverse text-fg-inverse text-[13px] leading-normal rounded-field shadow-popover"
      >
        {{ text }}
      </div>
    </Transition>
  </Teleport>
</template>
