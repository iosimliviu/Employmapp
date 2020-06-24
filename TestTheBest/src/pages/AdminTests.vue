<template>
  <q-page>
    <div class="q-ma-lg column items-center">
      <q-btn
        class="addTest"
        @click="goToCreate"
        label="add TEST"
        color="primary"
        size="xl"
      />
    </div>
    <TestCardsAdmin />
  </q-page>
</template>

<style scoped>
.addTest {
  border-radius: 25px;
}
</style>

<script>
import { colors } from "quasar";
colors.setBrand("light1", "#F0F4EF");
colors.setBrand("light2", "#ADB6C4");

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
