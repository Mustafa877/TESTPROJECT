<template>
  <v-container class="dad-jokes-container">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="dad-jokes-card" elevation="8">
          <v-card-title class="text-h4 font-weight-bold text-center mb-6">
            Dad Jokes
          </v-card-title>

          <v-card-text class="text-center">
            <v-btn
              @click="fetchJoke"
              :loading="loading"
              :disabled="loading"
              color="success"
              size="x-large"
              rounded="pill"
              class="get-joke-button"
            >
              {{ loading ? 'Loading...' : 'Get Dad Joke' }}
            </v-btn>

            <v-expand-transition>
              <v-card
                v-if="joke"
                :key="joke"
                class="dad-joke mt-6"
                elevation="4"
                rounded="lg"
              >
                <v-card-text class="text-body-1">
                  {{ joke }}
                </v-card-text>
              </v-card>
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const joke = ref(null);
const loading = ref(false);

const fetchJoke = async () => {
  loading.value = true;
  try {
    const response = await axios.get('https://icanhazdadjoke.com/', {
      headers: { Accept: 'application/json' },
    });
    joke.value = response.data.joke;
  } catch (error) {
    console.error('Error fetching dad joke:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.dad-jokes-container {
  margin-top: 50px;
}

.dad-jokes-card {
  background: linear-gradient(to bottom, #ffffff 0%, #f8f8f8 100%);
}

.get-joke-button {
  text-transform: none;
}

.dad-joke {
  transition: box-shadow 0.3s;
}

.dad-joke:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
}

:deep(.v-expand-transition) {
  transition-duration: 0.5s;
}
</style>
