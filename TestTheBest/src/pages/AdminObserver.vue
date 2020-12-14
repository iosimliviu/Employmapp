<template>
  <q-page>
    <div class="cardSection q-pa-md">
      <q-card class="formCard">
        <q-card-section class="q-pa-lg">
          <q-input v-model="signup.firstName" type="text" label="First name" />
          <q-input v-model="signup.lastName" type="text" label="Last name" />
          <q-input v-model="signup.email" type="email" label="Email" />
          <q-input v-model="signup.password" type="password" label="Password" />
        </q-card-section>
        <q-card-actions class="col" align="center">
          <q-btn
            class="roundCorners q-pa-xs"
            @click="signUpObserver"
            color="primary"
            label="REGISTER OBSERVER"
          />
        </q-card-actions>
      </q-card>
    </div>

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
        email: "",
        firstName: "",
        lastName: ""
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

<style scoped>
.cardSection {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.formCard {
  width: 40%;
  max-width: 1500px;
  border-radius: 25px;
}

.roundCorners {
  border-radius: 25px;
}

@media only screen and (max-width: 800px) {
  .formCard {
    width: 95%;
    border-radius: 25px;
  }
}
</style>
