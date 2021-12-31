<template>
  <v-app-bar app>
    <v-app-bar-nav-icon
      class="hidden-lg-and-up"
      @click="sidebar = !sidebar"
    ></v-app-bar-nav-icon>
    <v-navigation-drawer
      class="hidden-lg-and-up"
      v-model="sidebar"
      absolute
      temporary
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in menuItems"
          exact
          :key="i"
          :to="item.path"
          >{{ item.title }}</v-list-item
        >
      </v-list>
    </v-navigation-drawer>
    <v-toolbar-title class="pt-3" style="text-align: right">
      <router-link :to="homeLink">
        <img height="68" src="../assets/alricLogo.svg" />
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-md-and-down">
      <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
        {{ item.title }}
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <div class="pr-4">
      {{ currentUser.username }}
    </div>

    <v-form v-if="currentUser.username" v-on:submit="logout">
      <v-btn class="loginButton" type="submit" value="Logout">Logout</v-btn>
    </v-form>
  </v-app-bar>
</template>

<script>
import axios from "axios";
import router from "../router";
import { mapGetters } from "vuex";

export default {
  data: function () {
    return {
      role: null,
      sidebar: null,
      user: {
        username: "",
        displayName: "",
      },
      // menuItems: [],
      adminMenuItems: [
        { path: "/register", title: "New User" },
        { path: "/registerworker", title: "Set User As Employee" },
        { path: "/registerproject", title: "New Project" },
        { path: "/createteam", title: "New Team" },
        { path: "/assignsupervisor", title: "Set Team Supervisor" },
        { path: "/updateteam", title: "Edit Team" },
        { path: "/report", name: "report", title: "Report" },
      ],
      supervisorMenuItems: [{ path: "/supervisor", title: "Supervisor" }],
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    menuItems() {
      if (this.currentUser.role == 1) {
        return this.adminMenuItems;
      }
      if (this.currentUser.teamrole == 1) {
        return this.supervisorMenuItems;
      }
      return [];
    },
    homeLink() {
      if (this.currentUser.role == "supervisor") {
        return '/supervisor';
      }
      return '/dashboard';
    },
  },
  watch: {
    currentUser() {},
  },
  methods: {
    logout: function () {
      let self = this;
      axios
        .get("/api/logout")
        .then((response) => {
          self.$set(this, "user", response.data.user);
          router.push("/");
        })
        .catch((errors) => {
          router.push("/");
        });
    },
  },
  mounted() {},
};
</script>

<style>
</style> 