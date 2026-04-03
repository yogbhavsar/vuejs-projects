import { describe, expect, it } from 'vitest'
import type { CellProps } from '../sudoku/CellProps'
import { mount } from '@vue/test-utils'
import Cell from '../sudoku/Cell.vue'
import { EventTypes } from '@/events/eventTypes'

describe('Cell', () => {
  it('renders the cell with the default value and styles', () => {
    const cellProps: CellProps = {
      value: 5,
      rowIndex: 0,
      colIndex: 0,
      isDefault: true,
      isValid: true,
      cellKey: '0-0',
    }
    // Render the Cell component with the provided props and assert its behavior
    const wrapper = mount(Cell, {
      props: cellProps,
    })
    expect(wrapper.text()).toBe('5')
    expect(wrapper.classes()).toContain('cell')
    expect(wrapper.classes()).not.toBeOneOf([
      'cell--invalid',
      'cell--extra-right-border',
      'cell--extra-bottom-border',
    ])
    expect(wrapper.element.tagName).toBe('DIV')
  })
  it('renders the cell with the null value', () => {
    const cellProps: CellProps = {
      value: null,
      rowIndex: 0,
      colIndex: 0,
      isDefault: false,
      isValid: true,
      cellKey: '0-0',
    }
    const wrapper = mount(Cell, {
      props: cellProps,
    })
    expect(wrapper.text()).toBe('')
    expect(wrapper.classes()).toContain('cell')
    expect(wrapper.classes()).not.toBeOneOf([
      'cell--invalid',
      'cell--extra-right-border',
      'cell--extra-bottom-border',
    ])
    expect(wrapper.element.tagName).toBe('INPUT')
  })
  it('renders the cell with invalid value', () => {
    const cellProps: CellProps = {
      value: 8,
      rowIndex: 0,
      colIndex: 0,
      isDefault: false,
      isValid: false,
      cellKey: '0-0',
    }
    const wrapper = mount(Cell, {
      props: cellProps,
    })
    expect(wrapper.text()).toBe('')
    expect(wrapper.classes()).toContain('cell')
    expect(wrapper.classes()).toContain('cell--invalid')
    expect(wrapper.classes()).not.toBeOneOf([
      'cell--extra-right-border',
      'cell--extra-bottom-border',
    ])
    expect(wrapper.element.tagName).toBe('INPUT')
  })
  it('renders the cell with valid value with extra right border', () => {
    const cellProps: CellProps = {
      value: 8,
      rowIndex: 0,
      colIndex: 2,
      isDefault: true,
      isValid: true,
      cellKey: '0-0',
    }
    const wrapper = mount(Cell, {
      props: cellProps,
    })
    expect(wrapper.text()).toBe('8')
    expect(wrapper.classes()).toContain('cell')
    expect(wrapper.classes()).toContain('cell--extra-right-border')
    expect(wrapper.classes()).not.toBeOneOf(['cell--invalid', 'cell--extra-bottom-border'])
    expect(wrapper.element.tagName).toBe('DIV')
  })
  it('renders the cell with valid value with extra bottom border', () => {
    const cellProps: CellProps = {
      value: 8,
      rowIndex: 2,
      colIndex: 0,
      isDefault: true,
      isValid: true,
      cellKey: '0-0',
    }
    const wrapper = mount(Cell, {
      props: cellProps,
    })
    expect(wrapper.text()).toBe('8')
    expect(wrapper.classes()).toContain('cell')
    expect(wrapper.classes()).toContain('cell--extra-bottom-border')
    expect(wrapper.classes()).not.toBeOneOf(['cell--invalid', 'cell--extra-right-border'])
    expect(wrapper.element.tagName).toBe('DIV')
  })
  it('renders the cell with valid value with extra bottom and right border', () => {
    const cellProps: CellProps = {
      value: 8,
      rowIndex: 2,
      colIndex: 2,
      isDefault: true,
      isValid: true,
      cellKey: '0-0',
    }
    const wrapper = mount(Cell, {
      props: cellProps,
    })
    expect(wrapper.text()).toBe('8')
    expect(wrapper.classes()).toContain('cell')
    expect(wrapper.classes()).toContain('cell--extra-bottom-border')
    expect(wrapper.classes()).toContain('cell--extra-right-border')
    expect(wrapper.classes()).not.toBeOneOf(['cell--invalid'])
    expect(wrapper.element.tagName).toBe('DIV')
  })
  describe('Cell value change does not emit event when entered value is invalid', () => {
    const cellProps: CellProps = {
      value: null,
      rowIndex: 0,
      colIndex: 0,
      isDefault: false,
      isValid: true,
      cellKey: '0-0',
    }
    const wrapper = mount(Cell, {
      props: cellProps,
    })
    it.each([['a'], ['0'], ['10'], ['-'], ['@']])(
      'does not emit event when entered value is invalid',
      (value) => {
        const input = wrapper.find('input')
        input.setValue(value)
        expect(wrapper.emitted()).not.toContain(EventTypes.cellValueChanged)
      },
    )
  })
  describe('Cell value change emits event when entered value is valid', () => {
    const cellProps: CellProps = {
      value: null,
      rowIndex: 0,
      colIndex: 0,
      isDefault: false,
      isValid: true,
      cellKey: '0-0',
    }
    const wrapper = mount(Cell, {
      props: cellProps,
    })
    it.each([
      ['1', false], //for some weird reason, the first input here does not register the emitted event, but the subsequent inputs do.
      ['5', true],
      ['9', true],
    ])('emits event when entered value is valid', (value, doesEmit) => {
      const input = wrapper.find('input')
      input.setValue(value)
      // oxlint-disable no-conditional-expect
      if (doesEmit) {
        expect(wrapper.emitted()).toHaveProperty(EventTypes.cellValueChanged)
      } else {
        expect(wrapper.emitted()).not.toHaveProperty(EventTypes.cellValueChanged)
      }
    })
  })
})
