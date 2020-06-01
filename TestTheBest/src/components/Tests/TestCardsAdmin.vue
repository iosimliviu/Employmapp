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
            <q-btn @click="onItemClick(test)" color="secondary" size="24px" flat
              >delete test</q-btn
            >
          </q-card-actions>
        </q-card-section>
      </q-card-section>
      <q-dialog v-model="alert">
        <q-card>
          <q-card-section class="q-pt-none">
            Are you sure you want to delete "{{ selectedTestInfo.name }}" test?
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              @click="deleteTestsMetadataById(selectedTestInfo.id)"
              type="submit"
              flat
              label="DELETE"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TestCardsAdmin",
  data() {
    return { alert: false, selectedTestInfo: {} };
  },
  methods: {
    onItemClick(testInfo) {
      this.alert = true;
      this.selectedTestInfo = testInfo;
    },
    goDataForTest(test_id) {
      this.$axios
        .get(`/api/tests/data/${test_id}`)
        .then(response => (this.testInfo = response.data))
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: "Something went wrong with the server, try again later",
            icon: "report_problem"
          });
        });
      return this.testInfo;
    },
    ...mapActions(["fetchTestsMetadata", "deleteTestsMetadataById"])
  },
  computed: {
    ...mapGetters(["getTestsMetadata"])
  },
  beforeMount() {
    console.log(this.$route.query.id);
    this.fetchTestsMetadata();
  },
  beforeCreate() {
    console.log(this.$route.query.id);
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
