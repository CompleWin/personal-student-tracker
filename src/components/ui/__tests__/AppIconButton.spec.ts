import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import AppIconButton from '../AppIconButton.vue'

describe('AppIconButton', () => {
  it('подписывает кнопку без текста для наведения и скринридера', () => {
    const wrapper = mount(AppIconButton, {props: {label: 'Удалить'}})

    expect(wrapper.attributes('title')).toBe('Удалить')
    expect(wrapper.attributes('aria-label')).toBe('Удалить')
  })
})
