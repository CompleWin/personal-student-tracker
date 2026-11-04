import {describe, expect, it, vi} from 'vitest'
import {mount} from '@vue/test-utils'
import AppChip from '../AppChip.vue'

describe('AppChip', () => {
  it('сообщает о нажатии', async () => {
    const onClick = vi.fn()
    const wrapper = mount(AppChip, {slots: {default: 'Решённые'}, attrs: {onClick}})

    await wrapper.trigger('click')

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('помечает выбранное состояние для скринридера', () => {
    const off = mount(AppChip, {slots: {default: 'Решённые'}})
    const on = mount(AppChip, {props: {active: true}, slots: {default: 'Решённые'}})

    expect(off.attributes('aria-pressed')).toBe('false')
    expect(on.attributes('aria-pressed')).toBe('true')
  })
})
