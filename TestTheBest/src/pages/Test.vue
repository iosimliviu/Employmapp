<template>
  <div class="container row">
    <div class="allQuestions">
      <div
        v-for="question in info.questions"
        :key="question.id"
        class="q-ma-lg"
      >
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ question.questionText }}</div>
          </q-card-section>
        </q-card>
        <q-list>
          <q-item
            v-for="answer in question.answers"
            :key="answer.id"
            tag="label"
            v-ripple
          >
            <q-item-section avatar>
              <q-radio v-model="ans" :val="answer.id" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ answer.answerText }}</q-item-label>
            </q-item-section>
          </q-item>
          <div class="q-px-sm">
            Your selection is: <strong>{{ ans }}</strong>
          </div>
        </q-list>
      </div>
      <div
        v-for="codeQuestion in info.codeQuestions"
        :key="codeQuestion.id"
        class="q-ma-lg"
      >
        <q-card class="question">
          <q-card-section>
            <div class="text-h6">
              {{ codeQuestion.testId }}{{ codeQuestion.questionText }}
            </div>
            <q-btn color="primary" size="24px">Run</q-btn>
          </q-card-section>
        </q-card>

        <MonacoEditor
          theme="vs-dark"
          language="python"
          :options="options"
          @change="onChange"
          class="editor"
          height="500px"
        ></MonacoEditor>

        <q-card class="output">
          <q-card-section>
            <div class="text-h6">{{ guidanceData }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- <Questions v-bind:questions="questions" /> -->
  </div>
</template>

<script>
import { LocalStorage } from "quasar";
import MonacoEditor from "monaco-editor-vue";

export default {
  name: "Test",
  components: {
    MonacoEditor
  },
  data() {
    return {
      info: null,
      guidanceData: "Passed 2 out of 2",
      ans: "",
      options: {
        //Monaco Editor Options
      }
    };
  },
  methods: {
    onChange(value) {
      console.log(value);
    }
  },
  beforeCreate() {
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
  },
  beforeMount() {
    if (!LocalStorage.getItem("loggedIn")) {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.allQuestions {
  width: 65%;
}
.editor {
  width: 100%;
}
.question {
  width: 100%;
}
.output {
  width: 100%;
}
</style>
