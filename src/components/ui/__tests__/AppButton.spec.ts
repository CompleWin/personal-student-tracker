import {describe, expect, it, vi} from 'vitest'
import {mount} from '@vue/test-utils'
import AppButton from '../AppButton.vue'

describe('AppButton', () => {
  it('рендерит содержимое слота', () => {
    const wrapper = mount(AppButton, {slots: {default: 'Отправить'}})

    expect(wrapper.text()).toBe('Отправить')
  })

  it('вместо содержимого показывает состояние загрузки', () => {
    const wrapper = mount(AppButton, {props: {loading: true}, slots: {default: 'Отправить'}})

    expect(wrapper.text()).not.toContain('Отправить')
  })

  it('передаёт клик наружу', async () => {
    const onClick = vi.fn()
    const wrapper = mount(AppButton, {attrs: {onClick}})

    await wrapper.trigger('click')

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('молчит, когда отключена', async () => {
    const onClick = vi.fn()
    const wrapper = mount(AppButton, {props: {disabled: true}, attrs: {onClick}})

    await wrapper.trigger('click')

    expect(onClick).not.toHaveBeenCalled()
  })
})
