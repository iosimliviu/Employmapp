<template>
  <div class="container row">
    <q-card
      v-for="observer in getObservers"
      :key="observer.id"
      :observer="observer"
      class="card q-ma-lg"
      flat
      bordered
    >
      <q-card-section horizontal>
        <q-card-section>
          {{ observer.lastName }}
          <q-separator dark inset />
          {{ observer.firstName }}
          <q-separator dark inset />
          {{ observer.email }}
          <q-card-actions align="around">
            <q-btn
              @click="onItemClick(observer)"
              color="secondary"
              size="24px"
              flat
              >delete observer</q-btn
            >
          </q-card-actions>
        </q-card-section>
      </q-card-section>
      <q-dialog v-model="alert">
        <q-card>
          <q-card-section class="q-pt-none">
            Are you sure you want to delete observer "{{
              selectedObserver.lastName
            }}
            {{ selectedObserver.firstName }}"?
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              @click="deleteUser(selectedObserver.id)"
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
  name: "ObserverCards",
  data() {
    return { alert: false, selectedObserver: {} };
  },
  methods: {
    onItemClick(observer) {
      this.alert = true;
      this.selectedObserver = observer;
    },
    ...mapActions(["fetchUsers", "deleteUser"])
  },
  computed: {
    ...mapGetters(["getObservers", "getUsers"])
  },
  beforeMount() {
    this.fetchUsers();
    console.log(this.fetchUsers());
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
