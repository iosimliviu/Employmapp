<template>
  <div class="cardSection q-pa-md">
    <q-card class="formCard">
      <q-card-section class="q-pa-lg">
        <div class="row">
          <q-input v-model="testInstance.name" class="col-11" label="Name" />
          <q-input
            v-model.number="testInstance.duration"
            type="number"
            class="col"
            label="Duration(s)"
          />
        </div>
        <q-input
          v-model="testInstance.description"
          type="textarea"
          label="Description"
        />
        <q-input v-model="testInstance.type" label="Type" />
        <q-expansion-item
          v-for="(question, i) in testInstance.questions"
          :key="i + 'q'"
          expand-separator
          :label="question.questionText"
        >
          <q-card class="bg-light1">
            <q-card-section>
              <div class="q-mb-lg row">
                <q-input
                  v-model.number="question.questionText"
                  class="col-11"
                  label="Question"
                />
                <q-input
                  v-model.number="question.score"
                  class="col"
                  type="number"
                  label="Score"
                />
              </div>
              <div v-for="(answer, j) in question.answers" :key="j + 'a'">
                <q-checkbox
                  v-model="answer.isCorrect"
                  label="Right Answer"
                  style="color:#808080"
                />
                <div class="q-mb-lg row">
                  <q-input
                    class="col-11"
                    v-model="answer.answerText"
                    label="Answer"
                  />
                  <div class="col">
                    <q-btn
                      @click="removeAnswer(i, j)"
                      label="-"
                      color="red"
                      round
                    />
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <q-btn
                class="q-mr-lg roundCorners"
                @click="addAnswer(i)"
                label="add Answer"
                color="primary"
              />
              <q-btn
                @click="removeQuestion(i)"
                label="remove Question"
                color="red"
                class="roundCorners"
                flat
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          v-for="(codeQuestion, i) in testInstance.codeQuestions"
          :key="i + 'cq'"
          expand-separator
          :label="codeQuestion.questionText"
          @click="editorRefresh++ + 'e'"
        >
          <q-card class="bg-light1">
            <q-card-section>
              <q-input
                v-model.number="codeQuestion.questionText"
                label="Question"
              />
              <div class="row">
                <q-input
                  class="col"
                  v-model.number="codeQuestion.scorePerTest"
                  type="number"
                  label="Score per test"
                />

                <q-input
                  class="col"
                  v-model.number="codeQuestion.noTests"
                  type="number"
                  label="Total number of unit tests"
                />
              </div>
              <!-- <q-input v-model="codeQuestion.input" label="Outlined" />
              <q-input v-model="codeQuestion.test" label="Outlined" /> -->
              <p class="q-mt-lg" color="grey-8">Enter test case:</p>
              <MonacoEditor
                :key="editorRefresh"
                v-model="codeQuestion.test"
                theme="vs-dark"
                language="python"
                :options="options"
                height="300"
              ></MonacoEditor>
              <p class="q-mt-lg" color="grey-8">Enter user start input:</p>
              <MonacoEditor
                :key="editorRefresh"
                v-model="codeQuestion.input"
                theme="vs-dark"
                language="python"
                :options="options"
                height="150"
              ></MonacoEditor>
            </q-card-section>
            <q-card-section>
              <q-btn
                @click="removeCodeQuestion(i)"
                label="remove code Question"
                class="roundCorners"
                color="red"
                flat
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section>
      <div class="row q-pa-lg">
        <q-card-actions class="col" align="center">
          <q-btn
            @click="addQuestion"
            class="q-mr-lg roundCorners"
            label="add Question"
            color="secondary"
          />
          <q-btn
            @click="addCodeQuestion"
            label="add Code Question"
            class="roundCorners"
            color="accent"
          />
        </q-card-actions>
        <q-card-actions class="col" align="center">
          <q-btn
            @click="resetTest"
            class="q-mr-lg roundCorners"
            flat
            label="reset"
            color="accent"
          />
          <q-btn
            to="`/adminTests`"
            @click.native="
              createTest();
              $router.go();
            "
            class="q-pa-xs roundCorners"
            type="submit"
            label="create test"
            color="primary"
            size="lg"
          />
        </q-card-actions>
      </div>
    </q-card>
  </div>
</template>

<style>
.roundCorners {
  border-radius: 25px;
}

.cardSection {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.formCard {
  width: 75%;
  max-width: 1500px;
  border-radius: 25px;
}
</style>

<script>
import { colors } from "quasar";
colors.setBrand("light1", "#F0F4EF");
colors.setBrand("light2", "#ADB6C4");

import { LocalStorage } from "quasar";
import MonacoEditor from "monaco-editor-vue";

export default {
  components: {
    MonacoEditor
  },
  data() {
    return {
      editorRefresh: 0,
      options: {
        //Monaco Editor Options
      },
      testInstance: {
        duration: 20,
        name: "DEFAULT NAME",
        description: "DEFAULT DESCRIPTION",
        type: "DEFAULT TYPE",
        codeQuestions: [
          {
            questionText: "1DEFAULT CODE QUESTION",
            input: "'''function(s) signature(s)'''",
            scorePerTest: 1,
            noTests: 2,
            test: "'''copy and paste your python test in here'''"
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
    onChange(value) {
      console.log(value);
    },
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
        questionText: "added Code question",
        scorePerTest: 0,
        noTests: 0,
        input: "'''function(s) signature(s)'''",
        test: "'''copy and paste your python test in here'''"
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
