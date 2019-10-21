const vueSearch = new Vue({
  el: '#app',
  data: {
    loading: true, // loading true/false
    loadingStyle: false, // loading style true/false
    // RSS提供者資訊
    provider: {
      title: '',
      url: ''
    },
    // 新聞列表
    news: [],
    // 搜尋
    searchWords: ''
  },
  created() {
    // 法一：直接用rss2json的服務
    // fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcn.nytimes.com%2Frss%2Fzh-hant%2F')
    //   .then(res => res.json())
    //   .then(nynews => {
    //     this.provider.title = nynews.feed.title;
    //     this.provider.url = nynews.feed.link;
    //     this.news = nynews.items;
    //   })

    // 法二：參考xml to json的方式，自己用一個Google Apps Script的API
    var data = { url: 'https://cn.nytimes.com/rss/zh-hant/' };
    fetch('https://script.google.com/macros/s/AKfycbyZELr20Hk_MJMAPhnVMRI8_tlFcTPuvwFxdY_yi18sXNDvFw8/exec', {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(nynews => {
        const data = nynews.rss.channel;
        this.provider.title = data.title.Text;
        this.provider.url = data.link[0].Text;
        Array.prototype.forEach.call(data.item, d => {
          let item = {
            title: d.title.Text,
            url: d.link.Text,
            pubDate: new Date(d.pubDate.Text).toLocaleString('zh-TW')
          };
          this.news.push(item);
        });
        this.loadingStyle = true;
        setTimeout(() => {
          this.loading = false;
        }, 400);
      })
  },
  computed: {
    filterSearch() {
      return this.news.filter(searchResult => searchResult.title.match(this.searchWords));
    }
  }
})