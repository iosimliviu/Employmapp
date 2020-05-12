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
        @focusin.native="activateNavigation"
        @focusout.native="deactivateNavigation"
        @keydown.native="onKey"
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
      <q-card class="my-card">
        <q-card-section>
          {{ selected[0].lastName }} {{ selected[0].firstName }}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { exportFile } from "quasar";

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
      alert: false,
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
    }
  },
  methods: {
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
    activateNavigation() {
      this.navigationActive = true;
    },

    deactivateNavigation() {
      this.navigationActive = false;
    },

    onKey(evt) {
      if (
        this.navigationActive !== true ||
        [33, 34, 35, 36, 38, 40].indexOf(evt.keyCode) === -1 ||
        this.$refs.myTable === void 0
      ) {
        return;
      }

      evt.preventDefault();

      const { rowsNumber, rows } = this.$refs.myTable.computedData;

      if (rows.length === 0) {
        return;
      }

      const currentIndex =
        this.selected.length > 0 ? rows.indexOf(this.selected[0]) : -1;
      const currentPage = this.pagination.page;
      const rowsPerPage =
        this.pagination.rowsPerPage === 0
          ? rowsNumber
          : this.pagination.rowsPerPage;
      const lastIndex = rows.length - 1;
      const lastPage = Math.ceil(rowsNumber / rowsPerPage);

      let index = currentIndex;
      let page = currentPage;

      switch (evt.keyCode) {
        case 36: // Home
          page = 1;
          index = 0;
          break;
        case 35: // End
          page = lastPage;
          index = rowsPerPage - 1;
          break;
        case 33: // PageUp
          page = currentPage <= 1 ? lastPage : currentPage - 1;
          if (index < 0) {
            index = 0;
          }
          break;
        case 34: // PageDown
          page = currentPage >= lastPage ? 1 : currentPage + 1;
          if (index < 0) {
            index = rowsPerPage - 1;
          }
          break;
        case 38: // ArrowUp
          if (currentIndex <= 0) {
            page = currentPage <= 1 ? lastPage : currentPage - 1;
            index = rowsPerPage - 1;
          } else {
            index = currentIndex - 1;
          }
          break;
        case 40: // ArrowDown
          if (currentIndex >= lastIndex) {
            page = currentPage >= lastPage ? 1 : currentPage + 1;
            index = 0;
          } else {
            index = currentIndex + 1;
          }
          break;
      }

      if (page !== this.pagination.page) {
        this.pagination = {
          ...this.pagination,
          page
        };

        this.$nextTick(() => {
          const { rows } = this.$refs.myTable.computedData;
          this.selected = [rows[Math.min(index, rows.length - 1)]];
        });
      } else {
        this.selected = [rows[index]];
      }
    }
  },
  beforeMount() {
    this.$store.dispatch("data/fetchUsers");
  }
};
</script>
