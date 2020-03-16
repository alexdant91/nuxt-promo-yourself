<template>
  <div>
    <!-- Send a label through props -->
    <label class="label">{{label}}</label>
    <!-- Iterate lines here -->
    <div v-for="(line, index) in lines" :key="index" class="multi-field field">
      <div class="control multi-control">
        <div class="multi-input-container">
          <input
            class="input is-medium multi-input"
            type="text"
            :placeholder="'Add Something Nice (:'"
            :value="line.value"
            @input="emitUpdate($event, index)"
          />
        </div>
        <div class="btn-container">
          <!-- Delete the line -->
          <button
            @click.prevent="emitRemove(index)"
            type="button"
            class="button is-danger multi-button"
          >Delete</button>
        </div>
      </div>
    </div>
    <!-- Add the Line -->
    <button
      @click.prevent="emitAdd()"
      type="button"
      class="m-b-sm button is-medium is-link is-outlined"
    >Add an answer</button>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    lines: {
      type: Array,
      required: true
    }
  },
  computed: {
    lastLine() {
      return this.lines[this.lines.length - 1];
    },
    hasLines() {
      return this.lines.length > 0;
    },
    hasLastLinesValue() {
      return this.lastLine && this.lastLine.value !== "";
    },
    canDeleteLine() {
      return this.lines.length > 1;
    },
    canAddLine() {
      return this.hasLines ? this.hasLastLinesValue : true;
    }
  },
  methods: {
    emitAdd() {
      if (this.canAddLine) this.$emit("addClicked");
    },
    emitRemove(index) {
      if (this.canDeleteLine) this.$emit("removeClicked", index);
    },
    emitUpdate($event, index) {
      this.$emit("valueUpdated", { index, value: $event.target.value });
    }
  }
};
</script>

<style scoped lang="scss">
.multi-input {
  float: left;
  width: 100%;
}
.multi-button {
  height: inherit;
}
.multi-input-container {
  display: flex;
  flex: 1;
}
.btn-container {
  display: flex;
  opacity: 0;
}
.multi-control {
  display: flex;
  &:hover > .btn-container {
    opacity: 1;
  }
}
</style>
