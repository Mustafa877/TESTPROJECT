<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-expansion-panels v-model="panel">
            <v-expansion-panel
              v-for="(item, i) in items"
              :key="i"
            >
              <v-expansion-panel-title>
                {{ item.title }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                {{ item.content }}
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const panel = ref(null)

const items = ref([
  {
    title: 'What is HTML?',
    content: 'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It defines the content and structure of web content. It is often assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript.',
  },
  {
    title: 'What is CSS?',
    content: 'Cascading Style Sheets is a style sheet language used for specifying the presentation and styling of a document written in a markup language such as HTML or XML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.',
  },
  {
    title: 'What is JS?',
    content: 'JavaScript, often abbreviated as JS, is a programming language and core technology of the World Wide Web, alongside HTML and CSS. As of 2023, 98.7% of websites use JavaScript on the client side for webpage behavior, often incorporating third-party libraries.',
  },
])
</script>

<style scoped>
.v-expansion-panel-title {
  font-weight: bold;
}
</style>
