import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastItem {
  id: number
  text: string
  type: ToastType
}

const DURATION = 5000

const toasts = ref<ToastItem[]>([])

interface ToastTimer {
  handle: ReturnType<typeof setTimeout> | null
  remaining: number
  startedAt: number
}

const timers = new Map<number, ToastTimer>()
let lastId = 0

function clearHandle (id: number) {
  const timer = timers.get(id)
  if (!timer?.handle) return
  clearTimeout(timer.handle)
  timer.handle = null
}

function remove (id: number) {
  clearHandle(id)
  timers.delete(id)
  toasts.value = toasts.value.filter(toast => toast.id !== id)
}

function startTimer (id: number, ms: number) {
  clearHandle(id)
  timers.set(id, { handle: setTimeout(() => remove(id), ms), remaining: ms, startedAt: Date.now() })
}

export function useToast () {
  function show (message: string, toastType: ToastType = 'success'): number {
    const id = ++lastId
    toasts.value = [...toasts.value, { id, text: message, type: toastType }]
    startTimer(id, DURATION)
    return id
  }

  function hide (id: number) {
    remove(id)
  }

  function pause (id: number) {
    const timer = timers.get(id)
    if (!timer?.handle) return
    clearHandle(id)
    timer.remaining = Math.max(0, timer.remaining - (Date.now() - timer.startedAt))
  }

  function resume (id: number) {
    const timer = timers.get(id)
    if (!timer || timer.handle || timer.remaining <= 0) return
    startTimer(id, timer.remaining)
  }

  return { toasts, show, hide, pause, resume }
}
