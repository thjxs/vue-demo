<template>
  <div class="col-lg-3 col-md-3 sidebar">
    <div class="card">
      <div class="card-body">
        <router-link to="/new" class="btn btn-success btn-block" aria-label="left align">
          <span class="icon"></span> New Topic
        </router-link>
      </div>
    </div>

    <div class="card">
      <div class="card-body active-users">
        <div class="text-center">Active user</div>
        <ul class="list-unstyled">
          <active-user-list v-for="user in activedUsers.data" :key="user.id" :user="user"/>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ActiveUserList from './ActiveUserList'

export default {
  components: {
    ActiveUserList
  },
  data () {
    return {
      activedUsers: []
    }
  },
  created() {
    this.getActivedUsers()
  },
  methods: {
    async getActivedUsers () {
      try {
        this.activedUsers = await this.$http.get('/actived/users')
      } catch (e) {
        //
      }
    }
  }
}
</script>
