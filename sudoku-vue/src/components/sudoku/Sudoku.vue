<script setup lang="ts">
import type { CellValueChangedEvent } from '@/events/sudoku/cellValueChanged'
import Cell from './Cell.vue'
import { ref, watch } from 'vue'
import SudokuService from '@/services/sudokuService'
import { DifficultyLevels } from './DifficultyLevels'

const sudokuService = new SudokuService()
const difficultyLevel = ref(DifficultyLevels.Easy)
const uiPuzzle = ref(await sudokuService.getNewPuzzle(difficultyLevel.value))

watch(difficultyLevel, async (newDifficulty: DifficultyLevels) => {
  const newPuzzle = await sudokuService.getNewPuzzle(newDifficulty)
  uiPuzzle.value = [] // Clear the existing puzzle to trigger reactivity
  uiPuzzle.value = newPuzzle
})

const handleCellValueChanged = (event: CellValueChangedEvent) => {
  const { rowIndex, colIndex, newValue } = event
  uiPuzzle.value[rowIndex]![colIndex]!.isValid = true // reset validity before validation
  if (!sudokuService.isInputValid(uiPuzzle.value, rowIndex, colIndex, newValue)) {
    console.log(
      `Value ${newValue} is not valid in row ${rowIndex}, column ${colIndex}, box (${Math.floor(rowIndex / 3)}, ${Math.floor(colIndex / 3)})`,
    )
    uiPuzzle.value[rowIndex]![colIndex]!.isValid = false
  }
  uiPuzzle.value[rowIndex]![colIndex]!.value = newValue
  if (sudokuService.isPuzzleComplete(uiPuzzle.value)) {
    alert('Congratulations! You have completed the puzzle!')
  }
}
</script>

<style scoped>
.sudoku {
  display: inline-block;
  border: 2px solid var(--color-border);
}

.sudoku-row {
  display: flex;
}

.difficulty-levels {
  border-radius: 5px;
  padding: 3px;
}
</style>

<template>
  <p>
    You know the basic Sudoku. If you see <span style="color: red">red</span> numbers, they are
    invalid. If you see <span style="color: white">white</span> numbers, they are valid.
    <span style="color: var(--color-text)">Default</span> numbers cannot be changed.
  </p>
  <br />
  <label for="difficulty">Difficulty Level: </label>
  <select
    id="difficulty"
    v-model="difficultyLevel"
    class="difficulty-levels"
    title="This doesn't generate new puzzles as per the difficulty level. Keeping 'difficulty' here for demo purpose"
  >
    <option
      v-for="level in DifficultyLevels"
      :value="level"
      :selected="level === difficultyLevel"
      v-bind:key="level"
    >
      {{ level.toLocaleUpperCase() }}
    </option>
  </select>
  <br />
  <br />

  <div class="sudoku">
    <div v-for="(row, rowIndex) in uiPuzzle" :key="rowIndex" class="sudoku-row">
      <Cell
        v-for="cell in row"
        :key="cell.cellKey"
        :cellKey="cell.cellKey"
        :value="cell.value"
        :is-valid="cell.isValid"
        :is-default="cell.isDefault"
        :row-index="cell.rowIndex"
        :col-index="cell.colIndex"
        @cellValueChanged="handleCellValueChanged"
      />
    </div>
  </div>
</template>
