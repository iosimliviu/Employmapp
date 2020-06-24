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
          <div class="q-mb-md col-3 row text-h5">
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
            @click="onItemClick(test)"
            class="col-4  deleteSection"
            color="primary"
            size="24px"
            flat
            >delete test</q-btn
          >
        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="alert">
      <q-card style="border-radius:25px">
        <q-card-section class="row">
          <div class="q-pr-lg text-h6">
            Delete test
          </div>
          <q-space />
          <q-btn v-close-popup dense flat rounded icon="close" />
        </q-card-section>
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
            size="lg"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style>
.testName {
  max-width: 100px;
}
.deleteSection {
  border-radius: 0 0 25px 0;
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

<script>
import { colors } from "quasar";
colors.setBrand("light1", "#F0F4EF");
colors.setBrand("light2", "#ADB6C4");

import { mapGetters, mapActions } from "vuex";

export default {
  name: "TestCardsAdmin",
  data() {
    return {
      alert: false,
      selectedTestInfo: {}
    };
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
