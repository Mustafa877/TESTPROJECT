<template>
  <v-container class="github-profile-viewer">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-h3 text-center mb-6">GitHub User Profile Viewer</h1>

        <v-text-field
          v-model="username"
          label="Enter GitHub username"
          variant="outlined"
          @input="getUserProfile"
          :loading="loading"
          prepend-inner-icon="mdi-github"
        ></v-text-field>

        <v-fade-transition>
          <v-card v-if="userProfile" class="mt-6" elevation="8">
            <v-card-text>
              <v-row justify="center">
                <v-col cols="12" class="text-center">
                  <v-avatar size="150" class="mb-4">
                    <v-img :src="userProfile.avatar_url" :alt="userProfile.login"></v-img>
                  </v-avatar>
                  <h2 class="text-h4 mb-2">{{ userProfile.name }}</h2>
                  <p class="text-body-1">{{ userProfile.bio }}</p>
                </v-col>
              </v-row>
              <v-divider class="my-4"></v-divider>
              <v-row>
                <v-col cols="6" v-for="(value, key) in profileDetails" :key="key">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon :icon="value.icon" color="primary"></v-icon>
                    </template>
                    <v-list-item-title>{{ value.label }}</v-list-item-title>
                    <v-list-item-subtitle>{{ userProfile[key] }}</v-list-item-subtitle>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-fade-transition>

        <v-fade-transition>
          <v-alert
            v-if="error"
            type="error"
            variant="tonal"
            class="mt-6"
          >
            {{ error }}
          </v-alert>
        </v-fade-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const userProfile = ref(null);
const error = ref(null);
const loading = ref(false);

const profileDetails = {
  followers: { label: 'Followers', icon: 'mdi-account-group' },
  following: { label: 'Following', icon: 'mdi-account-multiple-plus' },
  public_repos: { label: 'Public Repos', icon: 'mdi-source-repository-multiple' },
  location: { label: 'Location', icon: 'mdi-map-marker' },
};

const getUserProfile = async () => {
  if (!username.value) {
    userProfile.value = null;
    error.value = null;
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(`https://api.github.com/users/${username.value}`);
    const data = await response.json();

    if (response.ok) {
      userProfile.value = data;
    } else {
      userProfile.value = null;
      error.value = `Error: ${data.message}`;
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    error.value = 'An error occurred while fetching data.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.github-profile-viewer {
  margin-top: 50px;
}
</style>
