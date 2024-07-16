<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const posts = ref([]);
const newPostTitle = ref("");
const newPostBody = ref("");
const currentPage = ref(1);
const pageSize = 10;
const showNotification = ref(false);
const notificationMessage = ref("");

const loadPostsFromLocalStorage = () => {
  const savedPosts = localStorage.getItem("posts");
  if (savedPosts) {
    posts.value = JSON.parse(savedPosts);
  }
};

const fetchPosts = async () => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    posts.value = response.data;
  
    savePostsToLocalStorage();
  } catch (error) {
    showNotification.value = true;
    notificationMessage.value = "Error fetching posts.";
    console.error("Error fetching posts:", error);
    setTimeout(() => {
      showNotification.value = false;
    }, 2000);
  }
};

const savePostsToLocalStorage = () => {
  localStorage.setItem("posts", JSON.stringify(posts.value));
};

const createPost = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: newPostTitle.value,
        body: newPostBody.value,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    posts.value.push(data);
    savePostsToLocalStorage();
    showNotification.value = true;
    notificationMessage.value = "Post created successfully.";
    newPostTitle.value = "";
    newPostBody.value = "";
    setTimeout(() => {
      showNotification.value = false;
    }, 2000);
  } catch (error) {
    showNotification.value = true;
    notificationMessage.value = "Error creating post.";
    console.error("Error creating post:", error);
    setTimeout(() => {
      showNotification.value = false;
    }, 2000);
  }
};

const deletePost = async (postId) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });

  if (result.isConfirmed) {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
      });
      posts.value = posts.value.filter(post => post.id !== postId);
      savePostsToLocalStorage(); 
      showNotification.value = true;
      notificationMessage.value = `Post ${postId} deleted successfully.`;
      setTimeout(() => {
        showNotification.value = false;
      }, 2000);
    } catch (error) {
      showNotification.value = true;
      notificationMessage.value = `Error deleting post ${postId}.`;
      console.error("Error deleting post:", error);
      setTimeout(() => {
        showNotification.value = false;
      }, 2000);
    }
  }
};

const totalPages = computed(() => {
  return Math.ceil(posts.value.length / pageSize);
});

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return posts.value.slice(start, end);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(() => {
  loadPostsFromLocalStorage(); 
});
</script>

<template>
  <div class="posts-app">
    <h1 class="app-title">Posts from JSONPlaceholder</h1>

    <transition name="fade">
      <div v-if="showNotification" class="notification" role="alert">
        {{ notificationMessage }}
      </div>
    </transition>

    <div class="new-post-form">
      <h2>Create a New Post</h2>
      <input v-model="newPostTitle" placeholder="Title" />
      <textarea v-model="newPostBody" placeholder="Body"></textarea>
      <button @click="createPost">Create Post</button>
    </div>

     

   
  </div>
</template>

<style scoped>
.posts-app {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.app-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.new-post-form {
  margin-bottom: 20px;
}

.new-post-form input,
.new-post-form textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.new-post-form button {
  padding: 8px 12px;
  font-size: 14px;
  background-color: #4caf80;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.new-post-form button:hover {
  background-color: #45a168;
}

.posts-list {
  list-style: none;
  padding: 0;
}

.post-item {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
}

.post-item:hover {
  background-color: #f0f0f0;
}

.notification {
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.notification {
  background-color: #4caf50;
  color: #fff;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

button {
  padding: 8px 12px;
  margin: 0 5px;
  font-size: 14px;
  background-color: #4caf80;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

button:not(:disabled):hover {
  background-color: #45a168;
}

.delete-button {
  padding: 6px 12px;
  font-size: 14px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #c0392b;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
