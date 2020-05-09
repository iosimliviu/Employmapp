<template>
  <q-page>
    <p>Cres Ca aici fac mare Homepage in viitor</p>
    <TestCards />
  </q-page>
</template>

<script>
import { LocalStorage } from "quasar";
import TestCards from "../components/Tests/TestCards.vue";

export default {
  name: "HomePage",
  components: {
    TestCards
  },
  beforeMount() {
    if (!LocalStorage.getItem("loggedIn")) {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped></style>
