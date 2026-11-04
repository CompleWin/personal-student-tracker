import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import AppBadge from '../AppBadge.vue'

describe('AppBadge', () => {
  it('рендерит любой переданный текст', () => {
    const wrapper = mount(AppBadge, {slots: {default: 'Совсем новое'}})

    expect(wrapper.text()).toBe('Совсем новое')
  })

  it('не рисует точку-маркер рядом с текстом', () => {
    const wrapper = mount(AppBadge, {slots: {default: 'Актуальное'}})

    expect(wrapper.element.children).toHaveLength(0)
    expect(wrapper.text()).not.toMatch(/[•·]/)
  })
})
