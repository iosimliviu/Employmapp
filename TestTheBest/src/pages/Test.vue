<template>
  <div class="container row">
    <q-btn
      color="secondary"
      size="24px"
      :label="formattedTimeLeft + '/' + formattedTotalTime"
    />
    <q-card v-if="isAttemptStarted === false">
      <q-card-section>
        <div class="text-h6">ARE YOU SURE YOU WANT TO START?</div>
        <q-btn @click="startAttempt" color="primary" size="24px">YES</q-btn>
        <q-btn
          :to="`/`"
          @click.native="$router.go()"
          color="primary"
          size="24px"
          >NO, TAKE ME BACK</q-btn
        >
      </q-card-section>
    </q-card>
    <div v-else>
      <q-card v-if="done">
        <q-card-section>
          <div class="text-h6">
            TEST FINISHED
            <q-btn
              :to="`/`"
              @click.native="$router.go()"
              color="primary"
              size="24px"
              >go home</q-btn
            >
          </div>
        </q-card-section>
      </q-card>
      <div v-else class="allQuestions">
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
                    <q-radio
                      v-model="stepAnswer"
                      :val="answer"
                      color="primary"
                    />
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
                :value="question.input"
                theme="vs-dark"
                language="python"
                :options="options"
                @change="onChange"
                class="editor"
                height="500px"
                >asddddddddddd</MonacoEditor
              >

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
                v-if="
                  step === info.questions.concat(info.codeQuestions).length - 1
                "
                @click="onFinish"
                type="submit"
                color="primary"
                label="Finish"
              />
              <q-btn
                v-else
                @click="
                  $refs.stepper.next();
                  onNext();
                "
                color="primary"
                label="Continue"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>

        <div class="q-px-sm">
          Your selection is: <strong>{{ stepAnswer }}</strong>
          {{ new Date().toISOString() }}5/24/2020, 5:54:34 PM lala
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LocalStorage } from "quasar";
import { date } from "quasar";
import MonacoEditor from "monaco-editor-vue";

export default {
  name: "Test",
  components: {
    MonacoEditor
  },
  data() {
    return {
      timePassed: 0,
      timerInterval: null,
      step: 0,
      isAttemptStarted: false,
      stepAnswer: "",
      info: {
        test: {
          duration: 0
        },
        questions: [],
        codeQuestions: [
          {
            input: ""
          }
        ]
      },
      codeInput: "",
      codeGuidanceData: {},
      result: 0,
      done: false,
      noIncorrect: 0,
      noPassedTests: 0,
      options: {
        //Monaco Editor Options
      }
    };
  },
  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp();
      }
    }
  },
  computed: {
    formattedTotalTime() {
      const totalTime = this.info.test.duration;
      const minutes = Math.floor(totalTime / 60);
      let seconds = totalTime % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
    },

    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
    },
    timeLeft() {
      return this.info.test.duration - this.timePassed;
    },
    getNoQuestions() {
      return this.info.questions.length;
    },
    getNoTotalTests() {
      var noTotalTests = 0;
      for (var i = 0; i < this.info.codeQuestions.length; i++) {
        noTotalTests += this.info.codeQuestions[i].noTests;
      }
      return noTotalTests;
    }
  },
  methods: {
    onTimesUp() {
      clearInterval(this.timerInterval);
      this.done = true;
      this.updateUserTest();
    },
    startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    },
    startAttempt() {
      this.isAttemptStarted = true;
      this.$axios
        .post(`/api/userTests/`, {
          userId: LocalStorage.getItem("userId"),
          testId: this.$route.query.id,
          startedAt: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss"),
          finishedAt: "",
          noCorrect: this.getNoQuestions,
          noIncorrect: this.noIncorrect,
          noTotalTests: this.getNoTotalTests,
          noPassedTests: this.noPassedTests,
          done: this.done,
          result: this.result
        })
        .then(response => {
          this.$q.notify({
            color: "green",
            message: response.data.message,
            icon: "arrow_forward"
          });
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: "Something went wrong with the server, try again later",
            icon: "report_problem"
          });
        });
      this.startTimer();
    },
    onNext() {
      if (this.stepAnswer == null) return;

      const question = this.info.questions.concat(this.info.codeQuestions)[
        this.step - 1
      ];

      if (question.answers) {
        if (this.stepAnswer.isCorrect) this.result += question.score;
        else this.noIncorrect++;
      } else {
        const codeAnswer = this.codeGuidanceData;
        if (question.scorePerTest && this.codeGuidanceData.noPassedTests) {
          this.result += codeAnswer.noPassedTests * question.scorePerTest;
          this.noPassedTests += codeAnswer.noPassedTests;
        }
      }
      this.codeGuidanceData = {};
      console.log(this.result);

      this.updateUserTest();
    },
    onFinish() {
      const question = this.info.questions.concat(this.info.codeQuestions)[
        this.step - 1
      ];
      if (question.answers) {
        if (this.stepAnswer.isCorrect) this.result += question.score;
        else this.noIncorrect++;
      } else {
        const codeAnswer = this.codeGuidanceData;
        if (question.scorePerTest && this.codeGuidanceData.noPassedTests)
          this.result += codeAnswer.noPassedTests * question.scorePerTest;
      }
      this.done = true;
      this.codeGuidanceData = {};
      console.log(this.result);
      clearInterval(this.timerInterval);
      this.updateUserTest();
    },
    updateUserTest() {
      this.$axios
        .put(`/api/userTests/`, {
          userId: LocalStorage.getItem("userId"),
          testId: this.$route.query.id,
          finishedAt: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss"),
          noIncorrect: this.noIncorrect,
          noPassedTests: this.noPassedTests,
          done: this.done,
          result: this.result
        })
        .then(response => {
          this.$q.notify({
            color: "green",
            message: response.data.message,
            icon: "arrow_forward"
          });
        })
        .catch(error => {
          this.$q.notify(error => {
            this.$q.notify({
              color: "negative",
              message: error.response.data.message,
              icon: "report_problem"
            });
          });
        });
    },
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
  beforeCreate() {
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
  // beforeUpdate() {
  // if (localStorage.getItem("reloaded")) {
  //       // The page was just reloaded. Clear the value from local storage
  //       // so that it will reload the next time this page is visited.
  //       localStorage.removeItem("reloaded");
  //     } else {
  //       // Set a flag so that we know not to reload the page twice.
  //       localStorage.setItem("reloaded", "1");
  //       location.reload();
  //     }
  // }
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
