<template>
  <v-container class="progress-container">
    <v-card class="mx-auto" max-width="500">
      <v-card-text>
        <v-stepper v-model="currentStep" class="elevation-0">
          <v-stepper-header>
            <template v-for="(step, index) in steps" :key="index">
              <v-stepper-item
                :value="index + 1"
                :complete="currentStep > index + 1"
                :editable="true"
                @click="goToStep(index)"
              >
                {{ step }}
              </v-stepper-item>
              <v-divider v-if="index < steps.length - 1"></v-divider>
            </template>
          </v-stepper-header>
        </v-stepper>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          @click="prevStep"
          :disabled="currentStep === 1"
          color="primary"
          variant="outlined"
        >
          Previous
        </v-btn>
        <v-btn
          @click="nextStep"
          :disabled="currentStep === steps.length"
          color="primary"
        >
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const steps = ref(['Step 1', 'Step 2', 'Step 3', 'Step 4'])
const currentStep = ref(1)

const nextStep = () => {
  if (currentStep.value < steps.value.length) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const goToStep = (stepIndex) => {
  currentStep.value = stepIndex + 1
}
</script>

<style scoped>
.progress-container {
  margin-top: 50px;
}
</style>
