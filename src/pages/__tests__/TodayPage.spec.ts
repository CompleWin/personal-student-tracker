import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TodayPage from '../TodayPage.vue'

describe('TodayPage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 10, 4, 10))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('показывает заголовок с сегодняшней датой словами', () => {
    const wrapper = mount(TodayPage)

    expect(wrapper.get('h1').text()).toBe('Сегодня')
    expect(wrapper.text()).toContain('4 ноября, среда')
  })

  it('пока уроков нет, объясняет, что здесь появится', () => {
    const wrapper = mount(TodayPage)

    expect(wrapper.text()).toContain('Здесь появятся уроки на сегодня')
  })
})
