import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import AppFormError from '../AppFormError.vue'

describe('AppFormError', () => {
  it('показывает текст ошибки', () => {
    const wrapper = mount(AppFormError, {props: {message: 'Пароли не совпадают'}})

    expect(wrapper.text()).toBe('Пароли не совпадают')
  })

  it('без ошибки ничего не занимает на странице', () => {
    const wrapper = mount(AppFormError, {props: {message: ''}})

    expect(wrapper.find('p').exists()).toBe(false)
  })
})
