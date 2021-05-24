
function generateSitemapRoutes () {
  let posts = []

  return async () => {
    const routes = []
    const { $content } = require('@nuxt/content')

    if (posts === null || posts.length === 0) {
      posts = await $content('articles').fetch()
    }

    for (const post of posts) {
      routes.push(`blog/articles/${post.slug}`)
    }

    return routes
  }
}

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  // mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'google-site-verification', content: 'cyHuA_yq1UFxmS55rNWBBdJFFwXJtDcrDhi0P9u3LB8' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/composition-api.js',
    '~/plugins/update.client.js'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/google-analytics'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios', // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/pwa',
    '@nuxt/content', // Doc: https://github.com/nuxt/content
    '@nuxtjs/sitemap',
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-7758221888679599'
    }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Pwa module configuration
  ** See https://pwa.nuxtjs.org/options
  */
  pwa: {
    icon: {
      fileName: 'icon.png'
    },
    menifest: {
      name: 'eggplantiny',
      short_name: 'eggplantiny',
      theme_color: '#312e81',
      background_color: '#312e81',
      display: 'standalone',
      start_url: './',
      lang: 'kr'
    }
  },
  /*
  ** Content module configuration
  ** See https://content.nuxtjs.org/configuration
  */
  content: {
    liveEdit: false
  },
  /*
  ** Google Analytics configuration
  ** See https://google-analytics.nuxtjs.org/
  */
  googleAnalytics: {
    id: 'UA-153118663-1'
  },
  /*
  ** Sitemap configuration
  ** See https://sitemap.nuxtjs.org/
  */
  sitemap: {
    hostname: 'https://eggplantiny.github.io',
    gzip: true,
    exclude: [
      '/secret',
      '/admin/**'
    ],
    routes: generateSitemapRoutes()
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  /*
  ** Compiler option configuration
  */
  compilerOptions: {
    types: [
      '@nuxt/types',
      '@nuxt/content'
    ]
  },
  generate: {
    interval: 2000
  }
}
