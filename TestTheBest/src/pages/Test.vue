<template>
  <div>
    <p>TEST PAGE</p>
    <div id="app">
      <MonacoEditor
        width="800"
        height="500"
        theme="vs-dark"
        language="javascript"
        :options="options"
        @change="onChange"
      ></MonacoEditor>
    </div>
  </div>
</template>
<script>
import MonacoEditor from "monaco-editor-vue";
export default {
  name: "Test",
  components: {
    MonacoEditor
  },
  data() {
    return {
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