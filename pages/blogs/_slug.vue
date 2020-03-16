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
    <!-- <div class="blog-content" v-html="blog.content"></div> -->
    <div class="blog-content" v-html="blog.content">
      <display-content :content="blog.content" />
    </div>
  </div>
</template>

<script>
import UserTile from "~/components/shared/UserTile";
import DisplayContent from "~/components/editor/DisplayContent";
import { mapState } from "vuex";

export default {
  components: {
    UserTile
  },
  computed: {
    ...mapState({
      blog: ({ blog }) => blog.item
    })
  },
  async fetch({ store, params }) {
    const { slug } = params;
    await store.dispatch("blog/fetchBlogBySlug", slug);
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

  p {
    width: 100%;
    padding: 5px 0;
    margin: 5px 0;
  }

  p:last-of-type {
    width: 100%;
    padding: 5px 0 0 0;
    margin: 5px 0 0 0;
  }

  pre {
    width: 100%;
    padding: 15px 15px;
    margin: 5px 0;
    border-radius: 8px;
  }

  pre:last-of-type {
    margin: 5px 0 0 0;
  }
}
</style>