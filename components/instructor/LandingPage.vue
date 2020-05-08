<template>
  <div class="card manage-card">
    <header class="card-header card-section">
      <p class="card-header-title">Course Landing Page</p>
    </header>
    <div class="card-content card-section">
      <form>
        <div class="field">
          <label class="label">Course title</label>
          <div class="control">
            <input
              :value="course.title"
              @input="$event => emitCourseValue($event)"
              name="title"
              class="input is-medium"
              type="text"
              placeholder="Dart and Flutter From Zero to Hero "
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Course subtitle</label>
          <div class="control">
            <input
              :value="course.subtitle"
              @input="$event => emitCourseValue($event)"
              name="subtitle"
              class="input is-medium"
              type="text"
              placeholder="Build real mobile Application for Android and iOS."
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Course description</label>
          <div class="control">
            <!-- <textarea
              :value="course.description"
              @input="$event => emitCourseValue($event)"
              name="description"
              class="textarea is-medium"
              type="text"
              rows="6"
              placeholder="Write something catchy about the course"
            ></textarea>-->
            <course-editor
              :initialContent="course.description"
              @editorUpdated="content => {
                const $event = {
                  target: {
                    name: 'description',
                    value: content
                  }
                };
                return emitCourseValue($event);
              }"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Category</label>
          <div class="select is-medium">
            <select
              :value="course.category._id"
              name="category"
              @change="$event => emitCategoryValue($event)"
            >
              <option
                v-for="category in categories"
                :key="category._id"
                :value="category._id"
              >{{category.name}}</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label class="label">Course Image</label>
          <div class="columns">
            <div class="column">
              <figure class="image is-4by2">
                <img :src="course.image || 'https://via.placeholder.com/450x250'" />
              </figure>
            </div>
            <div class="column centered">
              <div class="control">
                <input
                  :value="course.image"
                  @input="$event => emitCourseValue($event)"
                  name="image"
                  class="input is-medium"
                  type="text"
                  placeholder="https://images.unsplash.com/photo-1498837167922-ddd27525d352"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Course Link</label>
          <div class="control">
            <input
              :value="course.productLink"
              @input="$event => emitCourseValue($event)"
              name="productLink"
              class="input is-medium"
              type="text"
              placeholder="https://www.udemy.com/vue-js-2-the-full-guide-by-real-apps-vuex-router-node"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Course Video Link</label>
          <div class="control">
            <input
              :value="course.promoVideoLink"
              @input="$event => emitCourseValue($event)"
              name="promoVideoLink"
              class="input is-medium"
              type="text"
              placeholder="https://www.youtube.com/watch?v=WQ9sCAhRh1M"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CourseEditor from "~/components/editor/CourseEditor";

export default {
  components: {
    CourseEditor
  },
  props: {
    course: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  methods: {
    emitCourseValue($event) {
      const { name, value } = $event.target;
      this.$store.dispatch("instructor/course/updateCourseValue", {
        name,
        value
      });
    },
    emitCategoryValue($event) {
      const { name, value } = $event.target;
      const categoryValue = this.categories.find(
        category => category._id === value
      );
      this.$store.dispatch("instructor/course/updateCourseValue", {
        name,
        value: categoryValue
      });
    }
  }
};
</script>

<style scoped lang="scss">
.label-info {
  font-size: 13px;
  color: gray;
  font-style: italic;
}
.course-manage {
  padding-top: 40px;
  .menu {
    padding-top: 30px;
    &-label {
      font-size: 20px;
      color: black;
    }
    &-list {
      > li {
        font-size: 18px;
        margin-top: 10px;
        > a {
          &.is-active {
            background-color: transparent;
            color: inherit;
          }
        }
      }
    }
  }
  .card {
    &-section {
      padding: 40px;
    }
    &-header {
      &-title {
        padding: 0;
        color: #8f99a3;
        font-weight: 400;
        font-size: 25px;
      }
    }
  }
}
</style>