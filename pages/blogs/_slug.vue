<template>
  <div class="blog-editor-container">
    <div class="container">
      <div class="blog-section-user">
        <!-- User informations -->
        <UserTile
          :name="blog.author.name"
          :avatar="blog.author.avatar"
          :date="new Date(blog.createdAt).toLocaleString()"
        />
      </div>
    </div>
    <!-- <div class="blog-content" v-html="parseContent(blog.content)"></div> -->
    <div class="blog-content" v-html="blog.content">
      <display-content :content="blog.content" />
    </div>
  </div>
</template>

<script>
import UserTile from "~/components/shared/UserTile";
import DisplayContent from "~/components/editor/DisplayContent";
import { mapState } from "vuex";

import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
// import 'highlight.js/styles/night-owl.css';
import 'highlight.js/styles/hybrid.css';

export default {
  head() {
    return {
      title: this.blog.title,
      meta: [
        { hid: 'description', name: 'description', content: this.blog.subtitle },
        { hid: 'og:title', name: 'og:title', content: this.blog.title },
        { hid: 'og:description', name: 'og:description', content: this.blog.subtitle },
      ]
    }
  },
  components: {
    UserTile,
    DisplayContent
  },
  computed: {
    ...mapState({
      blog: ({ blog }) => blog.item
    })
  },
  async fetch({ store, params }) {
    const { slug } = params;
    await store.dispatch("blog/fetchBlogBySlug", slug);
  },
  methods: {
    parseContent(content) {
      if(process.client) {
        
        // hljs.registerLanguage("css", css)
        // hljs.registerLanguage("javascript", javascript)

        // var el = document.createElement( 'html' );
        // el.innerHTML = content;

        // Array.from(el.querySelectorAll('pre code')).forEach(pre => {
        //   const code = pre.innerHTML;
        //   const h = hljs.highlightAuto(code);
        //   console.log(h)
        //   pre.parentElement.className = `hljs ${h.language}`
        //   pre.innerHTML = h.value;
        // })
        
        // const parsedContent = el.innerHTML;
        // return parsedContent;
        return content;
      }
    }
  },
  mounted() {

  }
};
</script>

<style lang="scss">
.blog-section-user {
  max-width: 960px;
  margin: 0 auto 40px auto;
}
.blog-content {
  max-width: 960px;
  margin: 10px auto;
  background: white;
  padding: 80px;

  .title {
    color: #363636;
    font-size: 2.3rem;
    font-weight: 700;
    line-height: 1.125;
  }

  // p {
  //   width: 100%;
  //   padding: 5px 0;
  //   margin: 5px 0;
  // }

  // p:last-of-type {
  //   width: 100%;
  //   padding: 5px 0 0 0;
  //   margin: 5px 0 0 0;
  // }

  // pre {
  //   width: 100%;
  //   padding: 15px 15px;
  //   margin: 5px 0;
  //   border-radius: 8px;
  // }

  // pre:last-of-type {
  //   margin: 5px 0 0 0;
  // }
}
</style>