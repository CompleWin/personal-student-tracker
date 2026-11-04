<script setup lang="ts">
import { useRoute } from 'vue-router'

const NAV_ITEMS = [
  { name: 'today', label: 'Сегодня' },
] as const

const FOCUS_RING = 'focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4'

const NAV_BASE = 'text-xs tracking-[0.12em] uppercase no-underline text-white border-b-2 pt-1 pb-0.5 ' +
  `transition-opacity ${FOCUS_RING}`

const NAV_STATE = {
  active: 'border-white',
  idle: 'border-transparent opacity-70 hover:opacity-100',
} as const

const route = useRoute()

function navState (name: string) {
  return route.name === name ? NAV_STATE.active : NAV_STATE.idle
}
</script>

<template>
  <header class="bg-primary text-white">
    <nav class="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3.5 md:px-8">
      <RouterLink
          to="/"
          class="text-[22px] font-extrabold tracking-[-0.02em] no-underline text-white"
          :class="FOCUS_RING"
      >
        Ученики
      </RouterLink>

      <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
        <RouterLink
            v-for="item in NAV_ITEMS"
            :key="item.name"
            :to="{ name: item.name }"
            :class="[NAV_BASE, navState(item.name)]"
        >
          {{ item.label }}
        </RouterLink>
      </div>
    </nav>
  </header>
</template>
