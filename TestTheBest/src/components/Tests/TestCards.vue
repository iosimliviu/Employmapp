<template>
  <div class="container row">
    <q-card
      v-for="test in getTestsMetadata"
      :key="test.id"
      :test="test"
      class="card q-ma-lg"
      flat
      bordered
    >
      <q-card-section horizontal>
        <q-img class="col-5" :src="test.image" />
        <q-card-section>
          {{ test.name }}
          <q-separator dark inset />
          {{ test.description }}
          <q-separator dark inset />
          {{ test.duration }}
          <q-card-actions align="around">
            <q-btn color="secondary" size="24px" flat>Take Test</q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "TestCards",
  // methods: {
  //   ...mapActions(["fetchTestsMetadata"])
  // },
  computed: {
    getTestsMetadata(){
        return this.$store.getters["data/getTestsMetadata"]
    }    
  },
  beforeMount() {
      this.$store.dispatch("data/fetchTestsMetadata");
  }
};
</script>

<style>
.card {
  width: 35%;
  height: 100%;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>