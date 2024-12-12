<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="quote-generator" elevation="8">
          <v-card-title class="text-h4 font-weight-bold text-center mb-6 app-title">
            Inspirational Quotes
          </v-card-title>

          <v-card-text>
            <v-fade-transition>
              <div v-if="!isLoading && !error" class="quote-container text-center">
                <p class="text-h5 font-italic mb-4 quote-text">{{ currentQuote.text }}</p>
                <p class="text-subtitle-1 quote-author">— {{ currentQuote.author || 'Unknown' }}</p>
              </div>
            </v-fade-transition>

            <v-fade-transition>
              <div v-if="isLoading" class="text-center">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  size="64"
                ></v-progress-circular>
                <p class="mt-4">Loading...</p>
              </div>
            </v-fade-transition>

            <v-fade-transition>
              <v-alert
                v-if="error"
                type="error"
                class="mt-4"
              >
                {{ error }}
              </v-alert>
            </v-fade-transition>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn
              @click="fetchRandomQuote"
              :loading="isLoading"
              color="primary"
              size="large"
              class="quote-button"
            >
              {{ isLoading ? 'Loading...' : 'Inspire Me' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentQuote = ref({ text: '', author: '' });
const isLoading = ref(false);
const error = ref(null);

const getRandomQuote = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await fetch('https://type.fit/api/quotes');
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.length);
    currentQuote.value = data[randomIndex];
  } catch (error) {
    console.error('Error fetching quotes:', error);
    error.value = 'Failed to fetch a quote. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

const fetchRandomQuote = async () => {
  await getRandomQuote();
};

onMounted(() => {
  fetchRandomQuote(); // Load a quote initially
});
</script>

<style scoped>
.quote-generator {
  background: linear-gradient(to bottom right, #f8f8f8, #e8e8e8);
}

.app-title {
  font-family: 'Pacifico', cursive;
  color: #4caf50 !important;
}

.quote-text {
  font-family: 'Kaushan Script', cursive;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: color 0.3s, transform 0.3s;
}

.quote-text:hover,
.quote-author:hover {
  color: #af4c4c;
  transform: scale(1.05);
}

.quote-author {
  font-family: 'Montserrat', sans-serif;
  color: #555;
  transition: color 0.3s, transform 0.3s;
}

.quote-button {
  text-transform: none;
  font-family: 'Montserrat', sans-serif;
}
</style>
