<template>
  <div class="no-scroll">
    <div class="container0 full-width row">
      <q-card dark bordered class="bg-grey-9 my-card col-2">
        <q-card-section>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section>
          {{ question }}
        </q-card-section>
      </q-card>
      <div class="col">
        <div class="container1 column">
          <MonacoEditor
            theme="vs-dark"
            language="python"
            :options="options"
            @change="onChange"
            class="col"
          ></MonacoEditor>
          <q-card dark bordered class="col-2 bg-grey-9 my-card">
            <q-card-section>
              <div class="text-h6">{{ info }}</div>
              <div class="absolute-top-right text-center q-mt-sm q-mr-sm">
                <q-btn color="secondary" size="24px" icon="play_arrow"
                  >Run
                </q-btn>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container0 {
  height: 94vh;
}
.container1 {
  height: 100%;
}
</style>

<script>
import MonacoEditor from "monaco-editor-vue";

export default {
  name: "Test",
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
