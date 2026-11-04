import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
import {mount} from '@vue/test-utils'
import ConfirmDialog from '../ConfirmDialog.vue'

const mountDialog = (props: Record<string, unknown> = {}) => mount(ConfirmDialog, {
  props: {open: true, message: 'Задание удалится вместе с комментариями', ...props},
  global: {stubs: {teleport: true}},
})

const confirmButton = (wrapper: ReturnType<typeof mountDialog>, label: string) =>
  wrapper.findAll('button').filter(b => b.text() === label)[0]!

describe('ConfirmDialog', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('удержание три секунды подтверждает удаление', async () => {
    const wrapper = mountDialog({tone: 'danger', confirmText: 'Удалить', hold: true})

    await confirmButton(wrapper, 'Удалить').trigger('pointerdown')
    vi.advanceTimersByTime(3000)

    expect(wrapper.emitted('confirm')).toHaveLength(1)
  })

  it('отпускание раньше срока ничего не подтверждает', async () => {
    const wrapper = mountDialog({tone: 'danger', confirmText: 'Удалить', hold: true})
    const button = confirmButton(wrapper, 'Удалить')

    await button.trigger('pointerdown')
    vi.advanceTimersByTime(2000)
    await button.trigger('pointerup')
    vi.advanceTimersByTime(3000)

    expect(wrapper.emitted('confirm')).toBeUndefined()
  })

  it('обычное подтверждение остаётся кликом', async () => {
    const wrapper = mountDialog({confirmText: 'Подтвердить'})

    await confirmButton(wrapper, 'Подтвердить').trigger('click')

    expect(wrapper.emitted('confirm')).toHaveLength(1)
  })

  it('красный тон сам по себе удержания не требует', async () => {
    const wrapper = mountDialog({tone: 'danger', confirmText: 'Удалить'})

    await confirmButton(wrapper, 'Удалить').trigger('click')

    expect(wrapper.emitted('confirm')).toHaveLength(1)
  })

  it('после слишком короткого нажатия объясняет, что кнопку держат', async () => {
    const wrapper = mountDialog({tone: 'danger', confirmText: 'Удалить', hold: true})
    const button = confirmButton(wrapper, 'Удалить')

    expect(wrapper.text()).not.toContain('держать три секунды')

    await button.trigger('pointerdown')
    vi.advanceTimersByTime(500)
    await button.trigger('pointerup')

    expect(wrapper.text()).toContain('держать три секунды')
  })

  it('рисует иконку действия на кнопке подтверждения', () => {
    const remove = mountDialog({tone: 'danger', confirmText: 'Удалить', icon: 'trash'})
    const plain = mountDialog({tone: 'danger', confirmText: 'Удалить'})

    expect(confirmButton(remove, 'Удалить').find('svg').exists()).toBe(true)
    expect(confirmButton(plain, 'Удалить').find('svg').exists()).toBe(false)
  })

  it('отмена закрывает диалог', async () => {
    const wrapper = mountDialog({tone: 'danger'})

    await confirmButton(wrapper, 'Отмена').trigger('click')

    expect(wrapper.emitted('cancel')).toHaveLength(1)
    expect(wrapper.emitted('update:open')).toEqual([[false]])
  })
})
