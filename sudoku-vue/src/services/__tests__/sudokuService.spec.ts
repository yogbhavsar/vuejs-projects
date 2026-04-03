import axios from 'axios'
import { describe, it, expect, vi } from 'vitest'
import SudokuService from '../sudokuService'
import { DifficultyLevels } from '@/components/sudoku/DifficultyLevels'

vi.mock('axios')
const mockAxios = axios as unknown as { get: ReturnType<typeof vi.fn> }
const sudokuService = new SudokuService()

describe('sudokuService', () => {
  it('should generate a valid sudoku board', async () => {
    // Mock the API response
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

    const puzzle = await sudokuService.getNewPuzzle(DifficultyLevels.Easy)
    expect(puzzle).toHaveLength(9)
    expect(puzzle[0]).toHaveLength(9)
    expect(puzzle[0]![0]).toEqual({
      cellKey: expect.any(String),
      value: 5,
      isValid: true,
      isDefault: true,
      rowIndex: 0,
      colIndex: 0,
    })
  })
  it('should throw an error if API call fails', async () => {
    mockAxios.get.mockRejectedValue(new Error('API error'))
    const sudokuService = new SudokuService()
    await expect(sudokuService.getNewPuzzle(DifficultyLevels.Medium)).rejects.toThrow('API error')
  })
  it('isPuzzleComplete should return false for an incomplete puzzle', async () => {
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

    const puzzle = await sudokuService.getNewPuzzle(DifficultyLevels.Easy)
    expect(sudokuService.isPuzzleComplete(puzzle)).toBe(false)
  })
  it('isPuzzleComplete should return true for a complete and valid puzzle', async () => {
    const response = {
      data: {
        newboard: {
          grids: [
            {
              value: [
                [3, 9, 2, 6, 5, 8, 7, 1, 4],
                [1, 8, 4, 9, 3, 7, 2, 5, 6],
                [6, 5, 7, 1, 4, 2, 8, 3, 9],
                [8, 4, 1, 5, 7, 3, 9, 6, 2],
                [9, 2, 5, 4, 6, 1, 3, 7, 8],
                [7, 6, 3, 2, 8, 9, 1, 4, 5],
                [2, 7, 6, 8, 1, 5, 4, 9, 3],
                [4, 1, 9, 3, 2, 6, 5, 8, 7],
                [5, 3, 8, 7, 9, 4, 6, 2, 1],
              ],
            },
          ],
        },
      },
    }
    mockAxios.get.mockResolvedValue(response)

    const puzzle = await sudokuService.getNewPuzzle(DifficultyLevels.Easy)
    expect(sudokuService.isPuzzleComplete(puzzle)).toBe(true)
  })
  // oxlint-disable jest/valid-describe-callback
  describe('isInputValid', async () => {
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
    const puzzle = await sudokuService.getNewPuzzle(DifficultyLevels.Easy)
    it.each([
      [0, 2, 5, false], // Duplicate in row
      [0, 2, 8, false], // Duplicate in column
      [0, 2, 9, false], // Duplicate in box
      [0, 2, 4, true], // Valid input
    ])('isInputValid should return %p for input (%p, %p, %p)', (row, col, value, expected) => {
      expect(sudokuService.isInputValid(puzzle, row, col, value)).toBe(expected)
    })
  })
})
