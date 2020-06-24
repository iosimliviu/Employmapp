<template>
  <q-page>
    <div class="q-ma-lg column items-center">
      <q-table
        :class="tableClass"
        tabindex="0"
        title="Applicants"
        :data="getApplicants"
        :columns="columns"
        row-key="id"
        selection="single"
        :selected.sync="selected"
        :pagination.sync="pagination"
        :filter="filter"
        class="adminTable bg-light1 column item-center"
      >
        <template v-slot:top-right>
          <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
            class="q-mr-lg roundCorners"
          />

          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
    <div v-if="selected.length !== 0" class="q-ma-md row justify-center">
      <q-card v-if="fetchFeedbackByUserId(selected[0].id)" class="feedbackCard">
        <q-card-section class="q-pa-lg">
          <q-list>
            <p>
              <b
                >Feedback for {{ selected[0].lastName }}
                {{ selected[0].firstName }}</b
              >
            </p>
            <q-item>
              <q-item-section>
                CV rating:
              </q-item-section>
              <q-item-section>
                <q-rating
                  v-model="fetchFeedbackByUserId(selected[0].id).cvRating"
                  size="2em"
                  color="primary"
                  icon="fiber_manual_record"
                  readonly
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                CV Feedback:
              </q-item-section>
            </q-item>
            <q-item
              class="resultList rounded-borders shadow-box"
              :class="`shadow-1`"
            >
              <q-item-section>
                {{ fetchFeedbackByUserId(selected[0].id).cvFeedback }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Interview rating:
              </q-item-section>
              <q-item-section>
                <q-rating
                  v-model="
                    fetchFeedbackByUserId(selected[0].id).interviewRating
                  "
                  size="2em"
                  color="primary"
                  icon="fiber_manual_record"
                  readonly
                /> </q-item-section
            ></q-item>
            <q-item>
              <q-item-section>
                Interview Feedback:
              </q-item-section>
            </q-item>
            <q-item
              class="resultList rounded-borders shadow-box"
              :class="`shadow-1`"
            >
              {{ fetchFeedbackByUserId(selected[0].id).interviewFeedback }}
            </q-item>
            <q-item>
              <q-item-section>
                Other Mentions:
              </q-item-section>
            </q-item>
            <q-item
              class="resultList rounded-borders shadow-box"
              :class="`shadow-1`"
            >
              {{ fetchFeedbackByUserId(selected[0].id).mention }}</q-item
            >
          </q-list>
          <div class="row justify-center">
            <q-btn
              class="q-ma-lg col-12 col-md-3 roundCorners"
              color="primary"
              label="UPDATE FEEDBACK"
              @click="prepareforUpdate"
            />
            <q-btn
              class="q-ma-lg col-12 col-md-3 roundCorners"
              color="grey-9"
              label="DELETE FEEDBACK"
              type="submit"
              @click="deleteFeedback(fetchFeedbackByUserId(selected[0].id).id)"
            />
          </div>

          <q-dialog v-model="feedbackUpdateDialog">
            <q-card class="feedbackDialog">
              <q-card-section class="row">
                <div class="q-pr-lg text-h6">
                  Feedback form
                </div>
                <q-space />
                <q-btn v-close-popup dense flat rounded icon="close" />
              </q-card-section>
              <form>
                <q-card-section class="q-pa-lg">
                  <div class="row q-mb-sm">
                    <p class="row q-mr-lg">CV Rating:</p>
                    <q-rating
                      v-model="feedbackToUpdate.cvRating"
                      size="2em"
                      color="primary"
                      icon="fiber_manual_record"
                      autofocus
                    />
                  </div>
                  <div class="row q-mb-lg">
                    <q-input
                      type="textarea"
                      v-model="feedbackToUpdate.cvFeedback"
                      label="CV Feedback"
                      name="cvFeedback"
                      class="col"
                      clearable
                    />
                  </div>
                  <div class="row q-mb-sm">
                    <p class="row q-mr-lg">Interview Rating:</p>
                    <q-rating
                      v-model="feedbackToUpdate.interviewRating"
                      size="2em"
                      color="primary"
                      icon="fiber_manual_record"
                    />
                  </div>
                  <div class="row q-mb-sm">
                    <q-input
                      type="textarea"
                      v-model="feedbackToUpdate.interviewFeedback"
                      label="Interview Feedback"
                      name="interviewFeedback"
                      class="col"
                      clearable
                    />
                  </div>
                  <div class="row q-mb-sm">
                    <q-input
                      type="textarea"
                      v-model="feedbackToUpdate.mention"
                      label="Other mentions"
                      name="mention"
                      class="col"
                      clearable
                    />
                  </div>
                </q-card-section>
                <div class="q-pa-lg row justify-center">
                  <q-btn
                    class="q-ma-lg col-12 col-md-3 roundCorners"
                    color="primary"
                    label="Save"
                    @click="submitUpdateFeedback()"
                    type="submit"
                  />
                  <q-btn
                    v-close-popup
                    class="q-ma-lg col-12 col-md-3 roundCorners"
                    color="grey-9"
                    label="Cancel"
                  />
                </div>
              </form>
            </q-card>
          </q-dialog>
        </q-card-section>
      </q-card>
      <q-card v-else class="feedbackCard column items-center">
        <q-card-section class="column items-center">
          <div class="text-h6">
            APPLICANT HAS NO FEEDBACK
          </div>
        </q-card-section>
        <q-card-section class="column items-center">
          <q-btn
            class="roundCorners"
            color="primary"
            label="ADD FEEDBACK"
            @click="feedbackDialog = true"
          />
        </q-card-section>
        <q-card-section class="column items-center">
          <img
            style="width:42%"
            src="../assets/undraw_empty_xct9.svg"
            alt="APPLICANT HAS NO FEEDBACK"
          />
        </q-card-section>
        <q-dialog v-model="feedbackDialog">
          <q-card class="feedbackDialog">
            <q-card-section class="row">
              <div class="q-pr-lg text-h6">
                Feedback form
              </div>
              <q-space />
              <q-btn v-close-popup dense flat rounded icon="close" />
            </q-card-section>
            <form>
              <q-card-section class="q-pa-lg">
                <div class="row q-mb-sm">
                  <p class="row q-mr-lg">CV Rating:</p>
                  <q-rating
                    v-model="feedbackToSubmit.cvRating"
                    size="2em"
                    color="primary"
                    icon="fiber_manual_record"
                    autofocus
                  />
                </div>
                <div class="row q-mb-lg">
                  <q-input
                    type="textarea"
                    v-model="feedbackToSubmit.cvFeedback"
                    label="CV Feedback"
                    name="cvFeedback"
                    class="col"
                    clearable
                  />
                </div>
                <div class="row q-mb-sm">
                  <p class="row q-mr-lg">Interview Rating:</p>
                  <q-rating
                    v-model="feedbackToSubmit.interviewRating"
                    size="2em"
                    color="primary"
                    icon="fiber_manual_record"
                  />
                </div>
                <div class="row q-mb-sm">
                  <q-input
                    type="textarea"
                    v-model="feedbackToSubmit.interviewFeedback"
                    label="Interview Feedback"
                    name="interviewFeedback"
                    class="col"
                    clearable
                  />
                </div>
                <div class="row q-mb-sm">
                  <q-input
                    type="textarea"
                    v-model="feedbackToSubmit.mention"
                    label="Other mentions"
                    name="mention"
                    class="col"
                    clearable
                  />
                </div>
              </q-card-section>
              <div class="q-pa-lg row justify-center">
                <q-btn
                  class="q-ma-lg col-12 col-md-3 roundCorners"
                  @click="submitFeedback()"
                  clickable
                  type="submit"
                  label="Save"
                  color="primary"
                />
                <q-btn
                  v-close-popup
                  class="q-ma-lg col-12 col-md-3 roundCorners"
                  color="grey-9"
                  label="Cancel"
                />
              </div>
            </form>
          </q-card>
        </q-dialog>
      </q-card>
      <q-card
        v-if="getUserTestsByUserId(selected[0].id).length != 0"
        class="resultCard"
      >
        <q-card-section v-for="(pair, i) in pairs" :key="i + 'r'" class="row">
          <q-card-section class="result col">
            <p><b>RESULT:</b></p>
            <q-list
              class="resultList rounded-borders shadow-box"
              :class="`shadow-3`"
            >
              <q-item>
                <q-item-section>Final test score:</q-item-section>
                <q-item-section side class="stats">
                  {{ pair.resultData.result }}/{{
                    pair.testData.maxScore
                  }}</q-item-section
                >
              </q-item>

              <q-item>
                <q-item-section>
                  Correct answers:
                </q-item-section>
                <q-item-section side class="stats">
                  {{
                    pair.resultData.noCorrect - pair.resultData.noIncorrect
                  }}/{{ pair.resultData.noCorrect }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  Passed unit tests:
                </q-item-section>
                <q-item-section side class="stats">
                  {{ pair.resultData.noPassedTests }}/{{
                    pair.resultData.noTotalTests
                  }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Started at:</q-item-section>
                <q-item-section side class="stats">{{
                  pair.resultData.startedAt | formatDate
                }}</q-item-section>
              </q-item>
              <q-item
                ><q-item-section>Finished at:</q-item-section>
                <q-item-section side class="stats">{{
                  pair.resultData.finishedAt | formatDate
                }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section class="test col">
            <p><b>TEST:</b></p>
            <q-list class="rounded-borders" dense>
              <q-item v-ripple>
                <q-item-section>{{ pair.testData.test.name }}</q-item-section>
              </q-item>
              <q-item v-ripple>
                <q-item-section
                  ><p>
                    {{ pair.testData.test.description }}
                  </p></q-item-section
                >
              </q-item>
              <q-item>
                <q-item-section
                  ><p>
                    Max score: <b>{{ pair.testData.maxScore }}</b>
                  </p></q-item-section
                >
              </q-item>
              <q-item v-ripple>
                <q-item-section
                  ><p>
                    Time:
                    <b>{{ formattedTotalTime(pair.testData.test.duration) }}</b>
                  </p></q-item-section
                >
              </q-item>
              <q-item v-ripple>
                <q-item-section>
                  <p>
                    Type: <b>{{ pair.testData.test.type }}</b>
                  </p>
                </q-item-section>
              </q-item>
              <q-item v-ripple>
                <q-item-section>
                  <p>
                    <b>TID {{ pair.resultData.testId }}</b>
                  </p>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card v-else class="resultCard column items-center justify-center">
        <q-card-section class="column items-center">
          <div class="q-mb-lg text-h6">
            APPLICANT HAS NOT TAKEN ANY TEST YET
          </div>
        </q-card-section>
        <q-card-section class="column items-center ">
          <img
            class="noDataImg"
            src="../assets/undraw_programming_2svr.svg"
            alt="User has not taken any tests"
          />
        </q-card-section>
      </q-card>
    </div>
    <div v-else>
      <q-card class="q-ma-lg noSelection column items-center justify-center">
        <q-card-section class="column items-center">
          <div class="text-h4">
            SELECT AN APPLICANT!
          </div>
        </q-card-section>
        <q-card-section class="column items-center">
          <img
            class="noSelectionImg"
            src="../assets/undraw_selection_92i4.svg"
            alt="SELECT AN APPLICANT!"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped>
.roundCorners {
  border-radius: 25px;
}

.noSelection {
  border-radius: 25px;
}

.noSelectionImg {
  width: 80%;
}

.noDataImg {
  width: 50%;
}

.adminTable {
  width: 60%;
  border-radius: 25px;
}

.resultCard {
  width: 50%;
  border-radius: 25px;
}

.feedbackCard {
  width: 50%;
  border-radius: 25px;
}

.feedbackDialog {
  width: 60%;
  max-width: 1500px;
  border-radius: 25px;
}

.stats {
  color: #000;
  font-weight: bold;
}

.resultList {
  background-color: #f0f4ef;
}

@media only screen and (max-width: 700px) {
  .adminTable {
    width: 100%;
  }
  .feedbackDialog {
    width: 100%;
  }
}
</style>

<script>
import { colors } from "quasar";
colors.setBrand("light1", "#F0F4EF");
colors.setBrand("light2", "#ADB6C4");

import { exportFile } from "quasar";
import { mapGetters, mapActions } from "vuex";
import { LocalStorage } from "quasar";
import moment from "moment";

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

export default {
  name: "AdminHomePage",
  data() {
    return {
      testArray: [],
      isSelecting: false,
      feedbackToSubmit: {
        userId: 0,
        cvRating: 0,
        cvFeedback: "",
        interviewRating: 0,
        interviewFeedback: "",
        mention: ""
      },
      feedbackToUpdate: {},
      feedbackUpdateDialog: false,
      feedbackDialog: false,
      address: "",
      navigationActive: false,
      filter: "",
      selected: [],
      pagination: {},
      columns: [
        { name: "lastName", label: "LastName", field: "lastName" },
        { name: "firstName", label: "First Name", field: "firstName" },
        { name: "email", label: "E-mail", field: "email" },
        { name: "phone", label: "Phone", field: "phone" }
      ]
    };
  },
  filters: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY hh:mm:ss");
      }
    }
  },
  watch: {
    selected: async function(sel) {
      this.isSelecting = true;
      this.testArray = await this.getAllUserTestData();
      console.log(this.testArray);
    }
  },
  computed: {
    pairs() {
      if (this.selected[0] && this.testArray.length) {
        return this.getUserTestsByUserId(this.selected[0].id).map(
          (result, i) => {
            if (this.testArray[i])
              return {
                resultData: result,
                testData: this.testArray[i]
              };
          }
        );
      }
    },
    tableClass() {
      return this.navigationActive === true ? "shadow-8 no-outline" : void 0;
    },
    ...mapGetters([
      "getApplicants",
      "getUsers",
      "fetchFeedbackByUserId",
      "getUserTestsByUserId",
      "getTestForUserTest"
    ])
  },
  methods: {
    async getAllUserTestData() {
      let testArray = [];
      let userTestsForUser = await this.getUserTestsByUserId(
        this.selected[0].id
      );
      for (var i = 0; i < userTestsForUser.length; i++) {
        await this.fetchTestForUserTest(userTestsForUser[i].testId);
        testArray.push(this.getTestForUserTest);
      }
      return testArray;
    },
    submitFeedback() {
      this.feedbackToSubmit.userId = this.selected[0].id;
      this.addFeedback(this.feedbackToSubmit);
    },
    prepareforUpdate() {
      this.feedbackUpdateDialog = true;
      this.feedbackToUpdate = Object.assign(
        {},
        this.fetchFeedbackByUserId(this.selected[0].id)
      );
    },
    submitUpdateFeedback() {
      this.updateFeedback(this.feedbackToUpdate);
      this.feedbackUpdateDialog = false;
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
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.data.map(row =>
            this.columns
              .map(col =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("table-export.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning"
        });
      }
    },
    ...mapActions([
      "fetchUsers",
      "fetchTestForUserTest",
      "fetchUserTests",
      "fetchFeedbacks",
      "addFeedback",
      "updateFeedback",
      "deleteFeedback"
    ])
  },
  beforeMount() {
    this.fetchUsers();
    this.fetchFeedbacks();
    this.fetchUserTests();

    if (!LocalStorage.getItem("loggedIn")) {
      this.$router.push("/login");
    }
  }
};
</script>
