<template>
  <q-page>
    <p>ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN</p>

    <div class="q-ma-lg">
      <q-table
        ref="myTable"
        :class="tableClass"
        tabindex="0"
        title="Treats"
        :data="getUsers"
        :columns="columns"
        row-key="id"
        selection="single"
        :selected.sync="selected"
        :pagination.sync="pagination"
        :filter="filter"
        class="bg-grey-3"
      >
        <template v-slot:top-right>
          <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
            class="q-mr-lg"
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
    <div v-if="selected.length !== 0" class="q-mt-md">
      <q-card v-if="fetchFeedbackByUserId(selected[0].id)" class="my-card">
        <q-card-section>
          {{ selected[0].lastName }} {{ selected[0].firstName }}
          <br />
          <q-rating
            v-model="fetchFeedbackByUserId(selected[0].id).cvRating"
            size="3em"
            color="brown-5"
            icon="pets"
          /><br />
          {{ fetchFeedbackByUserId(selected[0].id).cvFeedback }}<br />
          <q-rating
            v-model="fetchFeedbackByUserId(selected[0].id).interviewRating"
            size="3em"
            color="brown-5"
            icon="pets"
          /><br />
          {{ fetchFeedbackByUserId(selected[0].id).interviewFeedback }}<br />
          {{ fetchFeedbackByUserId(selected[0].id).mention }}<br />
          <q-btn
            color="primary"
            label="UPDATE FEEDBACK"
            @click="prepareforUpdate"
          />
          <q-btn
            color="primary"
            label="DELETE FEEDBACK"
            type="submit"
            @click="deleteFeedback(fetchFeedbackByUserId(selected[0].id).id)"
          />
          <q-dialog v-model="feedbackUpdateDialog">
            <q-card>
              <form>
                <q-card-section>
                  <div class="row q-mb-sm">
                    <q-rating
                      v-model="feedbackToUpdate.cvRating"
                      size="1.5em"
                      icon="thumb_up"
                    />
                  </div>
                  <div class="row q-mb-sm">
                    <q-input
                      outlined
                      v-model="feedbackToUpdate.cvFeedback"
                      label="CV Feedback"
                      name="cvFeedback"
                      autofocus
                      class="col"
                      clearable
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                  <div class="row q-mb-sm">
                    <q-rating
                      v-model="feedbackToUpdate.interviewRating"
                      size="1.5em"
                      icon="thumb_up"
                    />
                  </div>
                  <div class="row q-mb-sm">
                    <q-input
                      outlined
                      v-model="feedbackToUpdate.interviewFeedback"
                      label="Interview Feedback"
                      name="interviewFeedback"
                      class="col"
                      clearable
                      :rules="[val => !!val || 'Field is required']"
                    />
                  </div>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    @click="submitUpdateFeedback()"
                    clickable
                    label="Save"
                    color="primary"
                    type="submit"
                  />
                </q-card-actions>
              </form>
            </q-card>
          </q-dialog>
        </q-card-section>
      </q-card>
      <q-card v-else class="my-card">
        <q-card-section>
          USER HAS NO FEEDBACK<br />
          <q-btn
            color="primary"
            label="ADD FEEDBACK"
            @click="feedbackDialog = true"
          />
        </q-card-section>
        <q-dialog v-model="feedbackDialog">
          <q-card>
            <form>
              <q-card-section>
                <div class="row q-mb-sm">
                  <q-rating
                    v-model="feedbackToSubmit.cvRating"
                    size="1.5em"
                    icon="thumb_up"
                  />
                </div>
                <div class="row q-mb-sm">
                  <q-input
                    outlined
                    v-model="feedbackToSubmit.cvFeedback"
                    label="CV Feedback"
                    name="cvFeedback"
                    autofocus
                    class="col"
                    clearable
                    :rules="[val => !!val || 'Field is required']"
                  />
                </div>
                <div class="row q-mb-sm">
                  <q-rating
                    v-model="feedbackToSubmit.interviewRating"
                    size="1.5em"
                    icon="thumb_up"
                  />
                </div>
                <div class="row q-mb-sm">
                  <q-input
                    outlined
                    v-model="feedbackToSubmit.interviewFeedback"
                    label="Interview Feedback"
                    name="interviewFeedback"
                    class="col"
                    clearable
                    :rules="[val => !!val || 'Field is required']"
                  />
                </div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  @click="submitFeedback()"
                  clickable
                  type="submit"
                  label="Save"
                  color="primary"
                />
              </q-card-actions>
            </form>
          </q-card>
        </q-dialog>
      </q-card>
    </div>
    <div v-else>
      <q-card class="my-card">
        <q-card-section>
          SELECT A USER
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { exportFile } from "quasar";
import { mapGetters, mapActions } from "vuex";
import { LocalStorage } from "quasar";

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

  computed: {
    tableClass() {
      return this.navigationActive === true ? "shadow-8 no-outline" : void 0;
    },
    getUsers() {
      return this.$store.getters["data/getUsers"];
    },
    ...mapGetters(["fetchFeedbackByUserId"])
  },
  methods: {
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
      "fetchFeedbacks",
      "addFeedback",
      "updateFeedback",
      "deleteFeedback"
    ])
  },
  beforeMount() {
    this.$store.dispatch("data/fetchUsers");
    this.fetchFeedbacks();

    if (!LocalStorage.getItem("loggedIn")) {
      this.$router.push("/login");
    }
  }
};
</script>
