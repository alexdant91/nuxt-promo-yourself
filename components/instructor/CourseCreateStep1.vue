<template>
  <div class="course-create-wrapper">
    <div class="course-create-headerText">Please choose title of your Course.</div>
    <h2 class="course-create-subtitle">No worries, you can change title later.</h2>
    <form class="course-create-form" v-on:submit.prevent="() => {}" @input="emitFormData">
      <div class="course-create-form-group">
        <div class="field course-create-form-field control has-icons-right">
          <!-- <input
            @input="emitFormData"
            @blur="$v.form.title.$touch()"
            v-model="form.title"
            :maxLength="50"
            type="text"
            placeholder="e.g. Amazing Course in Flutter!"
            class="input is-large"
          />-->

          <TextInputWithCount :maxLength="50" :v="$v.form.title" v-model="form.title" />

          <div v-if="$v.form.title.$error" class="form-error">
            <span v-if="!$v.form.title.required" class="help is-danger">Title is required</span>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import TextInputWithCount from "~/components/form/TextInputWithCount";

export default {
  data() {
    return {
      form: {
        title: ""
      }
    };
  },
  components: {
    TextInputWithCount
  },
  validations: {
    form: {
      title: {
        required
      }
    }
  },
  computed: {
    isValid() {
      return !this.$v.$invalid;
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