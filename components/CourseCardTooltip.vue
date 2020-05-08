<template>
  <div class="card card-tooltip">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <!-- TODO: Course Title -->
          <p class="title is-4">{{course.title}}</p>
          <!-- TODO: Course Subtitle -->
          <p class="subtitle is-6"><i>{{course.category.name}}</i></p>
        </div>
      </div>

      <!-- TODO: Course Description -->
      <div class="content">
        {{course.subtitle}}
      </div>
      <div class="content">
        <ul class="wsl-list">
          <!-- TODO: Iterate wsl -->
          <li v-for="(wsl, index) in course.wsl" :key="index" class="wsl-item">
            {{wsl.value}}
          </li>
        </ul>
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
  }
}
</script>
<style scoped lang="scss">
  .card-tooltip {
    max-width: 350px;
    .title {
      font-size: 18px;
    }
    .wsl-list {
      margin-left: 13px;
      .wsl-item {
        font-size: 13px;
      }
    }
  }
</style>
