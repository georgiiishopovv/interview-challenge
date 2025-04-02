<script lang="ts" setup>
  import { getPosts, Post } from '@/api/api';
  import { onBeforeMount, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import Pagination from '@/components/Pagination.vue'

  const route = useRoute();
  const router = useRouter();
  const posts = ref<Post[]>();
  const currentPage = ref(Number(route.query.page) || 1);
  const totalPages = ref(1);
  const loading = ref(true);
  
  let skip = 0;
  const postsLimit = 5;


  onBeforeMount(() => loadPosts());

  //Load the correct posts based on page calculations
  async function loadPosts() {
    skip = (currentPage.value - 1) * postsLimit;  
    try{
      const response = await getPosts(postsLimit, skip);
      posts.value = response.posts;
      totalPages.value = Math.ceil(response.total / postsLimit);
    }
    catch (error) {
      console.error('Error loading posts:', error);
    }
    finally {
      loading.value = false;
    }
  }

  //Update the current page and refresh the posts
  function refreshOnPageChange(page : number){
    currentPage.value = page;
    router.replace({ query: { page: page } });
    loadPosts();
  }

</script>

<template>
  <h1>Posts list</h1>
  <div v-if="loading" class="loading-class">
    <span>Loading...</span>
  </div>
  <RouterLink
    class="post"
    v-for="(post, index) in posts"
    :to="{ name: 'post', params: { postId: post.id }, query: { page: currentPage } }"
    :key="index"
  >
    <div class="post__id">#{{ post.id }}</div>
    <div class="post__title">{{ post.title }}</div>
    <div>{{ post.body }}</div>
  </RouterLink>
  <Pagination
    v-if="!loading"
    :totalPages="totalPages"
    :currentPage="currentPage"
    @page-changed="refreshOnPageChange"
  />
</template>

<style scoped>
  .post {
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: repeat(2, auto);
    gap: 8px;

    & + & {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #ccc;
    }

    &__id {
      grid-row: -1/1;
    }

    &__title {
      font-weight: 700;
    }
  }
</style>
