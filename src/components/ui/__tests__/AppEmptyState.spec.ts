import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import AppEmptyState from '../AppEmptyState.vue'

describe('AppEmptyState', () => {
  it('рендерит переданное действие', () => {
    const wrapper = mount(AppEmptyState, {
      props: {label: 'Ничего не найдено', title: 'По этим фильтрам заданий нет.'},
      slots: {action: '<button>Сбросить фильтры</button>'},
    })

    expect(wrapper.text()).toContain('Ничего не найдено')
    expect(wrapper.find('button').text()).toBe('Сбросить фильтры')
  })

  it('без действия не падает и не рисует пустую обёртку', () => {
    const wrapper = mount(AppEmptyState, {props: {label: 'Загрузка'}})

    expect(wrapper.text()).toBe('Загрузка')
    expect(wrapper.find('button').exists()).toBe(false)
  })
})
