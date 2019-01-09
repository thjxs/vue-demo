<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 topic-content">
        <div class="card">
          <div class="card-header">
            <h3 v-html="topic.title"></h3>
          </div>
          <div class="card-body">
            <div class="media">
              <router-link
                :to="{name: 'users', params: {id: topic.user_id}}"
                tag="div"
                class="mr-3"
              >
              <a><img :src="topic.user.avatar" class="rounded-circle" width="36px" height="36px"></a>
              </router-link>
              <div class="media-body">
                <h5 v-html="topic.user.name"></h5>
                <div class="topic-body" v-html="topic.body"></div>
                <div class="topic-info">
                  <ul class="list-unstyled my-3">
                    <li class="list-item mr-3">
                      <div>Created</div>
                      <div>
                        <img :src="topic.user.avatar" class="rounded-circle mr-1" height="20px" width="20px"><span>{{ topic.created_at | diffForHumans }}</span>
                      </div>
                    </li>
                    <li class="list-item mr-3">
                      <div>Last Reply</div>
                      <div>
                        <img :src="topic.user.avatar" class="rounded-circle mr-1" height="20px" width="20px"><span>{{ topic.created_at | diffForHumans }}</span>
                      </div>
                    </li>
                    <li class="list-item mr-3 text-center">
                      <span>{{ topic.reply_count }}</span>
                      <div>Replies</div>
                    </li>
                    <li class="list-item mr-3 text-center">
                      <span>{{ topic.view_count }}</span>
                      <div>Views</div>
                    </li>
                  </ul>
                </div>
              </div>
              <span :title="topic.created_at">{{ topic.created_at | diffForHumans }}</span>
            </div>
          </div>
        </div>

        <div class="card topic-reply">
          <div class="card-body">
            <reply-list v-for="reply in replies.data" :key="reply.id" :reply="reply"/>
            <paginator :pagination="replies.meta.pagination" @change="handlePageChange"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReplyList from '@/components/ReplyList'
import Paginator from '@/components/Paginator'
export default {
  components: {
    ReplyList,
    Paginator
  },
  data () {
    return {
      topic: {
        user_id: 0,
        user: {}
      },
      replies: {
        data: [],
        meta: {}
      }
    }
  },
  methods: {
    loadTopic () {
      this.$http
        .get(`/topics/${this.$route.params.id}?include=user.roles,category`)
        .then(response => {
          this.topic = response
        })
    },
    loadReplies (page = 1) {
      this.$http
        .get(`/topics/${this.$route.params.id}/replies?include=user&page=${page}`)
        .then(response => {
          this.replies = response
        })
        .catch()
    },
    handlePageChange (page) {
      this.loadReplies(page)
    },
    deleteMyReply (replyId) {
      this.$http
        .delete(`/topics/${this.$route.params.id}/replies/${replyId}`)
        .then(() => this.loadReplies())
    }
  },
  created () {
    this.loadTopic()
    this.loadReplies()
  },
}
</script>

<style>
  .topic-info > ul {
    display: flex;
  }
</style>
