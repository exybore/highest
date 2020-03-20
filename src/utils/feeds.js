import RSSParser from 'rss-parser'

const parser = new RSSParser()
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

function getFeeds(context, list) {
  list.forEach(url => {
    parser.parseURL(CORS_PROXY + url, function (err, feed) {
      feed.page = 1
      context.feeds.push(feed)
      feed.items.forEach(item => context.feedItems.push(item))
      context.feedItems.sort((a,b) => {
        const dateA = new Date(a.pubDate).getTime()
        const dateB = new Date(b.pubDate).getTime()
        return (dateA > dateB) ? -1 : ((dateB > dateA) ? 1 : 0)
      })
    })
  })
}

export { getFeeds }
