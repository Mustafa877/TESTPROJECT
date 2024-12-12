<script setup>
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const searchQuery = ref('')
const searchResults = ref([])
const isLoading = ref(false)
const error = ref(null)
const currentPage = ref(1)
const totalPages = ref(0)

const isDarkTheme = computed({
  get: () => theme.global.current.value.dark,
  set: (value) => theme.global.name.value = value ? 'dark' : 'light'
})

const searchWikipedia = async (query, page) => {
  const encodedQuery = encodeURIComponent(query)
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${encodedQuery}&sroffset=${(page - 1) * 10}`

  try {
    isLoading.value = true
    const response = await fetch(endpoint)
    const data = await response.json()

    if (data.query && data.query.search) {
      searchResults.value = data.query.search
      error.value = null
      totalPages.value = Math.ceil(data.query.searchinfo.totalhits / 10)
    } else {
      searchResults.value = []
      error.value = 'No results found.'
    }
  } catch (err) {
    console.error('Error fetching data:', err)
    searchResults.value = []
    error.value = 'An error occurred while fetching data.'
  } finally {
    isLoading.value = false
  }
}

const submitSearch = () => {
  if (searchQuery.value.trim() !== '') {
    currentPage.value = 1
    searchWikipedia(searchQuery.value, currentPage.value)
  } else {
    searchResults.value = []
    error.value = 'Please enter a valid search term.'
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    searchWikipedia(searchQuery.value, currentPage.value)
  }
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card class="mx-auto" max-width="800" elevation="8">
          <v-card-title class="text-h4 font-weight-bold d-flex justify-space-between align-center py-4">
            Search Wikipedia
            <v-switch
              v-model="isDarkTheme"
              :label="isDarkTheme ? 'Dark Mode' : 'Light Mode'"
              hide-details
              inset
            ></v-switch>
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="submitSearch">
              <v-text-field
                v-model.trim="searchQuery"
                label="Search Wikipedia..."
                append-inner-icon="mdi-magnify"
                @click:append-inner="submitSearch"
                variant="outlined"
                hide-details
              ></v-text-field>
            </v-form>

            <v-progress-circular
              v-if="isLoading"
              indeterminate
              color="primary"
              class="mt-4"
            ></v-progress-circular>

            <v-alert
              v-if="error"
              type="error"
              class="mt-4"
            >
              {{ error }}
            </v-alert>

            <v-list v-if="searchResults.length" class="mt-4">
              <v-list-item
                v-for="result in searchResults"
                :key="result.pageid"
                :href="`https://en.wikipedia.org/?curid=${result.pageid}`"
                target="_blank"
                rel="noopener"
              >
                <v-list-item-title class="text-h6">{{ result.title }}</v-list-item-title>
                <v-list-item-subtitle v-html="result.snippet"></v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <v-pagination
              v-if="totalPages > 1"
              v-model="currentPage"
              :length="totalPages"
              @update:modelValue="goToPage"
              class="mt-4"
            ></v-pagination>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-list-item-subtitle ::v-deep(.searchmatch) {
  font-weight: bold;
  color: #1976d2;
}
</style>
