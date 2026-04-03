<script setup lang="ts">
import type { CellValueChangedEvent } from '@/events/sudoku/cellValueChanged'
import type { CellProps } from '@/components/sudoku/CellProps'
import { ref, watch } from 'vue'
import { EventTypes } from '@/events/eventTypes'

const props = defineProps<CellProps>()
const emit = defineEmits<{
  (e: EventTypes.cellValueChanged, payload: CellValueChangedEvent): void
}>()

const localValue = props.value !== null && props.isDefault ? ref(props.value.toString()) : ref('')
watch(localValue, (newValue) => {
  if (newValue === '') {
    localValue.value = ''
  } else if (isNaN(Number(newValue)) || Number(newValue) < 1 || Number(newValue) > 9) {
    //ignore
  } else {
    emit(EventTypes.cellValueChanged, {
      rowIndex: props.rowIndex,
      colIndex: props.colIndex,
      newValue: Number(newValue),
    })
  }
})
</script>

<style scoped>
.cell {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  font-size: 1.2rem;
}

.cell-input {
  text-align: center;
  background: transparent;
  color: white;
}

.cell--invalid {
  color: red;
}

.cell--selected {
  color: white;
}

.cell--extra-right-border {
  border-right: 3px solid var(--color-border);
}

.cell--extra-bottom-border {
  border-bottom: 3px solid var(--color-border);
}
</style>

<template>
  <div
    v-if="isDefault"
    class="cell"
    :class="{
      'cell--invalid': !isDefault && !isValid,
      'cell--extra-right-border': colIndex === 2 || colIndex === 5,
      'cell--extra-bottom-border': rowIndex === 2 || rowIndex === 5,
    }"
  >
    {{ value }}
  </div>
  <input
    v-else
    type="text"
    v-model="localValue"
    class="cell cell-input"
    :class="{
      'cell--invalid': !isDefault && !isValid,
      'cell--extra-right-border': colIndex === 2 || colIndex === 5,
      'cell--extra-bottom-border': rowIndex === 2 || rowIndex === 5,
    }"
    maxlength="1"
  />
</template>
