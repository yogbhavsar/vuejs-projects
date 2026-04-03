import type { CellProps } from '@/components/sudoku/CellProps'
import type { DifficultyLevels } from '@/components/sudoku/DifficultyLevels'
import Config from '@/config'
import axios from 'axios'

export default class SudokuService {
  private isValidRawValue = (rawValue: number | null | undefined): boolean =>
    rawValue !== null && typeof rawValue === 'number' && rawValue > 0 && rawValue < 10

  getPuzzle(rawPuzzle: (number | null)[][]): CellProps[][] {
    const puzzle: CellProps[][] = []
    for (let rowCounter = 0; rowCounter < 9; rowCounter++) {
      puzzle[rowCounter] = []
      for (let colCounter = 0; colCounter < 9; colCounter++) {
        const rawValue = rawPuzzle[rowCounter]![colCounter]!
        puzzle[rowCounter]![colCounter] = {
          cellKey: Math.random().toString(),
          value: this.isValidRawValue(rawValue) ? rawValue : null,
          isValid: true,
          isDefault: rawValue !== null && rawValue !== 0,
          rowIndex: rowCounter,
          colIndex: colCounter,
        }
      }
    }
    return puzzle
  }

  getNewPuzzle: (difficulty: DifficultyLevels) => Promise<CellProps[][]> = async (difficulty) => {
    //This doesn't generate new puzzles as per the difficulty level. Keeping 'difficulty' here for demo purpose
    const rawPuzzle = await axios.get(
      `${Config.DosukuUrl}${difficulty}`,
    )
    return this.getPuzzle(rawPuzzle.data.newboard.grids[0].value)
  }

  private isRowValid = (puzzle: CellProps[][], rowIndex: number, value: number): boolean => {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      const cellValue = puzzle[rowIndex]![colIndex]!.value
      if (cellValue !== null && cellValue === value) {
        return false
      }
    }
    return true
  }

  private isColumnValid = (puzzle: CellProps[][], colIndex: number, value: number): boolean => {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      const cellValue = puzzle[rowIndex]![colIndex]!.value
      if (cellValue !== null && cellValue === value) {
        return false
      }
    }
    return true
  }

  private isBoxValid = (
    puzzle: CellProps[][],
    rowIndex: number,
    colIndex: number,
    value: number,
  ): boolean => {
    const boxRowStart = Math.floor(rowIndex / 3) * 3
    const boxColStart = Math.floor(colIndex / 3) * 3
    for (let i = boxRowStart; i < boxRowStart + 3; i++) {
      for (let j = boxColStart; j < boxColStart + 3; j++) {
        const cellValue = puzzle[i]![j]!.value
        if (cellValue !== null && cellValue === value) {
          return false
        }
      }
    }
    return true
  }

  isPuzzleComplete = (puzzle: CellProps[][]): boolean => {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      for (let colIndex = 0; colIndex < 9; colIndex++) {
        const cellValue = puzzle[rowIndex]![colIndex]!.value
        if (cellValue === null || !puzzle[rowIndex]![colIndex]!.isValid) {
          return false
        }
      }
    }
    return true
  }

  isInputValid(puzzle: CellProps[][], rowIndex: number, colIndex: number, value: number): boolean {
    return (
      this.isRowValid(puzzle, rowIndex, value) &&
      this.isColumnValid(puzzle, colIndex, value) &&
      this.isBoxValid(puzzle, rowIndex, colIndex, value)
    )
  }
}
