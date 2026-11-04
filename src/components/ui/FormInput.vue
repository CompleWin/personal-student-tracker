<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import AppInput from './AppInput.vue'
import AppFormError from './AppFormError.vue'
import AppSectionLabel from './AppSectionLabel.vue'

const props = withDefaults(defineProps<{
  label: string
  type?: string
  placeholder?: string
  modelValue: string
  error?: string | null
  hint?: string | null
  prefix?: string
  mono?: boolean
  autocomplete?: string
}>(), {
  mono: false,
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const id = useId()
const showPassword = ref(false)
const isPassword = props.type === 'password'

const inputClass = computed(() => [
  'border border-line-strong bg-transparent focus:border-primary',
  props.mono ? 'font-code' : '',
].join(' '))

</script>

<template>
  <div>
    <AppSectionLabel as="label" :for="id" class="mb-2">{{ label }}</AppSectionLabel>

    <AppInput
        :id="id"
        :modelValue="modelValue"
        :placeholder="placeholder"
        :type="isPassword ? (showPassword ? 'text' : 'password') : (type as any) ?? 'text'"
        :invalid="!!error"
        :input-class="inputClass"
        rounded="field"
        :autocomplete="autocomplete"
        wide
        @update:model-value="$emit('update:modelValue', $event)"
    >
      <template v-if="prefix" #left>
        <span class="font-code text-fg-faint">{{ prefix }}</span>
      </template>

      <template v-if="isPassword" #right>
        <button type="button"
                class="flex items-center cursor-pointer rounded-full transition
                       focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                :class="showPassword ? 'text-primary' : 'text-fg-faint hover:text-fg-muted'"
                :title="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
                :aria-label="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
                @click="showPassword = !showPassword">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               aria-hidden="true">
            <template v-if="showPassword">
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
              <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
              <path d="m2 2 20 20" />
            </template>
            <template v-else>
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </template>
          </svg>
        </button>
      </template>
    </AppInput>

    <AppFormError :message="error" />
    <p v-if="hint && !error" class="mt-2 text-[13px] leading-normal text-fg-muted">{{ hint }}</p>
  </div>
</template>
