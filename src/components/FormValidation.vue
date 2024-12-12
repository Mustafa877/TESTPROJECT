<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-title class="text-h5 font-weight-bold text-center py-6">
            Registration Form
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field
                v-model="formData.name"
                :rules="[v => !!v || 'Name is required']"
                label="Name"
                required
                variant="outlined"
                prepend-inner-icon="mdi-account"
              ></v-text-field>

              <v-text-field
                v-model="formData.email"
                :rules="[
                  v => !!v || 'E-mail is required',
                  v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                ]"
                label="E-mail"
                required
                variant="outlined"
                prepend-inner-icon="mdi-email"
              ></v-text-field>

              <v-text-field
                v-model="formData.password"
                :rules="[
                  v => !!v || 'Password is required',
                  v => v.length >= 8 || 'Password must be at least 8 characters'
                ]"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                required
                variant="outlined"
                prepend-inner-icon="mdi-lock"
                @click:append-inner="showPassword = !showPassword"
              ></v-text-field>

              <v-btn
                type="submit"
                block
                color="primary"
                size="large"
                :disabled="!isFormValid"
                class="mt-6"
              >
                Submit
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';

const formData = ref({
  name: '',
  email: '',
  password: '',
});

const showPassword = ref(false);

const isNameValid = computed(() => formData.value.name.trim() !== '');
const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email));
const isPasswordValid = computed(() => formData.value.password.length >= 8);

const isFormValid = computed(() => isNameValid.value && isEmailValid.value && isPasswordValid.value);

const submitForm = () => {
  if (isFormValid.value) {
    // Perform form submission logic here
    console.log('Form submitted!', formData.value);
  } else {
    console.log('Form is invalid. Please check the fields.');
  }
};
</script>

<style scoped>
.v-card {
  max-width: 100%;
}
</style>
