// AsyncComponent.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { defineComponent, h, Suspense } from 'vue'
import Sudoku from '../sudoku/Sudoku.vue'
import axios from 'axios'

vi.mock('axios')
const mockAxios = axios as unknown as { get: ReturnType<typeof vi.fn> }

describe('Sudoku with Suspense', () => {
  const response = {
    data: {
      newboard: {
        grids: [
          {
            value: [
              [5, 3, 0, 0, 7, 0, 0, 0, 0],
              [6, 0, 0, 1, 9, 5, 0, 0, 0],
              [0, 9, 8, 0, 0, 0, 0, 6, 0],
              [8, 0, 0, 0, 6, 0, 0, 0, 3],
              [4, 0, 0, 8, 0, 3, 0, 0, 1],
              [7, 0, 0, 0, 2, 0, 0, 0, 6],
              [0, 6, 0, 0, 0, 0, 2, 8, 0],
              [0, 0, 0, 4, 1, 9, 0, 0, 0],
              [0, 0, 0, 0, 8, 0, 0, 7, 9],
            ],
          },
        ],
      },
    },
  }
  mockAxios.get.mockResolvedValue(response)
  it('renders correctly after the async setup resolves', async () => {
    // 1. Create a wrapper component to provide the Suspense boundary
    const Wrapper = defineComponent({
      render() {
        return h(Suspense, null, {
          default: h(Sudoku),
          fallback: h('div', 'Loading...'),
        })
      },
    })

    const wrapper = mount(Wrapper)

    // 2. Wait for the Suspense boundary to resolve its internal promises
    // In Vue 3, this usually requires waiting for the microtask queue
    await new Promise((resolve) => setTimeout(resolve, 0))

    // 3. Assert the final state
    expect(wrapper.text()).toContain('You know the basic Sudoku. If you see')
  })
})
