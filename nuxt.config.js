
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    // title: process.env.npm_package_name || '',
    title: process.env.npm_package_title || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'og:title', name: 'og:title', content: process.env.npm_package_title || '' },
      { hid: 'og:description', name: 'og:description', content: process.env.npm_package_description || '' },
      { hid: 'og:url', name: 'og:url', content: process.env.BASE_URL || 'localhost:3000' },
      { hid: 'og:locale', name: 'og:locale', content: 'it_EU' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:image', name: 'og:image', content: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Leckerli+One&display=swap' },
    ],
    script: [
      { src: "https://kit.fontawesome.com/532d1551de.js", crossorigin: "anonymous" }
    ],
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'fixedIndexHomePath',
        path: '/index',
        component: resolve(__dirname, 'pages/index.vue')
      })
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#dc5222' },
  /*
  ** Global CSS
  */
  css: [
    "@/assets/scss/main.scss"
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "~/plugins/filters" },
    { src: "~/plugins/vuelidate" },
    { src: "~/plugins/integrations" },
    { src: "~/plugins/components" },
    { src: "~/plugins/tooltip" },
    { src: "~/plugins/toasted", ssr: false },
    { src: "~/plugins/paginate", ssr: false },
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'portal-vue/nuxt'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  serverMiddleware: [
    "~/server/routes/index.js"
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
