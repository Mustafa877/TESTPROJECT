<script setup>

import { ref, computed } from 'vue'
import Home from './components/HomePage.vue'
import typicode from './components/typicode.vue'
import usePosts from './components/usePosts.vue'

const routes = {
  '/': Home,
  '/typicode': typicode,
  '/usePosts': usePosts,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/']  
})
 
 

  window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const isActive = (path) => {
  return currentPath.value === '#' + path
}
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  
}

</script>

<template>
  <nav class="navbar">
    <div class="menu-icon" @click="toggleMenu">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <ul class="navbar-nav" :class="{ 'active': isMenuOpen }">
      <li :class="{ active: isActive('/') }"><a href="#/" class="nav-item home">Home</a></li>

      <li :class="{ active: isActive('/typicode') }"><a href="#/typicode" class="nav-item typicode">typicode</a></li>
      <li :class="{ active: isActive('/usePosts') }"><a href="#/usePosts" class="nav-item usePosts">CreatPost</a></li>
    </ul>
  </nav>
  <component :is="currentView" />
</template>

 

<style scoped>
.navbar {
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.navbar-nav {
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: center; 
}

.navbar-nav li {
  display: inline-block;
  margin-right: 10px;
}

.navbar-nav li a {
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  color: #fff;  
}

.navbar-nav li a:hover {
  background-color: #555;
}

.home {
  background-color: #007bff;
}

.typicode {
  background-color: #28a745;
}

.usePosts {
  background-color: #ffc107;
}


.active {
  background-color: #ffffff !important;  
}

.active a {
  background-color: #000000;
  color: #ffffff !important;  
}
.menu-icon {
  display: none;
  cursor: pointer;

}

.bar {
  width: 25px;
  height: 3px;
  margin-bottom: 4px;
  background-color: #000000;
  transition: background-color 0.3s ease;
}

.menu-icon:hover .bar {
  background-color: #ccc;
}

.navbar-nav {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.navbar-nav li {
  display: inline-block;
  margin-right: 10px;
}

.navbar-nav li a {
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}

.navbar-nav li a:hover {
  background-color: #555;
}

.active a {
  background-color: #000000e1;
}

.active a:hover {
  background-color: #777;
}

 
@media (max-width: 1690px) {
  .menu-icon {
    display: block;
  }
  
  .navbar-nav {
    display: none;
        position: absolute;
        top: 80px;
        width: 155px;
        background-color: #444;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        z-index: 999;
        height: 70%;
 
  }
  
  .navbar-nav.active {
    display: block;
  }
 
  .navbar-nav li {
    display: block;
    margin: 10px 0;
  }
  
  .navbar-nav li a {
    display: block;
    padding: 10px 0;
    border-bottom: 1px solid #666;
  }
  .home {
  background-color: #007bff;
}

.typicode {
  background-color: #28a745;
}

.usePosts {
  background-color: #ffc107;
}

}
 
</style>
