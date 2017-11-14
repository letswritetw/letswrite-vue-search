<template>
  <section class="hero is-info">
    <div class="hero-body">
      <h1 class="title">vue-search-sample</h1>
      <h2 class="subtitle">
        <span>用Vue.js的filter功能，製作的search功能範例。</span>
        <span>Vue.js use Filter to build search function.</span>
      </h2>
      <div class="has-text-right">
        <a class="button is-dark is-pulled-right" href="https://github.com/auguston/vue-search-sample">
          <span class="icon">
            <i class="fa fa-github"></i>
          </span>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </section>  
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style scoped lang="sass">
  .hero
    margin-bottom: 1rem
  .title
    margin-bottom: 1rem
    text-transform: capitalize
  .subtitle
    margin-top: 0 !important
    span
      display: block
      line-height: 2
</style>