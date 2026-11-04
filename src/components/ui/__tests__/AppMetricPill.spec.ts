import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppMetricPill from '../AppMetricPill.vue'

describe('AppMetricPill', () => {
  it('показывает число и подпись рядом', () => {
    const wrapper = mount(AppMetricPill, {
      props: { value: 312 },
      slots: { default: 'решено' },
    })

    expect(wrapper.text()).toBe('312решено')
  })

  it('принимает готовую строку значения', () => {
    const wrapper = mount(AppMetricPill, {
      props: { value: '71 %', tone: 'success' },
      slots: { default: 'точность' },
    })

    expect(wrapper.text()).toContain('71 %')
  })
})
