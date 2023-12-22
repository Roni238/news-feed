const { createProxyMiddleware } = require('http-proxy-middleware');

export default {
  ssr: true,
  target: 'static',

  server: {
    host: 'localhost',
    port: 80,
  },
  generate: {
    fallback: 'index.html'
  },

  serverMiddleware: [
    createProxyMiddleware('/api/mos', {
        target: 'https://www.mos.ru/rss',
        changeOrigin: true,
        pathRewrite: {
          '^/api/mos': '',
        },
      }),
      createProxyMiddleware('/api/lenta', {
        target: 'https://lenta.ru/rss/news',
        changeOrigin: true,
        pathRewrite: {
          '^/api/lenta': '',
        },
      }),
  ],



  head: {
    title: 'news-feed',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
  ],
}
