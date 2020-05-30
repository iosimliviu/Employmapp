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
            <q-btn
              v-if="!isDone(test.id)"
              @click="goTest(test.id)"
              type="submit"
              color="secondary"
              size="24px"
              flat
              >Take Test</q-btn
            >
            <q-btn
              v-else
              @click="onItemClick(test)"
              type="submit"
              color="secondary"
              size="24px"
              flat
              >Take Test</q-btn
            >
          </q-card-actions>
        </q-card-section>
      </q-card-section>
    </q-card>

    <q-dialog v-model="doneDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Test already takken</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ resultsInfo }}
          <br />
          You better lose yourself in the music, the moment<br />You own it, you
          better never let it go<br />You only get one shot, do not miss your
          chance to blow<br />This opportunity comes once in a lifetime
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { LocalStorage } from "quasar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TestCards",
  data() {
    return {
      doneDialog: false,
      resultsInfo: {}
    };
  },
  computed: {
    ...mapGetters([
      "getTestsMetadata",
      "getTestById",
      "getUserTestsByUserId",
      "getUserTestByTestId"
    ])
  },
  methods: {
    onItemClick(test) {
      this.doneDialog = true;
      let userTests = this.getUserTestsByUserId(LocalStorage.getItem("userId"));
      if (userTests.find(userTest => userTest.testId === test.id)) {
        this.resultsInfo = userTests.find(
          userTest => userTest.testId === test.id
        );
      }
    },
    isDone(testId) {
      let userTests = this.getUserTestsByUserId(LocalStorage.getItem("userId"));
      if (userTests.find(userTest => userTest.testId === testId)) {
        return userTests.find(userTest => userTest.testId === testId).done;
      }
      return false;
    },
    goTest(test_id) {
      console.log(test_id);
      this.$router.push(`/test?id=${test_id}`);
    },
    ...mapActions(["fetchTestsMetadata", "fetchUserTests"])
  },
  beforeMount() {
    //console.log(this.$route.query.id);
    this.fetchTestsMetadata();
    this.fetchUserTests();
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
