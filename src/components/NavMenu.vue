<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <router-link class="navbar-brand" to="/">BBS</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link to="/" class="nav-item active" tag="li">
          <a class="nav-link">Topic <span class="sr-only">(current)</span></a>
        </router-link>
        <router-link to="/" class="nav-item" tag="li">
          <a class="nav-link">Share</a>
        </router-link>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>
      <form
        @submit.prevent="TopicsSearch"
        class="form-inline my-2 my-lg-0"
      >
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="query">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      <ul class="nav navbar-nav">
        <template v-if="! authenticated">
          <router-link
            :to="{ name: 'login' }"
            tag="li"
            class="nav-item"
          >
            <a class="nav-link">Login</a>
          </router-link>
          <router-link
            :to="{ name: 'register' }"
            tag="li"
            class="nav-item"
          >
            <a class="nav-link">Register</a>
          </router-link>
        </template>
        <template v-else>
          <router-link :to="{ name: 'me' }" tag="li" class="nav-item"><a class="nav-link">Center</a></router-link>
          <li class="nav-item"><span style="cursor: pointer;" @click.prevent="logoutUser">Logout</span></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated'
    })
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    logoutUser () {
      this.$store.dispatch('auth/logout')
    },
    TopicsSearch () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const { href } = this.$router.resolve({
            name: 'search',
            query: {
              query: this.query
            }
          })
          window.open(href, '_blank')
        }
      })
    }
  }
}
</script>
