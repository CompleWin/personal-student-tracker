<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import Modal from './Modal.vue'
import AppIsland from './AppIsland.vue'
import AppButton from './AppButton.vue'

const HOLD_MS = 3000

const props = withDefaults(defineProps<{
  open: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  tone?: 'default' | 'danger'
  hold?: boolean
  doneText?: string
  icon?: 'trash' | 'hide'
  loading?: boolean
  closable?: boolean
}>(), {
  title: 'Подтверждение',
  confirmText: 'Подтвердить',
  cancelText: 'Отмена',
  doneText: 'Готово',
  tone: 'default',
  hold: false,
  loading: false,
  closable: true,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  confirm: []
  cancel: []
}>()

const holding = ref(false)
const done = ref(false)
const missed = ref(false)
let holdTimer: ReturnType<typeof setTimeout> | null = null

function stopHold (releasedEarly = false) {
  if (holdTimer) clearTimeout(holdTimer)
  holdTimer = null
  if (releasedEarly && holding.value) missed.value = true
  holding.value = false
}

function startHold () {
  if (props.loading || done.value || holdTimer) return
  missed.value = false
  holding.value = true
  holdTimer = setTimeout(() => {
    stopHold()
    done.value = true
    emit('confirm')
  }, HOLD_MS)
}

function onConfirm () {
  if (props.loading || props.hold) return
  emit('confirm')
}

function onCancel () {
  if (props.loading) return
  stopHold()
  emit('update:open', false)
  emit('cancel')
}

function onDismiss () {
  if (props.closable) onCancel()
}

watch(() => props.open, (open) => {
  stopHold()
  missed.value = false
  if (open) done.value = false
})

onBeforeUnmount(stopHold)

const confirmColor = computed(() => (props.tone === 'danger' ? 'red' : 'primary'))
const confirmLabel = computed(() => (done.value ? props.doneText : props.confirmText))
</script>

<template>
  <Modal v-if="open" @close="onDismiss">
    <AppIsland
        class="w-[460px] max-w-[90vw] shadow-modal"
        role="dialog"
        aria-modal="true"
    >
      <div class="flex items-start justify-between gap-4">
        <h2 class="text-2xl leading-tight tracking-[-0.02em] font-extrabold text-fg">{{ title }}</h2>
        <button
            v-if="closable"
            type="button"
            class="flex-none size-8 -mr-1 inline-flex items-center justify-center rounded-full
                   text-fg-faint hover:bg-surface-page hover:text-fg transition cursor-pointer
                   focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="loading"
            aria-label="Закрыть"
            @click="onCancel"
        >
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <p class="mt-2.5 mb-6 text-[15px] leading-relaxed text-fg-muted">
        <slot>{{ message }}</slot>
      </p>

      <div class="flex flex-wrap items-center gap-3">
        <AppButton
            :color="confirmColor"
            :loading="loading"
            class="relative overflow-hidden select-none"
            :title="hold && !done ? 'Удерживайте кнопку 3 секунды' : undefined"
            @pointerdown="hold && startHold()"
            @pointerup="stopHold(true)"
            @pointerleave="stopHold(true)"
            @keydown.space.prevent="hold && startHold()"
            @keyup.space="stopHold(true)"
            @click="onConfirm"
        >
          <span
              v-if="hold"
              class="absolute inset-y-0 left-0"
              :class="done ? 'w-full bg-success' : holding ? 'hold-fill bg-black/30' : 'w-0'"
              aria-hidden="true"
          />
          <span class="relative inline-flex items-center gap-2.5">
            <svg v-if="icon" class="size-4 flex-none" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 aria-hidden="true">
              <template v-if="icon === 'trash'">
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
              </template>
              <template v-else>
                <path d="M9.9 4.24A9 9 0 0 1 12 4c7 0 10 8 10 8a18 18 0 0 1-2.16 3.19" />
                <path d="M6.6 6.6A18 18 0 0 0 2 12s3 8 10 8a9 9 0 0 0 5.4-1.6" />
                <path d="m2 2 20 20" />
              </template>
            </svg>
            {{ confirmLabel }}
          </span>
        </AppButton>

        <AppButton
            variant="outline"
            color="gray"
            :disabled="loading"
            @click="onCancel"
        >
          {{ cancelText }}
        </AppButton>
      </div>

      <p v-if="missed" aria-live="polite" class="mt-3 text-[13px] text-danger-ink">
        Не отпускайте кнопку: её нужно держать три секунды.
      </p>
    </AppIsland>
  </Modal>
</template>

<style scoped>
.hold-fill {
  animation: hold-fill 3s linear forwards;
}

@keyframes hold-fill {
  from { width: 0; }
  to { width: 100%; }
}
</style>
