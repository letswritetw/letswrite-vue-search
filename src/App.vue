<template>
  <section class="container">
    <app-header></app-header>

    <div class="news-list">
      <nav class="panel">
        <p class="panel-heading">搜尋功能示範</p>
        <div class="panel-block">
          <p class="control has-icons-left">
            <input class="input" type="text" placeholder="請輸入要搜尋的字詞" v-model="searchWords">
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
          </p>
        </div>
        <a class="panel-block" v-for="n in filterSearch" :href="n.guid" target="_blank">
          <span v-if="width >= 480" class="panel-icon">
            <i class="fa fa-newspaper-o"></i>
          </span>
          <div class="line">
            <span>{{ n.title }}</span>
            <h5 v-if="width >= 480">{{ n.pubDate }}</h5>
          </div>
        </a>
        <h6>
          來源：
          <a :href="provider.url" target="_blank">{{ provider.title }}</a>
        </h6>
      </nav>
    </div>
  </section>
</template>

<script>
import Header from './assets/components/Header.vue'
import Axios from '/usr/local/lib/node_modules/axios/dist/axios.min.js'

export default {
  components: {
    'app-header': Header
  },
  data () {
    return {
      provider: {
        title: '',
        url: ''
      },
      news: [],
      searchWords: '',
      width: window.screen.width
    }
  },
  created() {
    const self = this;
    Axios.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcn.nytimes.com%2Frss%2Fzh-hant%2F').then(nynews => {
      self.provider.title = nynews.data.feed.title;
      self.provider.url = nynews.data.feed.link;
      self.news = nynews.data.items;
    });
    console.log(this.width);
  },
  computed: {
    filterSearch() {
      return this.news.filter(searchResult => searchResult.title.match(this.searchWords));
    }
  }
}
</script>

<style scoped lang="sass">
  .container
    padding: 12px
    max-width: 800px
  img
    max-width: 100%
  .line
    display: flex
    justify-content: space-between
    align-items: center
    width: 100%
  h5
    font-size: 12px
    color: #7A7A7A
  h6
    margin: 6px 0
    font-size: 12px
</style>