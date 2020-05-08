<template>
  <div class="dropdown" :class="{'is-active': isActive}">
    <div class="dropdown-trigger">
      <div @click="isActive = !isActive" aria-haspopup="true" aria-controls="dropdown-menu">
        <span></span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </div>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a
          v-for="(item, index) in items"
          :key="index"
          @click.prevent="emitOption(index)"
          class="dropdown-item"
        >{{item.name}}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    featured: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isActive: false
    };
  },
  computed: {
    options() {
      const options = this.items;
      return options;
    }
  },
  methods: {
    closeDropdown() {
      this.isActive = false;
    },
    emitOption(optionIndex) {
      console.log(this.items[optionIndex])
      this.$emit("optionChanged", {
        command: this.items[optionIndex].command,
        featured: this.featured,
        id: this.id,
        closeDropdown: this.closeDropdown
      });
    }
  }
};
</script>
<style scoped lang="scss">
.dropdown-trigger {
  &:hover {
    cursor: pointer;
  }
}
i {
  font-size: 25px;
  align-self: end;
}
</style>
