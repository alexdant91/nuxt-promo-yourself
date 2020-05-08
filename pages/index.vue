<template>
  <div>
    <!-- HERO -->
    <hero
      :title="courseHero.title"
      :subtitle="courseHero.subtitle"
      :image="courseHero.image"
      :promoLink="courseHero.product.productLink"
    />
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Courses</h1>
        <div class="columns is-multiline">
          <div v-for="course in courses" :key="course._id" class="column is-one-quarter">
            <!-- CARD-ITEM -->
            <v-popover
              offset="16"
              trigger="hover"
              placement="right-start"
            >
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
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Articles</h1>
        <div class="columns is-multiline">
          <div v-for="blog in featuredBlogs" :key="blog._id" class="column is-one-quarter">
            <!-- CARD-ITEM -->
            <blog-card :blog="blog" />
            <!-- CARD-ITEM-END -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Hero from "~/components/shared/Hero";
import CourseCard from "~/components/CourseCard";
import BlogCard from "~/components/BlogCard";
import CourseCardTooltip from "~/components/CourseCardTooltip";
import { mapState } from "vuex";

export default {
  components: {
    Hero,
    CourseCard,
    BlogCard,
    CourseCardTooltip
  },
  computed: {
    ...mapState({
      courses: ({course}) => course.items,
      featuredBlogs: ({ blog }) => blog.items.featured,
      courseHero: ({ hero}) => hero.item,
    })
  },
  async fetch({ store }) {
    await store.dispatch("course/fetchCourses");
    await store.dispatch("blog/fetchFeaturedBlogs", {'filter[featured]': true});
  }
};
</script>

<style scoped lang="scss">
// Home page
.links {
  padding-top: 15px;
}
</style>
