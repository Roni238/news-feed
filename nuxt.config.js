const { createProxyMiddleware } = require('http-proxy-middleware');

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  server: {
    host: 'localhost',
    port: 80,
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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
