<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  page: number
  pageCount: number
  disabled?: boolean
}>(), {
  disabled: false,
})

const emit = defineEmits<{
  change: [page: number]
}>()

const WINDOW = 7

const pages = computed<(number | '…')[]>(() => {
  const count = props.pageCount
  if (count <= WINDOW) {
    return Array.from({ length: count }, (_, i) => i + 1)
  }
  const cur = props.page
  const left = Math.max(2, cur - 1)
  const right = Math.min(count - 1, cur + 1)
  const out: (number | '…')[] = [1]
  if (left > 2) out.push('…')
  for (let i = left; i <= right; i++) out.push(i)
  if (right < count - 1) out.push('…')
  out.push(count)
  return out
})

function go (target: number) {
  if (props.disabled) return
  if (target < 1 || target > props.pageCount || target === props.page) return
  emit('change', target)
}

const navClass =
  'inline-flex items-center justify-center size-9 rounded-full border border-line ' +
  'text-fg-muted bg-surface-island transition cursor-pointer hover:border-primary hover:text-primary ' +
  'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-line disabled:hover:text-fg-muted'
</script>

<template>
  <nav
      v-if="pageCount > 1"
      class="flex items-center gap-1"
      aria-label="Пагинация"
  >
    <button
        type="button"
        :class="navClass"
        :disabled="disabled || page <= 1"
        aria-label="Предыдущая страница"
        @click="go(page - 1)"
    >
      <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>

    <template v-for="(p, idx) in pages" :key="idx">
      <span
          v-if="p === '…'"
          class="px-2 text-fg-faint select-none"
      >…</span>
      <button
          v-else
          type="button"
          class="inline-flex items-center justify-center min-w-9 h-9 px-2 rounded-full text-sm transition cursor-pointer
                 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          :class="p === page
            ? 'bg-primary text-white border border-primary'
            : 'bg-surface-island text-fg-muted border border-line hover:border-primary hover:text-primary'"
          :disabled="disabled"
          :aria-current="p === page ? 'page' : undefined"
          @click="go(p)"
      >
        {{ p }}
      </button>
    </template>

    <button
        type="button"
        :class="navClass"
        :disabled="disabled || page >= pageCount"
        aria-label="Следующая страница"
        @click="go(page + 1)"
    >
      <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  </nav>
</template>
