import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import AppInput from '../AppInput.vue'

describe('AppInput', () => {
  it('показывает значение модели', () => {
    const wrapper = mount(AppInput, {props: {modelValue: 'привет'}})

    expect(wrapper.get('input').element.value).toBe('привет')
  })

  it('отдаёт наверх то, что ввели', async () => {
    const wrapper = mount(AppInput, {props: {modelValue: ''}})

    await wrapper.get('input').setValue('27')

    expect(wrapper.emitted('update:modelValue')).toEqual([['27']])
  })

  it('пробрасывает атрибуты на поле, а не на обёртку', () => {
    const wrapper = mount(AppInput, {props: {modelValue: ''}, attrs: {maxlength: '10'}})

    expect(wrapper.get('input').attributes('maxlength')).toBe('10')
  })
})
