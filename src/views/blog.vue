<template>
  <div>
    <p>Hello: {{author}}</p>
    <p>GitHub: <a :href="github">{{github}}</a></p>
    <ul>
      <li v-for="blog in blogList" :key="blog.title">
        <h2>{{blog.title}}</h2>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    asyncData({store}) {
      store.dispatch('getAuthor')
      // 触发 action 后，会返回 Promise
      return store.dispatch('getList')
    },
    data: {
      github: ''
    },
    mounted() {
      const {github} = this.$store.state
      this.github = github
    },
    computed: {
      blogList() {
        return this.$store.state.blogStore.blogList
      },
      author() {
        return this.$store.state.author
      }
    }
  }
</script>