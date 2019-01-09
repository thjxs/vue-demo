<template>
  <li class="media my-2">
    <router-link :to="{name: 'users', params: {id: topic.user_id}}" class="mr-3">
      <img :src="topic.user.avatar" class="media-object img-thumbnail" style="width: 52px; height: 52px;">
    </router-link>

    <div class="media-body">
      <router-link :to="{name: 'topics', params: {id: topic.id}}" class="media-heading" tag="div">
        <a :title="topic.title">{{ topic.title}}</a>
        <span class="badge badge-info">{{ topic.reply_count }}</span>
      </router-link>

      <div class="media-body meta">
        <router-link to="/" :title="topic.category.name">
          <span class="icon"></span>
          {{ topic.category.name }}
        </router-link>
        <router-link :to="{name: 'users', params: {id: topic.user.id}}" :title="topic.user.name">
          <span class="icon"></span>
          {{ topic.user.name }}
        </router-link>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TopicList',
  props: {
    topic: Object
  }
}
</script>
