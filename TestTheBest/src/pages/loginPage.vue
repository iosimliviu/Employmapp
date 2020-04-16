<template>
  <q-page class="flex flex-center">
    <div class="container">
      <div class="description-area">
        <h3 class="text-rubik">Test the best</h3>
        <p class="text-subtitle1">Get that bread!</p>
      </div>
      <div class="login-area">
        <q-card class="login-card">
          <q-card-section class="card-section">
            <div class="img-center">
              <img style="width:100px; height: 100px; background" src="../assets/sad.svg" />
            </div>
          </q-card-section>

          <q-tabs v-model="tab">
            <q-tab label="Login" style="color: white;" name="one" />
            <q-tab label="Register" style="color: white;" name="two" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="one">
              <q-input v-model="login.email" type="email" label="Email" />
              <q-input v-model="login.password" type="password" label="Password" />

              <q-btn @click="onLogin" color="primary" label="Log In" />
            </q-tab-panel>

            <q-tab-panel name="two">
              <q-input v-model="signup.firstName" type="text" label="First name" />
              <q-input v-model="signup.lastName" type="text" label="Last name" />
              <q-input v-model="signup.email" type="email" label="Email" />
              <q-input v-model="signup.password" type="password" label="Password" />
              <q-btn @click="signUp" color="primary" label="Sign Up" />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      tab: "one",
      signup: {
        password: "",
        email: "",
        firstName: "",
        lastName: ""
      },
      login: {
        password: "",
        email: ""
      }
    };
  },
  methods: {
    signUp() {
      this.$axios
        .post("/api/auth/register", this.signup)
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

          this.$router.push("/");
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
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  background-repeat: no-repeat;
  background-position: fixed;
  background-size: cover;
}
.description-area,
.login-area {
  flex-basis: 0;
  flex-grow: 1;
}
.description-area {
}
.login-area {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card {
  width: 100%;
  max-width: 300px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 2vh;
  width: 25vw;
  background-color: #018787;
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
    width: 90%;
  }
}
</style>


