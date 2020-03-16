<template>
  <!-- Finish handling of URL -->
  <div>
    <Header title="Write your blog" exitLink="/instructor/blogs">
      <template v-if="blog.status === 'active'" #actionMenu>
        <div class="full-page-takeover-header-button">
          <Modal
            @opened="checkBlogValidity"
            @submitted="publishBlog"
            openTitle="Publish"
            openBtnClass="button is-success is-medium is-inverted is-outlined"
            title="Review Details"
          >
            <div>
              <div class="title">Once you publish blog you cannot change url to a blog.</div>
              <!-- Check for error -->
              <div v-if="!publishError">
                <div class="subtitle">This is how url to blog post will look like after publish:</div>
                <article class="message is-success">
                  <div class="message-body">
                    <!-- Get here actual slug -->
                    <strong>{{getLocalUrl()}}/blogs/{{slug}}</strong>
                  </div>
                </article>
              </div>
              <article v-else class="message is-danger">
                <div class="message-body">{{publishError}}</div>
              </article>
            </div>
          </Modal>
        </div>
      </template>
      <!-- Blog published -->
      <template v-else #actionMenu>
        <div class="full-page-takeover-header-button">
          <Modal
            @submitted="unpublishBlog"
            openTitle="Unpublish"
            openBtnClass="button is-success is-medium is-inverted is-outlined"
            title="Unpublish Blog"
          >
            <div>
              <div class="title">Unpublish blog so it's no longer displayed in blogs page</div>
            </div>
          </Modal>
        </div>
      </template>
    </Header>
    <div class="blog-editor-container">
      <div class="container">
        <editor
          :blog="blog"
          @editorMounted="initBlockContent"
          @editorUpdated="saveBlog"
          :isSaving="isSaving"
          ref="editor"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Editor from "~/components/editor";
import Header from "~/components/shared/Header";
import Modal from "~/components/shared/Modal";
import { mapState } from "vuex";
import slugify from "slugify";

export default {
  layout: "instructor",
  components: {
    Editor,
    Header,
    Modal
  },
  data() {
    return {
      slug: null,
      publishError: null
    };
  },
  computed: {
    ...mapState({
      blog: ({ instructor }) => instructor.blog.item,
      isSaving: ({ instructor }) => instructor.blog.isSaving
    })
  },
  async fetch({ store, params }) {
    await store.dispatch("instructor/blog/fetchBlogById", params.id);
  },
  methods: {
    initBlockContent(initContent) {
      if (this.blog && this.blog.content) {
        initContent(this.blog.content);
      }
    },
    saveBlog(blogData) {
      this.$store
        .dispatch("instructor/blog/updateBlog", blogData)
        .then(() => {
          this.$toasted.success("Blog has been updated!", {
            duration: 3000,
            action: {
              text: "Close",
              class: "has-text-white",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          });
        })
        .catch(() => {
          this.$toasted.error("Blog cannot be updated!", {
            duration: 3000,
            action: {
              text: "Close",
              class: "has-text-white",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          });
        });
    },
    publishBlog({ closeModal }) {
      const blogContent = this.$refs.editor.getContent();
      blogContent.status = "published";
      return this.$store
        .dispatch("instructor/blog/updateBlog", blogContent)
        .then(() => {
          this.$toasted.success("Blog has been published!", {
            duration: 3000,
            action: {
              text: "Close",
              class: "has-text-white",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          });
          closeModal();
        })
        .catch(() => {
          this.$toasted.error("Blog cannot be published!", {
            duration: 3000,
            action: {
              text: "Close",
              class: "has-text-white",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          });
        });
    },
    unpublishBlog({ closeModal }) {
      const blogContent = this.$refs.editor.getContent();
      blogContent.status = "active";
      return this.$store
        .dispatch("instructor/blog/updateBlog", blogContent)
        .then(() => {
          this.$toasted.success("Blog has been unpublished!", {
            duration: 3000,
            action: {
              text: "Close",
              class: "has-text-white",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          });
          closeModal();
        })
        .catch(() => {
          this.$toasted.error("Blog cannot be unpublished!", {
            duration: 3000,
            action: {
              text: "Close",
              class: "has-text-white",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          });
        });
    },
    checkBlogValidity() {
      this.slug = null;
      this.publishError = null;
      const title = this.$refs.editor.getNodeValueByName("title");
      if (title && title.length > 16) {
        // Crete slug
        this.slug = this._slugify(title);
      } else {
        this.publishError =
          "Cannot publish! Title need to be longer than 16 characters!";
      }
    },
    getLocalUrl() {
      return process.client && window.location.origin;
    },
    _slugify(text) {
      return slugify(text, {
        replacement: "-",
        remove: null,
        lower: true
      });
    }
  }
};
</script>
