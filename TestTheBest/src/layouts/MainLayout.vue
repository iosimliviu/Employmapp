<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">NOTES</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      bordered
      :show-if-above="true"
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label header>Navigation</q-item-label>
        <q-item
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          class="text-grey-3"
          clickable
          exact
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-if="nav.label!=='Logout'">{{nav.label}}</q-item-label>
            <q-item-label @click="logout" v-else>{{nav.label}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style>
@media (min-width: 768px) {
  .q-footer {
    display: none;
  }
}

.q-drawer .q-router-link--exact-active {
  color: white !important;
}
</style>

<script>
export default {
  name: "Layout",

  data() {
    return {
      leftDrawerOpen: false,
      navs: [
        {
          label: "Home",
          icon: "list",
          to: "/"
        },
        {
          label: "Profile",
          icon: "perm_identity",
          to: "/profile"
        },
        {
          label: "Test",
          icon: "description",
          to: "/test"
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



