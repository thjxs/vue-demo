<template>
  <div class="container">
    <div class="row">
      <div class="col-md-9 col-lg-9 topic-list">
        <div class="card ">
          <div class="card-header">
            <ul class="nav nav-pills">
              <li role="presentation" class="active"><a href="">Last Reply</a></li>
              <li role="presentation" class=""><a href="">Recent</a></li>
            </ul>
          </div>

          <div class="card-body">
            <ul class="list-unstyled">
              <topic-list v-for="topic in topics.data" :key="topic.id" :topic="topic"/>
            </ul>
          </div>
        </div>
    </div>
      <side-bar/>
    </div>
  </div>
</template>

<script>
import TopicList from '@/components/TopicList'
import SideBar from '@/components/SideBar'
import { mapState } from 'vuex'
export default {
  components: {
    TopicList,
    SideBar
  },
  data () {
    return {
      isFetching: false,
      topics: {
        data: [],
        meta: Object
      }
    }
  },
  computed: mapState({
    currentPage: state => state.topics.currentPage ? state.topics.currentPage : 1
  }),
  created () {
    this.loadTopics()
    window.addEventListener('scroll', () => {
      if (this.shouldLoadTopics()) {
        if (this.isFetching) {
          return
        } else {
          this.isFetching = true
        }
        this.loadTopics(this.currentPage + 1)
      }
    })
  },
  methods: {
    loadTopics (page = this.currentPage) {
      this.$http
        .get(`/topics?include=user,category&page=${page}`)
        .then(response => {
          this.topics.data.push(...response.data)
          this.topics.meta = response.meta
          this.isFetching = false
          this.$store.commit('topics/setCurrentPage', response.meta.pagination.current_page)
        })
    },
    shouldLoadTopics () {
      if (this.currentPage == this.topics.meta.pagination.total_pages) {
        return false
      }
      var max = document.body.scrollHeight - innerHeight
      return (pageYOffset / max) > 0.9 ? true : false
    },
    handlePageChange (page) {
      this.loadTopics(page)
    }
  }
}
</script>
