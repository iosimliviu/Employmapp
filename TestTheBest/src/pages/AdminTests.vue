<template>
  <q-page>
    <p>Cres Ca aici fac mare admin tests page in viitor</p>

    <q-btn @click="goToCreate" label="add TEST" color="primary" />

    <TestCardsAdmin />
  </q-page>
</template>

<script>
import { LocalStorage } from "quasar";
import TestCardsAdmin from "../components/Tests/TestCardsAdmin.vue";

export default {
  name: "AdminTests",
  data() {
    return { updComponent: 0 };
  },
  components: {
    TestCardsAdmin
  },
  methods: {
    goToCreate() {
      this.$router.push("/create");
    }
  },
  beforeMount() {
    if (!LocalStorage.getItem("loggedIn")) {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped></style>
