<template>
  <div class="media my-4">
    <div class="avatar mr-3">
      <router-link :to="{ name: 'users', params: { id: reply.user_id }}">
        <img :src="reply.user.avatar" :alt="reply.user.name" style="width: 48px;height: 48px;" class="media-project img-thumbnail">
      </router-link>
    </div>

    <div class="infos media-body">
      <div class="media-heading">
        <router-link :to="{name: 'users', params: {id: reply.user_id}}" :title="reply.user.name">
          {{ reply.user.name }}
        </router-link>
        <span>&nbsp;-&nbsp;</span>
        <span class="meta">{{ reply.created_at | diffForHumans }}</span>

        <!-- delete button -->
        <span class="meta pull-right" v-if="this.currentUserId == reply.user_id">
          <button class="btn btn-default-btn-xs pull-left">
            <i></i>
          </button>
        </span>
      </div>
      <div class="reply-content" v-html="reply.content"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ReplyList',
  props: {
    reply: Object
  },
  computed: {
    ...mapGetters({
      currentUserId: 'auth/currentUserId'
    })
  }
}
</script>
