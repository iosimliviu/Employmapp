<template>
  <div class="container row">
    <Questions/>    
    <CodeQuestions />
  </div>
</template>

<script>
import CodeQuestions from "../components/Tests/CodeQuestions.vue";
import Questions from "../components/Tests/Questions.vue";
export default {
  name: "Test",
  components: {
    CodeQuestions,
    Questions
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>