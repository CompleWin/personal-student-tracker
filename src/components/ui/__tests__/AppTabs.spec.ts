import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import AppTabs from '../AppTabs.vue'

const tabs = [
  {id: 'stats', label: 'Статистика'},
  {id: 'settings', label: 'Настройки'},
]

describe('AppTabs', () => {
  it('сообщает о выборе другой вкладки', async () => {
    const wrapper = mount(AppTabs, {props: {tabs, modelValue: 'stats'}})

    await wrapper.get('[role="tab"]:last-of-type').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([['settings']])
  })

  it('помечает активную вкладку', () => {
    const wrapper = mount(AppTabs, {props: {tabs, modelValue: 'settings'}})

    const marks = wrapper.findAll('[role="tab"]').map(t => t.attributes('aria-selected'))

    expect(marks).toEqual(['false', 'true'])
  })

  it('рендерит вкладку-ссылку, когда у неё есть маршрут', () => {
    const wrapper = mount(AppTabs, {
      props: {tabs: [{id: 'users', label: 'Пользователи', to: '/admin/users'}], modelValue: 'users'},
      global: {stubs: {RouterLink: {template: '<a><slot /></a>'}}},
    })

    expect(wrapper.find('a').exists()).toBe(true)
  })

  it('показывает счётчик рядом с подписью', () => {
    const wrapper = mount(AppTabs, {
      props: {tabs: [{id: 'comments', label: 'Комментарии', count: 12}], modelValue: 'comments'},
    })

    expect(wrapper.text()).toContain('12')
  })
})
