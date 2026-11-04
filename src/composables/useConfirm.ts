import { ref } from 'vue'

export type ConfirmTone = 'default' | 'danger'

export interface ConfirmOptions {
  message: string
  title?: string
  confirmText?: string
  cancelText?: string
  tone?: ConfirmTone
  hold?: boolean
  doneText?: string
  icon?: 'trash' | 'hide'
}

interface ConfirmState extends ConfirmOptions {
  open: boolean
}

const state = ref<ConfirmState>({ open: false, message: '' })
let resolver: ((value: boolean) => void) | null = null

function settle (result: boolean) {
  state.value.open = false
  resolver?.(result)
  resolver = null
}

export function useConfirm () {
  function confirm (options: string | ConfirmOptions): Promise<boolean> {
    resolver?.(false)
    const opts = typeof options === 'string' ? { message: options } : options
    state.value = { ...opts, open: true }
    return new Promise<boolean>((resolve) => {
      resolver = resolve
    })
  }

  return {
    confirmState: state,
    confirm,
    handleConfirm: () => settle(true),
    handleCancel: () => settle(false),
  }
}
