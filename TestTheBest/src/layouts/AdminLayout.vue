<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-black">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>TestTheBest ADMIN</q-toolbar-title>
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
      content-class="bg-grey-3"
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
          to: "/"
        },
        {
          label: "Settings",
          icon: "settings",
          to: "/settings"
        },

        {
          label: "Logout",
          icon: "group",
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
          console.log(response.data);
          this.$q.notify({
            color: "green",

            message: response.data.message,
            icon: "arrow_forward"
          });
          document.cookie = "loggedIn=false";
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
