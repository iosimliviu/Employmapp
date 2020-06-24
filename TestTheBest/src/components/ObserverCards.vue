<template>
  <div class="container row">
    <q-card
      v-for="observer in getObservers"
      :key="observer.id"
      :observer="observer"
      class="card q-ma-lg bg-light1"
    >
      <q-card-section horizontal>
        <q-img
          class="wave col-5"
          alt="wave"
          :src="require(`../assets/waveSvgs/wave${getRandomInt(10)}.svg`)"
        />
        <div class="col column item-start">
          <q-card-section class="text-h5">
            {{ observer.lastName }} {{ observer.firstName }}
          </q-card-section>
          <q-card-section>
            {{ observer.email }}
          </q-card-section>
          <q-card-actions align="around">
            <q-btn
              @click="onItemClick(observer)"
              color="primary"
              size="24px"
              flat
              >delete observer</q-btn
            >
          </q-card-actions>
        </div>
      </q-card-section>
      <q-dialog v-model="alert">
        <q-card style="border-radius:25px">
          <q-card-section class="row">
            <div class="q-pr-lg text-h6">
              Delete observer
            </div>
            <q-space />
            <q-btn v-close-popup dense flat rounded icon="close" />
          </q-card-section>
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
              size="lg"
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
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
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
  border-radius: 25px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 800px) {
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
