<template>
  <div class="codeQuestion">
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
</template>

<script>
import MonacoEditor from "monaco-editor-vue";

export default {
  name: "CodeQuestions",
  props: {
    info: {
      type: Object
    }
  },
  components: {
    MonacoEditor
  },
  data() {
    return {
      guidanceData: "Passed 2 out of 2",
      options: {
        //Monaco Editor Options
      }
    };
  },
  methods: {
    onChange(value) {
      console.log(value);
    }
  }
};
</script>

<style scoped>
.codeQuestion {
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
