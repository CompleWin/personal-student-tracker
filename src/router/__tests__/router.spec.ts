import { describe, expect, it } from 'vitest'
import router from '../index.ts'

describe('router', () => {
  it('корень открывает "Сегодня"', () => {
    expect(router.resolve('/').name).toBe('today')
  })

  it('неизвестный адрес ведёт на страницу "Страница не найдена"', () => {
    expect(router.resolve('/abc').name).toBe('notFound')
    expect(router.resolve('/abc/def').name).toBe('notFound')
  })
})
