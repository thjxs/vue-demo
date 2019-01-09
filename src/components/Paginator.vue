<template>
  <nav aria-label="Page">
    <ul class="pagination justify-content-end" v-if="pagination.total">
      <li class="page-item" :class="{active: i == pagination.current_page}" v-for="i in showingPaginationArray()" :key="i">
        <span class="page-link" @click.prevent="$emit('change', i)">{{ i }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "paginator",
  props: {
    pagination: {
      type: Object,
      default() {
        return {
          "total": 0,
          "count": 0,
          "per_page": 0,
          "current_page": 0,
          "total_pages": 0
        }
      }
    }
  },
  methods: {
    showingPaginationArray () {
      if (this.pagination.total_pages <= 5) {
        return Array(this.pagination.total_pages).fill().map((c, idx) => 1 + idx)
      } else if (this.pagination.current_page + 2 > this.pagination.total_pages) {
        return Array(5).fill().map((c, idx) => this.pagination.total_pages - 4 + idx)
      } else if (this.pagination.current_page - 2 <= 0) {
        return Array(5).fill().map((c, idx) => 1 + idx)
      } else {
        return Array(5).fill().map((c, idx) => this.pagination.current_page - 2 + idx)
      }
    }
  }
}
</script>
