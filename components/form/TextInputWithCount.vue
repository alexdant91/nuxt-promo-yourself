<template>
  <div>
    <!-- 
                    @input="emitFormData"
                    @blur="$v.form.title.$touch()"
                    v-model="form.title"
    -->
    <input
      :maxLength="maxLength"
      @input="input"
      @blur="v.$touch()"
      type="text"
      placeholder="e.g. Amazing Course in Flutter!"
      class="input is-large"
    />
    <span class="icon is-small is-right">{{counter}}</span>
  </div>
</template>

<script>
export default {
  props: {
    maxLength: {
      type: Number,
      default: 50,
      required: false
    },
    v: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      counter: this.maxLength
    };
  },
  methods: {
    input(event) {
      this.$emit("input", event.target.value);
      this.counter = this.maxLength - event.target.value.length;
    }
  }
};
</script>