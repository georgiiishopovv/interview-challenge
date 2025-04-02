<script lang="ts" setup>
  import { getPost, Post } from '@/api/api';
  import { computed, onBeforeMount, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();
  const postId = computed(() => +route.params.postId as Post['id']);
  const post = ref<Post>();

  //Extract the page from the route component
  const previousPage = computed(() => route.query.page || 1);

  onBeforeMount(() => loadPost());

  async function loadPost() {
    post.value = await getPost(postId.value);
  }

  //Ensures that we go back to the same page
  function goBack() {
    router.push({ path: '/page', query: { page: previousPage.value } });
  }
</script>

<template>
  <h1>Post {{ postId }}</h1>
  <button class="back" @click="goBack" >Back</button>
  <template v-if="post">
    <h3>{{ post.title }}</h3>
    <div>{{ post.body }}</div>
  </template>
</template>

<style scoped>
  .back {
    color: #46f;
  }

  button{
    background-color: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
    padding: 0;
    font-size: 1rem;
  }
</style>
