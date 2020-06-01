<template>
  <q-page class="app flex flex-center">
    <div class="container row">
      <div class="description-area col">
        <h3 class="text-rubik">Test the best</h3>
      </div>
      <div class="login-area col">
        <q-card class="login-card">
          <q-card-section class="card-section">
            <div class="img-center">
              <img
                style="width:100px; height: 100px; background "
                src="../assets/code.png"
              />
            </div>
          </q-card-section>

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

              <q-btn @click="onLogin" color="primary" label="Log In" />
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
              <div class="q-pa-md">
                <q-uploader
                  label="Auto Uploader"
                  :factory="factoryFn"
                  :field-name="'CV_' + signup.firstName + '_' + signup.lastName"
                  batch
                ></q-uploader>
              </div>
              <q-btn @click="signUp" color="primary" label="Sign Up" />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
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
        this.$router.push({ name: "HomePage" });
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
            this.$router.push({ name: "HomePage" });
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
</script>

<style scoped>
.app {
  background-image: url(../assets/topography.svg);
}
.container {
  background-color: lightgrey;
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
