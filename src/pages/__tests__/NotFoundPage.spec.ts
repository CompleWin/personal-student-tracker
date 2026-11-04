import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import NotFoundPage from '../NotFoundPage.vue'

async function mountPage () {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'today', component: { template: '<div />' } },
      { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFoundPage },
    ],
  })
  await router.push('/abc')
  await router.isReady()

  return mount(NotFoundPage, { global: { plugins: [router] } })
}

describe('NotFoundPage', () => {
  it('сообщает, что страницы нет', async () => {
    const wrapper = await mountPage()

    expect(wrapper.get('h1').text()).toBe('Страница не найдена')
  })

  it('ведёт на главную', async () => {
    const wrapper = await mountPage()

    const link = wrapper.findAll('a').find(a => a.text() === 'На главную')

    expect(link?.attributes('href')).toBe('/')
  })
})
