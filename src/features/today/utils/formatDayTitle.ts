const DAY_MONTH = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' })
const WEEKDAY = new Intl.DateTimeFormat('ru-RU', { weekday: 'long' })

export function formatDayTitle (date: Date): string {
  return `${DAY_MONTH.format(date)}, ${WEEKDAY.format(date)}`
}
