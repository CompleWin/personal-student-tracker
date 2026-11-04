import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import AppHeader from '../AppHeader.vue'

const blank = { template: '<div />' }

async function mountAt (path: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'today', component: blank },
      { path: '/:pathMatch(.*)*', name: 'notFound', component: blank },
    ],
  })
  await router.push(path)
  await router.isReady()

  return mount(AppHeader, { global: { plugins: [router] } })
}

function linkByText (wrapper: Awaited<ReturnType<typeof mountAt>>, text: string) {
  return wrapper.findAll('a').find(a => a.text() === text)
}

describe('AppHeader', () => {
  it('надпись "Ученики" ведёт на главную', async () => {
    const wrapper = await mountAt('/abc')

    expect(linkByText(wrapper, 'Ученики')?.attributes('href')).toBe('/')
  })

  it('на главной отмечает пункт "Сегодня" текущим', async () => {
    const wrapper = await mountAt('/')

    expect(linkByText(wrapper, 'Сегодня')?.attributes('aria-current')).toBe('page')
  })

  it('на другой странице пункт "Сегодня" не текущий', async () => {
    const wrapper = await mountAt('/abc')

    expect(linkByText(wrapper, 'Сегодня')?.attributes('aria-current')).toBeUndefined()
  })
})
