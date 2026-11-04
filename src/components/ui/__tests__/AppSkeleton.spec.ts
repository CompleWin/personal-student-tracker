import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import AppSkeleton from '../AppSkeleton.vue'

describe('AppSkeleton', () => {
  it('рисует столько полос, сколько попросили', () => {
    const wrapper = mount(AppSkeleton, {props: {lines: 3}})

    const bars = wrapper.element.lastElementChild!.children

    expect(bars).toHaveLength(3)
  })

  it('заглушка не читается скринридером', () => {
    const wrapper = mount(AppSkeleton)

    expect(wrapper.attributes('aria-hidden')).toBe('true')
  })
})
