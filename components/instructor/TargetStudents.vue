<template>
  <div class="card manage-card">
    <header class="card-header card-section">
      <p class="card-header-title">Target your Students</p>
    </header>
    <div class="card-content card-section">
      <form>
        <multi-line-text-input
          @addClicked="addLine('wsl')"
          @removeClicked="removeLine($event, 'wsl')"
          @valueUpdated="updateLine($event, 'wsl')"
          :lines="course.wsl"
          label="What will students learn"
        />
        <multi-line-text-input
          @addClicked="addLine('requirements')"
          @removeClicked="removeLine($event, 'requirements')"
          @valueUpdated="updateLine($event, 'requirements')"
          :lines="course.requirements"
          label="What are the requirements"
        />
      </form>
    </div>
  </div>
</template>

<script>
import MultiLineTextInput from "~/components/form/MultiLineTextInput";

export default {
  components: {
    MultiLineTextInput
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  methods: {
    addLine(field) {
      // Dispatch action to add line
      console.log("Add line");
      this.$store.commit("instructor/course/addLine", field);
    },
    removeLine(index, field) {
      // Dispatch action to remove line
      console.log("Remove line ", index);
      this.$store.commit("instructor/course/removeLine", { index, field });
    },
    updateLine({ index, value }, field) {
      // Dispatch action to update line
      this.$store.dispatch("instructor/course/updateLine", {
        index,
        field,
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