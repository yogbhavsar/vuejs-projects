<script lang="ts" setup>
import Sudoku from '@/components/sudoku/Sudoku.vue'
</script>

<style scoped>
.sudoku-view {
  padding: 2rem;
  text-align: center;
}
</style>

<template>
  <div class="sudoku-view">
    <h1>Sudoku</h1>
    <Suspense>
      <Sudoku />
    </Suspense>
  </div>
</template>
