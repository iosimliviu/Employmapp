<template>
  <div class="container row">
    <div class="allQuestions">
      <q-stepper
        v-if="info.questions || info.codeQuestions"
        v-model="step"
        ref="stepper"
        keep-alive
      >
        <q-step
          v-for="(question, i) in info.questions.concat(info.codeQuestions)"
          :key="i + 'itq'"
          :name="i"
          :title="'Question ' + (i + 1)"
          icon="settings"
          :done="step > i"
        >
          <div v-if="question.answers" class="q-ma-lg">
            <q-card>
              <q-card-section>
                <div class="text-h6">{{ question.questionText }}</div>
              </q-card-section>
            </q-card>

            <q-list>
              <q-item
                v-for="answer in question.answers"
                :key="answer.id + 'ita'"
              >
                <q-item-section avatar>
                  <q-radio v-model="stepAnswer" :val="answer" color="primary" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ answer.answerText }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div v-else>
            <q-card class="question">
              <q-card-section>
                <div class="text-h6">{{ question.questionText }}</div>
                <q-btn
                  @click="testCode(question.id)"
                  color="primary"
                  size="24px"
                  >Run</q-btn
                >
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
                <div class="text-h6">{{ codeGuidanceData }}</div>
              </q-card-section>
            </q-card>
          </div>
        </q-step>
        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click="$refs.stepper.next()"
              color="primary"
              :label="
                step === info.questions.concat(info.codeQuestions).length - 1
                  ? 'Finish'
                  : 'Continue'
              "
            />
            <q-btn
              v-if="step > 0"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>

      <div class="q-px-sm">
        Your selection is: <strong>{{ stepAnswer }}</strong> Your selection is:
      </div>
    </div>
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
      step: 0,
      stepAnswer: "",
      info: {},
      codeInput: "",
      codeGuidanceData: {},
      getAllQuestions: [],
      guidanceData: "Passed 2 out of 2",
      options: {
        //Monaco Editor Options
      }
    };
  },
  methods: {
    onChange(value) {
      this.codeInput = value;
      console.log(value + " " + this.codeInput);
    },
    testCode(codeQuestionId) {
      this.$axios
        .post(`/api/tests/testCode`, {
          answer: this.codeInput,
          codeQuestionId: codeQuestionId,
          id: LocalStorage.getItem("userId")
        })
        .then(response => {
          this.codeGuidanceData = response.data;
          console.log(response.data);
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: "Something went wrong with the server, try again later",
            icon: "report_problem"
          });
        });
    }
  },
  created() {
    console.log(this.info);
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
