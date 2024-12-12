<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <div class="d-flex justify-center" style="margin-top: 200px;">
        <v-btn
          v-bind="activatorProps"
          color="primary"
          text
          elevation="10"
          class="my-6"
          large
          dark
        >
          <v-icon left>mdi-palette</v-icon> Create Something Amazing
        </v-btn>
      </div>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card class="creative-dialog">
        <v-card-title class="headline font-weight-medium">
          Let Your Imagination Flow
        </v-card-title>
        <v-card-text>
          Imagine a world where colors dance and ideas come to life... Let's
          explore the endless possibilities together!
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="isActive.value = false">
            Explore
          </v-btn>
          <v-btn color="secondary" text @click="isActive.value = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: 'CreativeDialog',
};
</script>

<style scoped>

.creative-dialog {
  background-color: #f9f9f9;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  padding: 24px;
  text-align: center;
}

.headline {
  color: #673ab7;  
}
</style>
