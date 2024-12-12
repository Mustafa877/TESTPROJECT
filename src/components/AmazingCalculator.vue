<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="calculator-card" elevation="8">
          <v-card-text>
            <v-text-field
              v-model="display"
              :class="displayClass"
              readonly
              variant="outlined"
              density="compact"
              hide-details
              class="text-right mb-4"
              @keydown="handleKeydown"
            ></v-text-field>

            <v-row dense>
              <v-col v-for="button in buttons" :key="button.value" cols="3">
                <v-btn
                  block
                  size="x-large"
                  :color="button.color"
                  :variant="button.variant"
                  @click="handleButtonClick(button.value)"
                >
                  {{ button.label }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';

const display = ref('0');

const buttons = [
  { label: '7', value: '7', color: 'grey-lighten-1', variant: 'flat' },
  { label: '8', value: '8', color: 'grey-lighten-1', variant: 'flat' },
  { label: '9', value: '9', color: 'grey-lighten-1', variant: 'flat' },
  { label: '÷', value: '/', color: 'blue-lighten-1', variant: 'flat' },
  { label: '4', value: '4', color: 'grey-lighten-1', variant: 'flat' },
  { label: '5', value: '5', color: 'grey-lighten-1', variant: 'flat' },
  { label: '6', value: '6', color: 'grey-lighten-1', variant: 'flat' },
  { label: '×', value: '*', color: 'blue-lighten-1', variant: 'flat' },
  { label: '1', value: '1', color: 'grey-lighten-1', variant: 'flat' },
  { label: '2', value: '2', color: 'grey-lighten-1', variant: 'flat' },
  { label: '3', value: '3', color: 'grey-lighten-1', variant: 'flat' },
  { label: '−', value: '-', color: 'blue-lighten-1', variant: 'flat' },
  { label: '0', value: '0', color: 'grey-lighten-1', variant: 'flat' },
  { label: '.', value: '.', color: 'grey-lighten-1', variant: 'flat' },
  { label: '=', value: '=', color: 'green', variant: 'flat' },
  { label: '+', value: '+', color: 'blue-lighten-1', variant: 'flat' },
  { label: 'C', value: 'C', color: 'red', variant: 'flat' },
];

const appendToDisplay = (value) => {
  if (display.value === '0' && value !== '.') {
    display.value = value;
  } else {
    display.value += value;
  }
};

const calculate = () => {
  try {
    display.value = eval(display.value).toString();
  } catch (error) {
    display.value = 'Error';
  }
};

const displayClass = computed(() => {
  return display.value.length > 12 ? 'small-text' : '';
});

const clearDisplay = () => {
  display.value = '0';
};

const handleKeydown = (event) => {
  const key = event.key;
  if (!isNaN(key) || key === '.' || '+-*/'.includes(key)) {
    appendToDisplay(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Escape') {
    clearDisplay();
  }
};

const handleButtonClick = (value) => {
  if (value === '=') {
    calculate();
  } else if (value === 'C') {
    clearDisplay();
  } else {
    appendToDisplay(value);
  }
};
</script>

<style scoped>
.calculator-card {
  max-width: 100%;
  margin: 0 auto;
}

.small-text :deep(input) {
  font-size: 1.5rem;
}

:deep(.v-field__input) {
  font-size: 2rem;
  font-weight: bold;
}

@media (max-width: 600px) {
  :deep(.v-btn) {
    min-width: 0;
    width: 100%;
    height: 64px;
  }
}
</style>
