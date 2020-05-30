<template>
  <q-page>
    <p>OBSBSBSBSBSBSBSBS</p>
    <q-input v-model="signup.firstName" type="text" label="First name" />
    <q-input v-model="signup.lastName" type="text" label="Last name" />
    <q-input v-model="signup.email" type="email" label="Email" />
    <q-input v-model="signup.password" type="password" label="Password" />

    <q-btn @click="signUpObserver" color="primary" label="Sign Up" />

    <ObserverCards :key="updComponent" />
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
import { LocalStorage } from "quasar";
import ObserverCards from "../components/ObserverCards.vue";

export default {
  name: "AdminTests",
  data() {
    return {
      updComponent: 0,
      tab: "one",
      signup: {
        password: "",
        email: "obs@company.com",
        firstName: "Observer fname",
        lastName: "Observer lname"
      }
    };
  },
  components: { ObserverCards },
  methods: {
    signUpObserver() {
      this.addObserver({
        lastName: this.signup.lastName,
        firstName: this.signup.firstName,
        email: this.signup.email,
        password: this.signup.password,
        isObserver: 1
      });
      this.updComponent++;
    },
    ...mapActions(["addObserver"])
  },
  beforeMount() {
    if (!LocalStorage.getItem("loggedIn")) {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped></style>
