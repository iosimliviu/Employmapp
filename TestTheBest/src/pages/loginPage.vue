<template>
  <q-page class="bg-image flex flex-center">
    <div class="container row bg-light1">
      <div class="description-area col">
        <h3 class="text-rubik q-ma-lg">Navigate your career.</h3>
      </div>
      <div class="login-area col">
        <q-card class="login-card bg-accent">
          <div class="column items-center">
            <img
              class="logo col"
              alt="Employmapp"
              src="../assets/Employmapp-01.png"
            />
          </div>
          <q-tabs v-model="tab">
            <q-tab label="Login" style="color: white;" name="one" />
            <q-tab label="Register" style="color: white;" name="two" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="one">
              <q-input v-model="login.email" type="email" label="Email" />
              <q-input
                v-model="login.password"
                type="password"
                label="Password"
              />

              <q-btn
                @click="onLogin"
                class="roundCorners"
                color="primary q-mt-sm"
                label="Log In"
                size="lg"
              />
            </q-tab-panel>

            <q-tab-panel name="two">
              <q-input
                v-model="signup.firstName"
                type="text"
                label="First name"
              />
              <q-input
                v-model="signup.lastName"
                type="text"
                label="Last name"
              />
              <q-input v-model="signup.email" type="email" label="Email" />
              <q-input v-model="signup.phone" type="phone" label="Phone" />
              <q-input
                v-model="signup.password"
                type="password"
                label="Password"
              />
              <div class="q-pa-md ">
                <q-uploader
                  class="uploader"
                  label="Upload Resume"
                  :factory="factoryFn"
                  :field-name="'CV_' + signup.firstName + '_' + signup.lastName"
                  batch
                ></q-uploader>
              </div>
              <q-btn
                class="roundCorners"
                @click="signUp"
                color="primary"
                label="Sign Up"
                size="lg"
              />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { colors } from "quasar";
colors.setBrand("light1", "#F0F4EF");
colors.setBrand("light2", "#ADB6C4");

import { LocalStorage } from "quasar";
export default {
  name: "LoginPage",
  data() {
    return {
      tab: "one",
      signup: {
        password: "",
        email: "",
        phone: "",
        firstName: "fname",
        lastName: "lname"
      },
      login: {
        password: "",
        email: ""
      }
    };
  },
  beforeMount() {
    if (LocalStorage.getItem("loggedIn")) {
      if (LocalStorage.getItem("isAdmin")) {
        this.$router.push("/admin");
      } else {
        this.$router.push("/landing");
      }
    }
  },
  methods: {
    async factoryFn(files) {
      return {
        url: `http://localhost:8080/api/users/upload/${this.signup.lastName}/${this.signup.firstName}`,
        method: "POST"
      };
    },
    signUp() {
      this.$axios
        .post("/api/users/register", this.signup)
        .then(response => {
          console.log(response.data);
          this.$q.notify({
            color: "green",
            message: response.data.message,
            icon: "arrow_forward"
          });
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: error.response.data.message,
            icon: "report_problem"
          });
        });
    },
    onLogin() {
      this.$axios
        .post("/api/auth/login", {
          email: this.login.email,
          password: this.login.password
        })
        .then(response => {
          console.log(response.data);
          this.$q.notify({
            color: "green",
            message: response.data.message,
            icon: "arrow_forward"
          });
          LocalStorage.set("loggedIn", true);
          LocalStorage.set("userId", response.data.details.id);
          LocalStorage.set("isAdmin", response.data.details.isAdmin);
          if (response.data.details.isAdmin) {
            this.$router.push("/admin");
          } else if (response.data.details.isObserver) {
            this.$router.push("/observer");
          } else {
            this.$router.push("/landing");
          }
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: error.response.data.message,
            icon: "report_problem"
          });
        });
    }
  }
};

//background-image: url(../assets/waveUp.svg);
</script>

<style scoped>
.roundCorners {
  border-radius: 25px;
}

.loginPageButtons {
  margin: auto;
}

.uploader {
  margin: auto;
  width: 70%;
}

.logo {
  width: 80%;
  align-items: center;
}

.bg-image {
  background-image: url(../assets/topography.svg);
  background-size: contain;
  background-color: #f0f4ef;
}

.container {
  border-radius: 25px;
  width: 80%;
  height: 100%;
}

.description-area,
.login-area {
  flex-basis: 0;
  flex-grow: 1;
}

.description-area {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-area {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 2vh 12vh;
  background-color: #232323;
  border-radius: 25px;
  height: 80vh;
}
.q-tab-panel {
  background-color: #f5f5f5;
}
.card-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.q-field {
  margin-bottom: 10px;
}
.q-field--standout .q-field__control {
  margin-bottom: 10px;
}
@media only screen and (max-width: 700px) {
  .uploader {
    width: 100%;
  }

  .description-area {
    display: none;
  }
  .login-card {
    width: 100%;
    height: 100%;
    padding: 2vh;
  }
}

@media only screen and (max-width: 1150px) {
  .login-card {
    padding: 2vh;
  }
}
</style>
