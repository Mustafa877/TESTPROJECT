<template>
  <v-container class="password-generator-container">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">Password Generator</v-card-title>

          <v-card-text>
            <v-slider
              v-model="passwordLength"
              :min="4"
              :max="32"
              :step="1"
              label="Password Length"
              thumb-label
              class="mb-4"
            ></v-slider>

            <v-checkbox
              v-model="includeUppercase"
              label="Include Uppercase"
              hide-details
              class="mb-2"
            ></v-checkbox>

            <v-checkbox
              v-model="includeNumbers"
              label="Include Numbers"
              hide-details
              class="mb-2"
            ></v-checkbox>

            <v-checkbox
              v-model="includeSymbols"
              label="Include Symbols"
              hide-details
              class="mb-4"
            ></v-checkbox>

            <v-btn
              color="primary"
              block
              @click="generatePassword"
              class="mb-4"
            >
              Generate Password
            </v-btn>

            <v-expand-transition>
              <v-card
                v-if="generatedPassword"
                variant="outlined"
                class="mb-4"
              >
                <v-card-text class="d-flex align-center justify-space-between">
                  <span class="font-weight-medium">Your Password:</span>
                  <span>{{ generatedPassword }}</span>
                  <v-btn
                    icon="mdi-content-copy"
                    size="small"
                    @click="copyToClipboard"
                    :color="copiedToClipboard ? 'success' : 'default'"
                  ></v-btn>
                </v-card-text>
              </v-card>
            </v-expand-transition>

            <v-snackbar
              v-model="copiedToClipboard"
              :timeout="2000"
              color="success"
            >
              Password copied to clipboard!
            </v-snackbar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const passwordLength = ref(12);
const includeUppercase = ref(true);
const includeNumbers = ref(true);
const includeSymbols = ref(true);
const generatedPassword = ref('');
const copiedToClipboard = ref(false);

const generatePassword = () => {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = includeUppercase.value
    ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    : '';
  const numberChars = includeNumbers.value ? '0123456789' : '';
  const symbolChars = includeSymbols.value ? '!@#$%^&*()_+[]{}|;:,.<>?/~`' : '';

  const allChars = lowercaseChars + uppercaseChars + numberChars + symbolChars;

  let password = '';
  for (let i = 0; i < passwordLength.value; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  generatedPassword.value = password;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(generatedPassword.value);
  copiedToClipboard.value = true;
};
</script>

<style scoped>
.password-generator-container {
  margin-top: 50px;
}
</style>
