<template>
  <div class="container-fluid ">
    <h4 class="text-center text-uppercase">Settings</h4> 
    <div class="row justify-content-center">
        <router-link exact class="btn btn-primary text-uppercase m-1" to="/settings/categories"><strong>Categories</strong></router-link>
        <router-link exact class="btn btn-warning text-uppercase m-1" to="/settings/posts"><strong>Posts</strong></router-link>
        <router-link exact class="btn btn-info text-uppercase m-1" to="/settings/media"><strong>Media</strong></router-link>
    </div>
    <transition name="page1" mode="out-in">
    <router-view/>
    </transition>
  </div>
</template>
<script>
export default {
  
}
</script>