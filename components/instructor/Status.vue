<template>
  <div class="card manage-card">
    <header class="card-header card-section">
      <p class="card-header-title">Status</p>
    </header>
    <div class="card-content card-section">
      <div class="field">
        <label class="label">Course Status</label>
        <div class="select is-medium">
          <select :value="course.status" name="status" @change="$event => emitCourseValue($event)">
            <option value="active">Active</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
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