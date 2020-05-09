<template>
  <div class="container row">
    <!-- <Questions v-bind:questions="questions" /> -->
    <CodeQuestions v-bind:info="info" />
  </div>
</template>

<script>
import { LocalStorage } from "quasar";
import CodeQuestions from "../components/Tests/CodeQuestions.vue";
import Questions from "../components/Tests/Questions.vue";

export default {
  name: "Test",
  components: {
    CodeQuestions,
    Questions
  },
  data() {
    return {
      info: null
    };
  },
  beforeMount() {
    if (!LocalStorage.getItem("loggedIn")) {
      this.$router.push("/login");
    }
    //console.log(response.data);
    console.log(this.$route.query.id);
    this.$axios
      .get(`/api/tests/data/${this.$route.query.id}`)
      .then(response => (this.info = response.data))
      .catch(error => {
        this.$q.notify({
          color: "negative",
          message: "Something went wrong with the server, try again later",
          icon: "report_problem"
        });
      });
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
