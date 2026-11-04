import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

type UseToast = typeof import('../useToast.ts')['useToast']

describe('useToast', () => {
  let useToast: UseToast

  beforeEach(async () => {
    vi.resetModules()
    vi.useFakeTimers()
    ;({useToast} = await import('../useToast.ts'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('закрывает тост по таймеру', () => {
    const {toasts, show} = useToast()

    show('Сохранено')
    expect(toasts.value).toHaveLength(1)

    vi.advanceTimersByTime(5000)

    expect(toasts.value).toHaveLength(0)
  })

  it('два тоста подряд гаснут каждый по своему сроку', () => {
    const {toasts, show} = useToast()

    show('Первый')
    vi.advanceTimersByTime(2000)
    show('Второй')
    vi.advanceTimersByTime(3000)

    expect(toasts.value.map(t => t.text)).toEqual(['Второй'])

    vi.advanceTimersByTime(2000)

    expect(toasts.value).toHaveLength(0)
  })

  it('закрывает названный тост, не трогая соседний', () => {
    const {toasts, show, hide} = useToast()

    const first = show('Первый')
    show('Второй')
    hide(first)

    expect(toasts.value.map(t => t.text)).toEqual(['Второй'])
  })

  it('под мышью тост не гаснет, после ухода досчитывает остаток', () => {
    const {toasts, show, pause, resume} = useToast()

    const id = show('Наведи на меня')
    vi.advanceTimersByTime(4000)
    pause(id)
    vi.advanceTimersByTime(60000)

    expect(toasts.value).toHaveLength(1)

    resume(id)
    vi.advanceTimersByTime(1000)

    expect(toasts.value).toHaveLength(0)
  })
})
