import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../App.vue'

async function mountAt (path: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'today', component: { template: '<p>Главная</p>' } },
      { path: '/print', name: 'print', component: { template: '<p>Печать</p>' }, meta: { layout: 'bare' } },
    ],
  })
  await router.push(path)
  await router.isReady()

  return mount(App, { global: { plugins: [router], stubs: { teleport: true } } })
}

describe('App', () => {
  it('по умолчанию показывает страницу под шапкой', async () => {
    const wrapper = await mountAt('/')

    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.text()).toContain('Главная')
  })

  it('страницу с раскладкой bare показывает без шапки', async () => {
    const wrapper = await mountAt('/print')

    expect(wrapper.find('header').exists()).toBe(false)
    expect(wrapper.text()).toContain('Печать')
  })
})
