<template>
  <div>
    <Header title="Manage your Blogs" exitLink="/instructor" />
    <div class="instructor-blogs">
      <div class="container">
        <div class="section">
          <div class="header-block">
            <h2>Your Stories</h2>
            <div class="title-menu">
              <button
                @click="() => $router.push('/instructor/blog/editor')"
                class="button"
              >Write a story</button>
            </div>
          </div>
          <div class="tabs">
            <ul>
              <li>
                <a :class="currentActiveClass('drafts')" @click.prevent="switchBlogs(0)">Drafts</a>
              </li>
              <li>
                <a
                  :class="currentActiveClass('published')"
                  @click.prevent="switchBlogs(1)"
                >Published</a>
              </li>
            </ul>
          </div>
          <div class="blogs-container">
            <template>
              <div v-if="blogs[getActiveBlogsType()].length > 0">
                <div
                  v-for="blog in blogs[getActiveBlogsType()]"
                  :key="blog._id"
                  :id="`element${blog._id}`"
                  class="blog-card"
                  :class="blog.featured ? 'featured' : ''"
                >
                  <h2>
                    <nuxt-link :to="`/instructor/blog/${blog._id}/edit`">{{blog.title}}</nuxt-link>
                  </h2>
                  <div class="blog-card-footer">
                    <Dropdown
                      :items="activeOptions(blog.featured)"
                      :id="blog._id"
                      :featured="blog.featured"
                      @optionChanged="optionChanged"
                    />
                    <span>Created on {{new Date(blog.createdAt).toLocaleString()}}</span> -
                    <span>Last Edited {{new Date(blog.updatedAt).toLocaleString()}}</span>
                  </div>
                </div>
              </div>
              <!-- In case of no drafts blogs  -->
              <div v-else class="blog-error">No {{getActiveBlogsType()}} blogs :(</div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "~/components/shared/Header";
import Dropdown from "~/components/shared/Dropdown";
import { draftedOptions, publishedOptions } from "~/pages/instructor/options";
import { mapState } from "vuex";

export default {
  layout: "instructor",
  components: {
    Header,
    Dropdown
  },
  data() {
    return {
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      blogsTypes: ["drafts", "published"],
      activeBlog: 0
    };
  },
  computed: {
    ...mapState({
      blogs: ({ instructor }) => instructor.blog.items
    }),
    _draftedOptions() {
      return draftedOptions();
    }
  },
  async fetch({ store }) {
    await store.dispatch("instructor/blog/fetchInstructorBlogs");
  },
  methods: {
     _publishedOptions(isFeatured) {
      return publishedOptions(isFeatured);
    },
    activeOptionsTypes(isFeatured) {
      return [this._draftedOptions, this._publishedOptions(isFeatured)];
    },
    getMonth(date) {
      return this.monthNames[new Date(date).getMonth()];
    },
    getDay(date) {
      return new Date(date).getDate();
    },
    getYear(date) {
      return new Date(date).getFullYear();
    },
    switchBlogs(type) {
      this.activeBlog = type;
    },
    getActiveBlogsType() {
      return this.blogsTypes[this.activeBlog];
    },
    currentActiveClass(tab) {
      return this.getActiveBlogsType() === tab ? "is-active" : "";
    },
    activeOptions(isFeatured) {
      const array = this.activeOptionsTypes(isFeatured);
      return array[this.activeBlog];
    },
    optionChanged({ command, id, featured, closeDropdown }) {
      if (command === "EDIT_BLOG" || command === "EDIT_DRAFT")
        return this.$router.push(`/instructor/blog/${id}/edit`);
      if (command === "DELETE_BLOG" || command === "DELETE_DRAFT")
        return this.deleteBlog(id, closeDropdown);
      if (command === "TOGGLE_FEATURE")
        return this.updateFeaturedBlog(id, !featured, closeDropdown);
    },
    updateFeaturedBlog(id, featured, closeDropdown) {
      closeDropdown();
      this.$store
        .dispatch("instructor/blog/updateFeaturedBlog", {featured, id})
        .then(_ => {
          this.reloadBlogs();
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
        }).catch(_ => {
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
        })
    },
    reloadBlogs() {
      this.$store
        .dispatch("instructor/blog/fetchInstructorBlogs")
        .then(blogs => {
          this.$toasted.success("Blog has been deleted!", {
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
    deleteBlog(id, closeDropdown) {
      if (confirm("Are you shure?")) {
        closeDropdown();
        document.getElementById(`element${id}`).classList.add("on-delete");
        document.getElementById(
          `element${id}`
        ).innerHTML += `<div class="loader right-loading" id="loadingelement${id}" style="position: absolute;right: 10px;top: 50%;height: 34px;width: 34px;"></div>`;
        // Delete blog post
        this.$store
          .dispatch("instructor/blog/deleteBlog", id)
          .then(() => {
            // Reload blogs
            this.reloadBlogs();
          })
          .catch(() => {
            document.getElementById(`loadingelement${id}`).remove();
            document
              .getElementById(`element${id}`)
              .classList.remove("on-delete");

            this.$toasted.error("Blog cannot be deleted!", {
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
      }
    }
  }
};
</script>

<style scoped lang="scss">
.blog-error {
  font-size: 35px;
}
.blog-card {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  > h2 {
    font-size: 30px;
    font-weight: bold;
  }
  &-footer {
    color: rgba(0, 0, 0, 0.54);
  }
  &.featured {
    border-left: 5px solid #3cc314;
    padding-left: 10px;
    transition: border ease-out 0.2s;
  }
}
.header-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  > h2 {
    font-size: 40px;
    font-weight: bold;
  }
  .title-menu {
    margin-left: auto;
  }
}
.tabs {
  a.is-active {
    border-bottom-color: #363636;
    color: #363636;
  }
}
.on-delete {
  opacity: 0.5;
  position: relative;
}
.right-loading {
  position: absolute;
  right: 10px;
  top: 50%;
  height: 34px;
  width: 34px;
}
.loading-div,
.loading-div:before,
.loading-div:after {
  border-radius: 50%;
}
.loading-div {
  color: #ffffff;
  font-size: 11px;
  text-indent: -99999em;
  margin: 55px auto;
  // position: relative;
  // width: 10em;
  // height: 10em;
  box-shadow: inset 0 0 0 1em;
  border: 3px solid #9ecffa;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  position: absolute;
  right: 10px;
  top: 50%;
  height: 34px;
  width: 34px;
}
.loading-div:before,
.loading-div:after {
  position: absolute;
  content: "";
}
.loading-div:before {
  width: 5.2em;
  height: 10.2em;
  background: #0dc5c1;
  border-radius: 10.2em 0 0 10.2em;
  top: -0.1em;
  left: -0.1em;
  -webkit-transform-origin: 5.1em 5.1em;
  transform-origin: 5.1em 5.1em;
  -webkit-animation: load2 2s infinite ease 1.5s;
  animation: load2 2s infinite ease 1.5s;
}
.loading-div:after {
  width: 5.2em;
  height: 10.2em;
  background: #0dc5c1;
  border-radius: 0 10.2em 10.2em 0;
  top: -0.1em;
  left: 4.9em;
  -webkit-transform-origin: 0.1em 5.1em;
  transform-origin: 0.1em 5.1em;
  -webkit-animation: load2 2s infinite ease;
  animation: load2 2s infinite ease;
}
@-webkit-keyframes load2 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load2 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
