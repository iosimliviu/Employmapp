<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-accent">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <img
          @click="drawer = !drawer"
          class="q-ma-sm"
          style="height:50px"
          src="../assets/Employmapp-01.png"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="250"
      :breakpoint="600"
      bordered
      content-class="bg-light1"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            v-for="nav in navs"
            :key="nav.label"
            :to="nav.to"
            clickable
            exact
          >
            <q-item-section avatar>
              <q-icon :name="nav.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-if="nav.label !== 'Logout'">{{
                nav.label
              }}</q-item-label>
              <q-item-label @click="logout" v-else>{{
                nav.label
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<style>
@media (min-width: 768px) {
  .q-footer {
    display: none;
  }
}
</style>

<script>
import { colors } from "quasar";
colors.setBrand("light1", "#F0F4EF");
colors.setBrand("light2", "#ADB6C4");

import { LocalStorage } from "quasar";
export default {
  name: "Layout",

  data() {
    return {
      drawer: true,
      miniState: true,
      navs: [
        {
          label: "Home",
          icon: "home",
          to: "/admin"
        },
        {
          label: "Tests",
          icon: "description",
          to: "/adminTests"
        },
        {
          label: "Observers",
          icon: "group",
          to: "/observers"
        },
        {
          label: "Logout",
          icon: "exit_to_app",
          to: "/login"
        }
      ]
    };
  },
  methods: {
    logout() {
      this.$axios
        .get("/api/auth/logout")
        .then(response => {
          this.$q.notify({
            color: "green",
            message: response.data.message,
            icon: "arrow_forward"
          });

          LocalStorage.set("loggedIn", false);
          LocalStorage.set("isAdmin", null);
          this.$router.push("/login");
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
