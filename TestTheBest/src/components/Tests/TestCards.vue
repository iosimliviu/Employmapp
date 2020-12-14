<template>
  <div class="container row">
    <q-card
      v-for="test in getTestsMetadata"
      :key="test.id"
      :test="test"
      class="card q-ma-lg bg-light1"
    >
      <q-card-section horizontal>
        <q-img
          class="wave col-5"
          alt="wave"
          :src="require(`../../assets/waveSvgs/wave${getRandomInt(10)}.svg`)"
        />
        <div class="col column item-start">
          <div class="q-mb-sm col-3 row text-h5">
            <q-card-section class="testName">
              {{ test.name }}
            </q-card-section>
            <q-space />
            <q-card-section>
              <q-chip color="primary" icon="schedule" text-color="white">{{
                formattedTotalTime(test.duration)
              }}</q-chip>
            </q-card-section>
          </div>
          <q-card-section class="col">
            {{ test.description }}
          </q-card-section>

          <q-btn
            v-if="!isDone(test.id)"
            @click="goTest(test.id)"
            class="col-4  deleteSection"
            type="submit"
            color="primary"
            size="24px"
            flat
            >Take Test</q-btn
          >
          <q-btn
            v-else
            @click="onItemClick(test)"
            class="col-4  deleteSection"
            type="submit"
            color="primary"
            size="24px"
            flat
            >Take Test</q-btn
          >
        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="doneDialog">
      <q-card style="border-radius:25px">
        <q-card-section class="row">
          <div class="q-pr-lg text-h6">
            Test already taken
          </div>
          <q-space />
          <q-btn v-close-popup dense flat rounded icon="close" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card-section class="testInfoCardSection">
            <p class="text-h6">
              Finished at: {{ resultsInfo.finishedAt | formatDate }}
            </p>
            <p class="text-h6">
              Theoretical questions:
              {{ resultsInfo.noCorrect - resultsInfo.noIncorrect }}/{{
                resultsInfo.noCorrect
              }}
            </p>
            <p class="text-h6">
              Code questions: {{ resultsInfo.noPassedTests }}/{{
                resultsInfo.noTotalTests
              }}
            </p>
          </q-card-section>
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
import moment from "moment";

export default {
  name: "TestCards",
  data() {
    return {
      doneDialog: false,
      resultsInfo: {}
    };
  },
  filters: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY hh:mm:ss");
      }
    }
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
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    formattedTotalTime(duration) {
      const totalTime = duration;
      const minutes = Math.floor(totalTime / 60);
      let seconds = totalTime % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
    },
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
.testName {
  max-width: 50%;
}
.testInfoCardSection {
  border-radius: 25px 25px 25px 25px;
  background-color: #f0f4ef;
}
.card {
  width: 35%;
  height: 100%;
  border-radius: 25px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 1150px) {
  .card {
    width: 80%;
    border-radius: 25px;
  }

  .wave {
    display: none;
  }

  .container {
    height: 50%;
  }
}
</style>
