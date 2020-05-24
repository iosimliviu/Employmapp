<template>
  <div class="q-pa-md" style="max-width: 70%">
    <q-list>
      <q-input v-model.number="testInstance.duration" type="number" />
      <q-input v-model="testInstance.name" label="Outlined" />
      <q-input v-model="testInstance.description" label="Outlined" />
      <q-input v-model="testInstance.type" label="Outlined" />
      <q-expansion-item
        v-for="(question, i) in testInstance.questions"
        :key="i + 'q'"
        expand-separator
        :label="question.questionText"
      >
        <q-card>
          <q-card-section>
            <q-input v-model.number="question.score" type="number" />
            <div v-for="(answer, j) in question.answers" :key="j">
              <q-checkbox v-model="answer.isCorrect" />
              <q-input outlined v-model="answer.answerText" label="Outlined" />
              <q-btn @click="removeAnswer(i, j)" label="-" color="red" round />
            </div>
          </q-card-section>
        </q-card>
        <q-btn @click="addAnswer(i)" label="add Answer" color="primary" />
        <q-btn @click="removeQuestion(i)" label="remove Question" color="red" />
      </q-expansion-item>
      <q-expansion-item
        v-for="(codeQuestion, i) in testInstance.codeQuestions"
        :key="i + 'cq'"
        expand-separator
        :label="codeQuestion.questionText"
      >
        <q-card>
          <q-card-section>
            <q-input
              outlined
              v-model.number="codeQuestion.scorePerTest"
              type="number"
            />
            <q-input
              outlined
              v-model.number="codeQuestion.noTests"
              type="number"
            />
            <q-input
              outlined
              v-model="codeQuestion.questionText"
              label="Outlined"
            />
            <q-input outlined v-model="codeQuestion.test" label="Outlined" />
          </q-card-section>
        </q-card>
        <q-btn
          @click="removeCodeQuestion(i)"
          label="remove code Question"
          color="red"
        />
      </q-expansion-item>
      <q-btn
        @click="addCodeQuestion"
        label="add Code Question"
        color="primary"
      />
      <q-btn @click="addQuestion" label="add Question" color="primary" />
      <q-btn @click="resetTest" label="reset" color="primary" />
      <q-btn @click="createTest" type="submit" label="create" color="primary" />
    </q-list>
  </div>
</template>

<script>
import { LocalStorage } from "quasar";
export default {
  data() {
    return {
      testInstance: {
        duration: 20,
        name: "DEFAULT NAME",
        description: "DEFAULT DESCRIPTION",
        type: "DEFAULT TYPE",
        codeQuestions: [
          {
            questionText: "1DEFAULT CODE QUESTION",
            scorePerTest: 1,
            noTests: 2,
            test: "\n1copy and paste you python test in here\n"
          }
        ],
        questions: [
          {
            questionText: "DEFAULT QUESTION?",
            score: 10,
            answers: [
              {
                answerText: "1DEFAULT ANSWER1",
                isCorrect: true
              },
              {
                answerText: "1DEFAULT ANSWER2",
                isCorrect: false
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    createTest() {
      this.$axios
        .post("/api/tests/", {
          duration: this.testInstance.duration,
          name: this.testInstance.name,
          description: this.testInstance.description,
          type: this.testInstance.type,
          codeQuestions: this.testInstance.codeQuestions,
          questions: this.testInstance.questions
        })
        .then(response => {
          console.log(response.data);
          this.$q.notify({
            color: "green",
            message: response.data.message,
            icon: "arrow_forward"
          });
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: error.response.data.message,
            icon: "report_problem"
          });
        });
      this.$router.push("/adminTests");
    },
    resetTest() {
      this.testInstance = {
        title: "",
        description: "",
        questions: [],
        codeQuestions: []
      };
    },
    addCodeQuestion() {
      this.testInstance.codeQuestions.push({
        questionText: "a",
        scorePerTest: 2,
        noTests: 2,
        test: "\na\n"
      });
      console.log(this.testInstance);
    },
    addQuestion() {
      this.testInstance.questions.push({
        questionText: "added question",
        score: 10,
        answers: [
          {
            answerText: "added question",
            isCorrect: true
          }
        ]
      });
      console.log(this.testInstance);
    },
    addAnswer(questionIndex) {
      const answers = this.testInstance.questions[questionIndex].answers;
      if (answers.length < 5) {
        answers.push({
          answerText: "added",
          isCorrect: false
        });
      }
      console.log(this.testInstance);
    },
    removeQuestion(questionIndex) {
      if (this.testInstance.questions.length > 1) {
        this.testInstance.questions.splice(questionIndex, 1);
      }
    },
    removeCodeQuestion(codeQuestionIndex) {
      if (this.testInstance.codeQuestions.length > 1) {
        this.testInstance.codeQuestions.splice(codeQuestionIndex, 1);
      }
    },
    removeAnswer(questionIndex, answerIndex) {
      const question = this.testInstance.questions[questionIndex];

      if (question.answers.length > 1) {
        question.answers.splice(answerIndex, 1);
      }
    }
  },
  beforeMount() {
    if (!LocalStorage.getItem("loggedIn")) {
      this.$router.push("/login");
    }
  }
};
</script>

<style></style>
