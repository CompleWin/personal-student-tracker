<script setup lang="ts" generic="T extends Record<string, unknown>">

withDefaults(defineProps<{
  columns: { key: string; label: string; numeric?: boolean; nowrap?: boolean }[]
  rows: T[]
  rowKey?: string
  caption?: string
}>(), {
  rowKey: 'id',
})

</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full border-collapse">
      <caption v-if="caption" class="sr-only">{{ caption }}</caption>

      <thead>
        <tr class="border-b border-line">
          <th
              v-for="column in columns"
              :key="column.key"
              scope="col"
              class="py-3.5 text-[11px] tracking-[0.16em] uppercase font-normal text-fg-faint"
              :class="column.numeric ? 'text-right px-[18px]' : 'text-left'"
          >{{ column.label }}</th>
        </tr>
      </thead>

      <tbody>
        <tr
            v-for="(row, index) in rows"
            :key="String(row[rowKey] ?? index)"
            class="border-b border-line last:border-0"
        >
          <td
              v-for="column in columns"
              :key="column.key"
              class="py-4 align-middle"
              :class="[
                column.numeric ? 'text-right px-[18px] font-code' : '',
                column.nowrap ? 'whitespace-nowrap' : '',
              ]"
          >
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
