import { describe, expect, it } from 'vitest'
import SudokuView from '../SudokuView.vue'
import { mount } from '@vue/test-utils'

describe('SudokuView', () => {
  it('renders properly', () => {
    const wrapper = mount(SudokuView)
    expect(wrapper.text()).toContain('Sudoku')
  })
})
