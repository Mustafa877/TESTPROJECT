<template>
  <v-app>
    <v-main>
      <v-container class="mt-5">
        <v-card class="mx-auto" max-width="500">
          <v-card-title class="text-h4 font-weight-bold text-center py-4">
            Vue To-Do List
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="addTask">
              <v-text-field
                v-model="newTask"
                label="Add a new task"
                append-icon="mdi-plus"
                @click:append="addTask"
                variant="outlined"
                hide-details
              ></v-text-field>
            </v-form>

            <v-list v-if="tasks.length > 0" class="mt-4">
              <v-slide-y-transition group>
                <v-list-item
                  v-for="(task, index) in tasks"
                  :key="index"
                  :value="task"
                  rounded="lg"
                  class="mb-2"
                >
                  <template v-slot:prepend>
                    <v-checkbox-btn v-model="task.completed" color="primary"></v-checkbox-btn>
                  </template>
                  <v-list-item-title :class="{ 'text-decoration-line-through': task.completed }">
                    {{ task.text }}
                  </v-list-item-title>
                  <template v-slot:append>
                    <v-btn
                      icon="mdi-delete"
                      variant="text"
                      color="error"
                      @click="removeTask(index)"
                    ></v-btn>
                  </template>
                </v-list-item>
              </v-slide-y-transition>
            </v-list>

            <v-alert
              v-else
              type="info"
              text="No tasks yet. Add a task to get started!"
              class="mt-4"
            ></v-alert>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>

    <v-snackbar
      v-model="showNotification"
      :color="notificationColor"
      :timeout="2000"
    >
      {{ notificationMessage }}
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const newTask = ref('');
const tasks = ref([]);
const showNotification = ref(false);
const notificationMessage = ref('');
const notificationColor = ref('');

const addTask = () => {
  if (newTask.value.trim() !== '') {
    tasks.value.push({ text: newTask.value.trim(), completed: false });
    newTask.value = '';
    saveTasks();
    showNotification.value = true;
    notificationMessage.value = 'Task added successfully.';
    notificationColor.value = 'success';
  } else {
    showNotification.value = true;
    notificationMessage.value = 'Please enter a task.';
    notificationColor.value = 'warning';
  }
};

const removeTask = (index) => {
  const removedTask = tasks.value[index];
  tasks.value.splice(index, 1);
  saveTasks();
  showNotification.value = true;
  notificationMessage.value = `"${removedTask.text}" removed successfully.`;
  notificationColor.value = 'info';
};

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
};

const loadTasks = () => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
  }
};

onMounted(() => {
  loadTasks();
});

watch(tasks, () => {
  saveTasks();
}, { deep: true });
</script>

<style scoped>
.v-list-item__prepend {
  align-items: flex-start;
}
</style>
