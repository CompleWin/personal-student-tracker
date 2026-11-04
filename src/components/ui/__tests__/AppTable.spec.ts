import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import AppTable from '../AppTable.vue'

const columns = [
  {key: 'name', label: 'Ник'},
  {key: 'solved', label: 'Решено', numeric: true},
]

const rows = [
  {id: 1, name: 'marina', solved: 12},
  {id: 2, name: 'anton', solved: 3},
]

describe('AppTable', () => {
  it('отдаёт строки в порядке данных', () => {
    const wrapper = mount(AppTable, {props: {columns, rows}})

    const names = wrapper.findAll('tbody tr').map(r => r.get('td').text())

    expect(names).toEqual(['marina', 'anton'])
  })

  it('рендерит заголовки колонок', () => {
    const wrapper = mount(AppTable, {props: {columns, rows}})

    expect(wrapper.findAll('th').map(h => h.text())).toEqual(['Ник', 'Решено'])
  })

  it('отдаёт ячейку слоту вместе со строкой', () => {
    const wrapper = mount(AppTable, {
      props: {columns, rows},
      slots: {'cell-name': '<b>{{ params.row.name }}</b>'},
    })

    expect(wrapper.findAll('tbody b').map(b => b.text())).toEqual(['marina', 'anton'])
  })

  it('без строк рисует только шапку', () => {
    const wrapper = mount(AppTable, {props: {columns, rows: []}})

    expect(wrapper.findAll('tbody tr')).toHaveLength(0)
  })
})
