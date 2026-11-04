import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import Modal from '../Modal.vue'

const mountModal = () => mount(Modal, {global: {stubs: {teleport: true}}})

describe('Modal', () => {
  it('закрывается по Esc', async () => {
    const wrapper = mountModal()

    window.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}))

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('не закрывается по клику в затемнение', async () => {
    const wrapper = mountModal()

    await wrapper.get('div > div').trigger('click')

    expect(wrapper.emitted('close')).toBeUndefined()
  })

  it('держит страницу от прокрутки, пока открыт', () => {
    const wrapper = mountModal()

    expect(document.body.classList.contains('overflow-hidden')).toBe(true)

    wrapper.unmount()

    expect(document.body.classList.contains('overflow-hidden')).toBe(false)
  })
})
