<template>
  <router-link :to="{ name: 'users', params: { id: user.id }}" class="my-2" tag="li">
    <a>
      <img :src="user.avatar" width="32px" height="32px" class="rounded-circle mr-3">
      <span>{{ user.name }}</span>
    </a>
  </router-link>
</template>

<script>
export default {
  name: 'ActiveUserList',
  props: {
    user: Object
  }
}
</script>
