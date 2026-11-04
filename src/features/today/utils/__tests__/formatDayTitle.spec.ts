import { describe, expect, it } from 'vitest'
import { formatDayTitle } from '../formatDayTitle.ts'

describe('formatDayTitle', () => {
  it('пишет число, месяц в родительном падеже и день недели', () => {
    expect(formatDayTitle(new Date(2026, 10, 4, 10))).toBe('4 ноября, среда')
  })

  it('не зависит от времени внутри дня', () => {
    expect(formatDayTitle(new Date(2027, 0, 1, 0, 0))).toBe('1 января, пятница')
    expect(formatDayTitle(new Date(2027, 0, 1, 23, 59))).toBe('1 января, пятница')
  })
})
