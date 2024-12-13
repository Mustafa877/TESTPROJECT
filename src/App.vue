<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
  <v-app>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>portfolio</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
      <v-list>
        <v-list-item @click="$router.push('/')">Home</v-list-item>
        <v-list-item @click="$router.push('/Typicode')">Posts</v-list-item>
        <v-list-item @click="$router.push('/AccordionComponent/')">AccordionComponent</v-list-item>
        <v-list-item @click="$router.push('/AmazingCalculator/')">AmazingCalculator</v-list-item>
        <v-list-item @click="$router.push('/DadJokes/')">DadJokes</v-list-item>
        <v-list-item @click="$router.push('/FormValidation/')">FormValidation</v-list-item>
        <v-list-item @click="$router.push('/GithubUsersSearch/')">GithubUsersSearch</v-list-item>
        <v-list-item @click="$router.push('/PasswordGenerator/')">PasswordGenerator</v-list-item>
        <v-list-item @click="$router.push('/ProgressSteps/')">ProgressSteps</v-list-item>
        <v-list-item @click="$router.push('/RandomQuoteGenerator/')">RandomQuoteGenerator</v-list-item>
        <v-list-item @click="$router.push('/TodoList/')">TodoList</v-list-item>
        <v-list-item @click="$router.push('/WikiComponent/')">WikiComponent</v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(false);
</script>

<style>
.swal2-actions {
    color: white!important;
}
</style>
