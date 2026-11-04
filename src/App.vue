<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from './layouts/AppLayout.vue'
import BareLayout from './layouts/BareLayout.vue'
import AppToast from './components/ui/AppToast.vue'
import ConfirmDialog from './components/ui/ConfirmDialog.vue'
import { useConfirm } from './composables/useConfirm.ts'
import { LAYOUT } from './router/index.ts'

const LAYOUTS = {
  [LAYOUT.app]: AppLayout,
  [LAYOUT.bare]: BareLayout,
} as const

const route = useRoute()

const layout = computed(() => {
  if (route.matched.length === 0) return null
  return LAYOUTS[route.meta.layout ?? LAYOUT.app]
})

const { confirmState, handleConfirm, handleCancel } = useConfirm()
</script>

<template>
  <component :is="layout" v-if="layout">
    <RouterView />
  </component>
  <AppToast />
  <ConfirmDialog
      :open="confirmState.open"
      :title="confirmState.title"
      :message="confirmState.message"
      :tone="confirmState.tone"
      :hold="confirmState.hold"
      :done-text="confirmState.doneText"
      :icon="confirmState.icon"
      :confirm-text="confirmState.confirmText"
      :cancel-text="confirmState.cancelText"
      @confirm="handleConfirm"
      @cancel="handleCancel"
  />
</template>
