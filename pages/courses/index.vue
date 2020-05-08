<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">All My Courses</h1>
        <div class="columns is-multiline">
          <div v-for="course in courses" :key="course._id" class="column is-one-quarter">
            <!-- CARD-ITEM -->
            <v-popover offset="16" trigger="hover" placement="right-start">
              <course-card :course="course" class="tooltip-target" />
              <template slot="popover">
                <course-card-tooltip :course="course" />
              </template>
            </v-popover>
            <!-- CARD-ITEM-END -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import CourseCard from "~/components/CourseCard";
import CourseCardTooltip from "~/components/CourseCardTooltip";
import { mapState } from "vuex";

export default {
  head: {
    title: "Blog posts | My main share point | Alessandro D'Antoni"
  },
  components: {
    CourseCard,
    CourseCardTooltip
  },
  computed: {
    ...mapState({
      courses: ({ course }) => course.items
    })
  },
  async fetch({ store }) {
    await store.dispatch("course/fetchCourses");
  }
};
</script>
<style scoped>
.hero-body,
.section {
  padding: 3rem 1.5rem;
}
</style>
