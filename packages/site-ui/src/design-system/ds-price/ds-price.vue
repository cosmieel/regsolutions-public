<template>
  <table class="ds-price">
    <tr v-for="(line, lineIndex) in table" :key="getKey(lineIndex)" class="ds-price__line">
      <template v-if="line.head">
        <th
          v-for="(cell, cellIndex) in line.head"
          :id="getScope(line.id, cellIndex)"
          :key="getKey(cellIndex)"
          class="ds-price__cell ds-price__cell_head"
          :class="getCellClassModifier(cellIndex, table, lineIndex)"
        >
          {{ cell }}
        </th>
      </template>
      <template v-if="line.body">
        <td
          v-for="(cell, cellIndex) in line.body"
          :key="getKey(cellIndex)"
          :headers="getScope(line.id, cellIndex)"
          class="ds-price__cell"
          :class="getCellClassModifier(cellIndex, table, lineIndex)"
        >
          {{ cell }}
        </td>
      </template>
      <td
        v-if="line.description && line.description.length > 0"
        class="ds-price__cell-description"
        :class="{ 'ds-price__cell-description_last-line': lineIndex === table.length - 1 }"
        :colspan="colspan"
      >
        {{ line.description }}
      </td>
    </tr>
  </table>
</template>

<script setup>
import { computed } from 'vue';

const property = defineProps({
  price: {
    type: Object,
    required: true,
  },
});

const tableId = Math.floor(Math.random() * 100);

const colspan = computed(() => {
  let maxNumber = null;

  for (const line of property.price) {
    if (line.head) {
      maxNumber = maxNumber < line.head.length ? line.head.length : maxNumber;
    } else if (line.body) {
      maxNumber = maxNumber < line.body.length ? line.body.length : maxNumber;
    }
  }

  return maxNumber;
});

const table = computed(() => {
  const table = [];
  let headLineNumber = 0;

  for (const line of property.price) {
    if (line.head) {
      ++headLineNumber;
      const currentLine = { head: convertArray(line.head), id: headLineNumber };
      table.push(currentLine);
    } else if (line.body) {
      const currentLine = { body: convertArray(line.body), id: headLineNumber };
      table.push(currentLine);
    } else {
      table.push(line);
    }
  }

  return table;
});

function getKey(index) {
  return `${index}${Math.random()}`;
}

function getCellClassModifier(cellIndex, table, lineIndex) {
  let modifier = cellIndex === 0 ? 'ds-price__cell_first' : '';
  modifier = lineIndex === 0 ? `${modifier} ds-price__cell_first-line` : modifier;
  modifier = lineIndex === table.length - 1 ? `${modifier} ds-price__cell_last-line` : modifier;
  return modifier;
}

function convertArray(line) {
  if (line.length < colspan.value) {
    const difference = colspan.value - line.length;
    const remainingCells = line.slice(1);
    const intermediateCells = [];

    for (let step = 0; step < difference; step++) {
      intermediateCells.push('');
    }

    return [line[0], ...intermediateCells, ...remainingCells];
  }

  return line;
}

function getScope(id, cellIndex) {
  return `${tableId}-${id}-${cellIndex}`;
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-price {
  width: 100%;

  &__cell {
    padding: 0 0 16px 24px;
    text-align: right;
    color: var(--font-primary);
    font-weight: 400;
    @add-mixin b3;
    white-space: nowrap;

    @add-mixin desktop-all {
      @add-mixin b2;
    }

    &_first {
      padding-left: 0;
      text-align: left;
    }

    &_head {
      padding-top: 16px;
      font-weight: 500;
      @add-mixin b3;

      @add-mixin desktop-all {
        @add-mixin b2;
      }
    }

    &_first-line {
      padding-top: 0;
    }

    &_last-line {
      padding-bottom: 0;
    }
  }

  &__cell-description {
    padding: 16px 0;
    color: var(--font-secondary);
    font-weight: 400;
    border-top: 1px solid var(--border-divider);
    white-space: pre-wrap;
    @add-mixin b4;

    &_last-line {
      padding-bottom: 0;
    }
  }
}
</style>
