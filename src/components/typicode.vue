<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="search" label="Search" @input="updateFilteredPosts"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="filteredPosts"
          :sort-by="['id']"
          class="elevation-1 smaller-table"
        >
          <template v-slot:item.body="{ item }">
            <div v-if="item.body.length > 100">
              {{ item.body.slice(0, 100) + '...' }}
            </div>
            <div v-else>
              {{ item.body }}
            </div>
          </template>

          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Posts</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ props }">
                  <v-btn class="mb-2" color="primary" dark v-bind="props">New Post</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field v-model="editedPost.title" label="Title"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea v-model="editedPost.body" label="Body"></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" variant="text" @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" variant="text" @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="editPost(item)">mdi-pencil</v-icon>
            <v-icon size="small" @click="confirmDelete(item)">mdi-delete</v-icon>
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      dialog: false,
      headers: [
        { title: 'ID', align: 'start', sortable: true, value: 'id' },
        { title: 'Title', value: 'title' },
        { title: 'Body', value: 'body' },
        { title: 'Actions', value: 'actions', sortable: false },
      ],
      posts: [],
      editedIndex: -1,
      editedPost: {
        title: '',
        body: '',
      },
      defaultPost: {
        title: '',
        body: '',
      },
      search: '',
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Post' : 'Edit Post';
    },

    filteredPosts() {
      const query = this.search.trim().toLowerCase();
      if (!query) {
        return this.posts;
      } else {
        return this.posts.filter(post =>
          post.title.toLowerCase().includes(query) ||
          post.body.toLowerCase().includes(query)
        );
      }
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    posts: {
      handler(posts) {
        localStorage.setItem('posts', JSON.stringify(posts));
      },
      deep: true,
    },
  },

  created() {
    const storedPosts = localStorage.getItem('posts');
    this.posts = storedPosts ? JSON.parse(storedPosts) : [];

  },

  methods: {
    fetchPosts() {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
          this.posts = posts;
          localStorage.setItem('posts', JSON.stringify(posts));
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
        });
    },

    editPost(post) {
      this.editedIndex = this.posts.indexOf(post);
      this.editedPost = { ...post };
      this.dialog = true;
    },

    confirmDelete(post) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deletePost(post);
        }
      });
    },

    deletePost(post) {
      const index = this.posts.indexOf(post);
      if (index !== -1) {
        this.posts.splice(index, 1);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your post has been deleted.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });
      }
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.posts[this.editedIndex], this.editedPost);
        Swal.fire({
          title: 'Post Updated!',
          text: 'Your post has been successfully updated.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        this.posts.push(this.editedPost);
        Swal.fire({
          title: 'Post Saved!',
          text: 'Your new post has been successfully saved.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      }
      this.close(); 
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedPost = { ...this.defaultPost };
        this.editedIndex = -1;
      });
    },

    initialize() {
      this.posts = [];
      localStorage.removeItem('posts');
      this.fetchPosts();
    },

    updateFilteredPosts() {

    },
  },
};
</script>

<style scoped>

</style>
