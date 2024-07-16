<template>
  <div class="posts-app">
    <h1 class="app-title">Posts from JSONPlaceholder</h1>

    <transition name="fade">
      <div v-if="showNotification" class="notification" role="alert">
        {{ notificationMessage }}
      </div>
    </transition>

    <div class="filter">
      <input type="number" v-model="filterUserId" placeholder="Filter by User ID">
      <button @click="applyFilter">Apply Filter</button>
    </div>

    <div class="search">
      <input type="text" v-model="searchTerm" placeholder="Search by Title or Body">
      <button @click="applySearch">Search</button>
    </div>

    <ul class="posts-list">
      <transition-group name="fade" tag="div">
        <li v-for="post in paginatedPosts" :key="post.id" class="post-item">
          <h2 @click="selectPostForEdit(post)">{{ post.title }}</h2>
          <p>{{ post.body }}</p>
          <div v-if="selectedPost && selectedPost.id === post.id" class="edit-post-form">
            <input v-model="selectedPost.title" placeholder="Edit Title" />
            <textarea v-model="selectedPost.body" placeholder="Edit Body"></textarea>
            <button @click="updatePost">Save Changes</button>
            <button @click="cancelEdit">Cancel</button>
          </div>
          <div v-else class="post-actions">
            <button @click="selectPostForEdit(post)" class="update-button">Update</button>
            <button @click="deletePost(post.id)" class="delete-button">Delete</button>
          </div>
        </li>
      </transition-group>
    </ul>

    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

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
const selectedPost = ref(null);
const filterUserId = ref(null);
const searchTerm = ref("");

const loadPostsFromLocalStorage = () => {
  const savedPosts = localStorage.getItem("posts");
  if (savedPosts) {
    posts.value = JSON.parse(savedPosts);
  }
};

const fetchPosts = async (userId = null) => {
  try {
    let url = "https://jsonplaceholder.typicode.com/posts";
    if (userId) {
      url += `?userId=${userId}`;
    }
    const response = await axios.get(url);
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

const updatePost = async () => {
  if (!selectedPost.value) return;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${selectedPost.value.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: selectedPost.value.id,
        title: selectedPost.value.title,
        body: selectedPost.value.body,
        userId: selectedPost.value.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const updatedPost = await response.json();
    const index = posts.value.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      posts.value[index] = updatedPost;
      savePostsToLocalStorage(); 
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Post ${updatedPost.id} updated successfully.`, 
      });
    }
  } catch (error) {
    showNotification.value = true;
    notificationMessage.value = `Error updating post ${selectedPost.value.id}.`;
    console.error("Error updating post:", error);
    setTimeout(() => {
      showNotification.value = false;
    }, 2000);
  }
};

const totalPages = computed(() => {
  return Math.ceil(posts.value.length / pageSize);
});

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  let filteredPosts = posts.value;
  
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    filteredPosts = filteredPosts.filter(post =>
      post.title.toLowerCase().includes(term) ||
      post.body.toLowerCase().includes(term)
    );
  }
  
  return filteredPosts.slice(start, end);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(() => {
  loadPostsFromLocalStorage(); 
});

const selectPostForEdit = (post) => {
  selectedPost.value = { ...post };
};

const cancelEdit = () => {
  selectedPost.value = null;
};

const applyFilter = () => {
  if (filterUserId.value !== null) {
    fetchPosts(filterUserId.value);
  } else {
    fetchPosts(); // Fetch all posts if no filter is applied
  }
};

const applySearch = () => {
  // Reset pagination to first page when searching
  currentPage.value = 1;
};
</script>

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
  cursor: pointer;
}

.edit-post-form {
  margin-top: 10px;
}

.edit-post-form input,
.edit-post-form textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.post-actions {
  margin-top: 10px;
}

.post-actions button {
  margin-right: 10px;
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.update-button {
  background-color: #4caf80;
  color: #fff;
}

.update-button:hover {
  background-color: #45a168;
}

.delete-button {
  background-color: #e74c3c;
  color: #fff;
}

.delete-button:hover {
  background-color: #c0392b;
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

.notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf80;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.notification.show {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to  {
  opacity: 0;
}

.filter {
  margin-bottom: 20px;
  text-align: center;
}

.filter input {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.filter button {
  padding: 8px 12px;
  font-size: 14px;
  background-color: #4caf80;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter button:hover {
  background-color: #45a168;
}

.search {
  margin-bottom: 20px;
  text-align: center;
}

.search input {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search button {
  padding: 8px 12px;
  font-size: 14px;
  background-color: #4caf80;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search button:hover {
  background-color: #45a168;
}
</style>
