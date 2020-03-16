<template>
  <div class="course-create-wrapper">
    <div class="course-create-headerText">What category best fits the knowledge you'll share?</div>
    <h2
      class="course-create-subtitle"
    >If you're not sure about the right category, you can change it later.</h2>
    <form class="course-create-form" v-on:submit.prevent="() => {}">
      <div class="course-create-form-group">
        <div class="course-create-form-field">
          <div class="select is-large">
            <select
              v-model="form.category"
              @change="emitFormData"
              @blur="$v.form.category.$touch()"
            >
              <option value="default" selected>Select Category</option>
              <option
                v-for="category in categories"
                :key="category._id"
                :value="category._id"
              >{{category.name}}</option>
            </select>
            <div v-if="$v.form.category.$error" class="form-error has-text-left">
              <span
                v-if="!$v.form.category.customRequired"
                class="help is-danger has-text-left"
              >Category is required</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      form: {
        category: "default"
      }
    };
  },
  validations: {
    form: {
      category: {
        customRequired: value => {
          return (
            value != null &&
            value != undefined &&
            value != "" &&
            value != "default"
          );
        }
      }
    }
  },
  computed: {
    categories() {
      return this.$store.state.category.items;
    },
    isValid() {
      return !this.$v.$invalid && this.form.category !== "default";
    }
  },
  methods: {
    emitFormData() {
      this.$v.form.$touch();
      this.$emit("stepUpdated", { data: this.form, isValid: this.isValid });
    }
  }
};
</script>