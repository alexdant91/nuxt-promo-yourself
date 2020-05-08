<template>
  <div>
    <product-hero :title="course.title" :subtitle="course.subtitle" :author="course.author">
      <product-hero-card
        :price="course.price"
        :discountedPrice="course.discountedPrice"
        :navigateTo="course.productLink"
        :requirements="course.requirements"
        :image="course.image"
      />
    </product-hero>
    <div class="container">
      <div class="columns">
        <div class="column is-9">
          <div class="section p-b-md">
            <div class="what-you-get">
              <div class="what-you-get-title">What you will learn</div>
              <ul class="what-you-get-items">
                <!-- TODO: Iterate course wsl -->
                <li v-for="(wsl, index) in course.wsl" :key="index" class="what-you-get-item">
                  <div>
                    <i class="fal fa-check m-r-sm" style="color: green;"></i>
                  </div> <span>{{wsl.value}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="section course-description p-t-none">
            <div class="what-you-get">
              <div class="what-you-get-title">Course Info</div>
              <div class="course-description-details">
                <!-- TODO: use v-html for description -->
                <div v-html="course.description"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductHero from "~/components/ProductHero";
import ProductHeroCard from "~/components/shared/ProductHeroCard";
import { mapState } from "vuex";

export default {
  head() {
    return {
      title: this.course.title,
      meta: [
        { hid: 'description', name: 'description', content: this.course.subtitle },
        { hid: 'og:title', name: 'og:title', content: this.course.title },
        { hid: 'og:description', name: 'og:description', content: this.course.subtitle },
        { hid: 'og:image', name: 'og:image', content: this.course.image },
      ]
    }
  },
  components: {
    ProductHero,
    ProductHeroCard
  },
  computed: {
    ...mapState({
      course: ({ course }) => course.item
    })
  },
  async fetch({ store, params }) {
    await store.dispatch("course/fetchCourseBySlug", params.slug);
  }
};
</script>

<style lang="scss">
.what-you-get {
  background-color: #f9f9f9;
  border: 1px solid #dedfe0;
  padding: 15px 25px;
  &-title {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &-items {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &-item {
    display: flex;
    align-items: baseline;
    margin-bottom: 10px;
    font-size: 17px;
    width: 45%;
  }
}
.course-description {
  &-title {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &-details {
    font-size: 18px;
    ul {
      list-style: disc;
      margin-left: 20px;
    }
    ol {
      margin-left: 20px;
    }
    strong {
      font-size: 20px;
    }
    p {
      height: 30px;
    }
  }
}
</style>
