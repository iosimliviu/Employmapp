<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-accent">
      <q-toolbar>
        <img
          class="q-ma-sm"
          style="height:50px"
          src="../assets/Employmapp-01.png"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>

<script>
import { openURL } from "quasar";

export default {
  name: "TestLayout",
  methods: {
    openURL
  }
};
</script>
