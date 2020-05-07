<template>
    <div class="codeQuestion q-ma-lg">
      <q-card class="question">
        <q-card-section>
          <div class="text-h6">{{ question }}</div>
           <q-btn color="primary" size="24px" >Run</q-btn>
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
          <div class="text-h6">{{ info }}</div>
        </q-card-section>
      </q-card>
    </div>
</template>

<script>
import MonacoEditor from "monaco-editor-vue";

export default {
  name: "CodeQuestions",
  components: {
    MonacoEditor
  },
  data() {
    return {
      question:
        "Find the maximum number in an array of integers. For example, in the array [1, -3, 5], the maximum number is 5.",
      info: "Passed 2 out of 2",
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
