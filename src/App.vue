<template>
  <v-app>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Test Project</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
      <v-list>
        <v-list-item @click="$router.push('/Home')">Home</v-list-item>
        <v-list-item @click="$router.push('/')">Typicode</v-list-item>
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
